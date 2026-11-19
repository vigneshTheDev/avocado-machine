export class LFU<T> {
  private length = 0;
  private freqMap = new Map<number, DoublyLinkedList<T>>();
  private lookup = new Map<string, ListNode<T>>();
  private leastFreq = 1;

  constructor(private capacity: number) {}

  get size() {
    return this.length;
  }

  get(key: string): T | null {
    const node = this.lookup.get(key);
    if (!node) return null;

    const freq = node.freq;
    const list = this.freqMap.get(freq);

    node.freq++;

    const newList = this.freqMap.get(node.freq) || new DoublyLinkedList<T>();
    this.freqMap.set(node.freq, newList);

    if (!list) return null;

    list.detatch(node);
    newList.push(node);

    if (list.length === 0) {
      this.freqMap.delete(freq);
      if (freq === this.leastFreq) this.leastFreq++;
    }

    return node.value;
  }

  put(key: string, value: T): void {
    const node = this.lookup.get(key);
    if (!node) {
      this.evict();

      // If the capacity is 0, evict does not help. We'll still be at capacity and can't add more items
      if (this.length === this.capacity) return;

      const newNode = new ListNode(value, key);

      const list = this.freqMap.get(1) || new DoublyLinkedList<T>();
      this.freqMap.set(1, list);

      list.push(newNode);
      this.lookup.set(key, newNode);

      this.length++;
      this.leastFreq = 1;

      return;
    }

    const freq = node.freq;
    const list = this.freqMap.get(freq);
    node.freq++;

    const newList = this.freqMap.get(node.freq) || new DoublyLinkedList<T>();
    this.freqMap.set(node.freq, newList);

    if (!list) throw new Error('list not found')

    list.detatch(node);
    newList.push(node);
    node.value = value;

    if (list.length === 0) {
      this.freqMap.delete(freq);
      if (this.leastFreq === freq) this.leastFreq++;
    }
  }

  private evict(): void {
    if (this.length < this.capacity) return;

    const list = this.freqMap.get(this.leastFreq);
    if (!list) return;

    const node = list.pop();
    if (!node) throw new Error("Could not evict");

    this.length--;
    this.lookup.delete(node.key);

    if (list.length === 0) {
      this.freqMap.delete(this.leastFreq);

      if (this.length > 0)
        while (!this.freqMap.has(this.leastFreq)) this.leastFreq++;
    }
  }
}

class DoublyLinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;

  length = 0;

  push(node: ListNode<T>) {
    this.length++;
    if (this.head == null || this.tail == null) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  pop(): ListNode<T> | null {
    if (this.head == null) return null;

    const head = this.head;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    if (head === this.tail) this.tail = null;

    this.length--;

    return head;
  }

  detatch(node: ListNode<T>): void {
    const next = node.next;
    const prev = node.prev;

    if (next) next.prev = prev;
    if (prev) prev.next = next;

    node.next = null;
    node.prev = null;

    if (this.head === node) this.head = next;
    if (this.tail === node) this.tail = prev;
    this.length--;
  }
}

class ListNode<T> {
  public next: ListNode<T> | null = null;
  public prev: ListNode<T> | null = null;
  public freq = 1;

  constructor(
    public value: T,
    public key: string,
  ) {}
}
