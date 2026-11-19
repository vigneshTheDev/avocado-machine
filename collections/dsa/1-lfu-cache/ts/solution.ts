export class LFU<T> {
  private length = 0;

  private lookup = new Map<string, ListNode<T>>();
  private freqMap = new Map<number, DoublyLinkedList<T>>();
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

    if (!list)
      throw new Error(
        "Missing list for the frequency. Lookup and Frequency map might be out of sync",
      );

    list.detatch(node);
    newList.push(node);

    if (list.size === 0) {
      this.freqMap.delete(freq);
      if (this.leastFreq === freq) this.leastFreq++;
    }
    return node.value;
  }

  put(key: string, value: T) {
    const node = this.lookup.get(key);
    if (!node) {
      const newNode = new ListNode(value, key);

      this.evict();
      if (this.length >= this.capacity) return;

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

    if (!list)
      throw new Error(
        "Missing list for the frequency. Lookup and Frequency map might be out of sync",
      );

    node.freq++;
    node.value = value;
    const newList = this.freqMap.get(node.freq) || new DoublyLinkedList();
    this.freqMap.set(node.freq, newList);

    list.detatch(node);
    newList.push(node);

    if (list.size === 0) {
      this.freqMap.delete(freq);
      if (this.leastFreq === freq) this.leastFreq++;
    }
  }

  private evict(): void {
    if (this.length < this.capacity || this.length === 0) return;

    const list = this.freqMap.get(this.leastFreq);
    if (!list) throw new Error("Missing list");

    const node = list.pop();
    if (!node) throw new Error("Eviction failed");

    this.length--;
    this.lookup.delete(node.key);

    if (list.size === 0) {
      this.freqMap.delete(this.leastFreq);

      if (this.length)
        while (!this.freqMap.has(this.leastFreq)) this.leastFreq++;
    }
  }
}

class DoublyLinkedList<T> {
  private length = 0;
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  constructor() {}

  get size() {
    return this.length;
  }

  public push(node: ListNode<T>): void {
    this.length++;
    if (this.head == null || this.tail == null) {
      this.head = this.tail = node;
      return;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  public pop(): ListNode<T> | null {
    if (!this.head || !this.tail) return null;

    const head = this.head;
    this.head = head.next;
    if (this.head) this.head.prev = null;
    if (this.tail === head) this.tail = null;

    this.length--;
    head.next = null;

    return head;
  }

  public detatch(node: ListNode<T>): void {
    const next = node.next;
    const prev = node.prev;

    if (prev) prev.next = next;
    if (next) next.prev = prev;

    node.next = null;
    node.prev = null;

    if (this.head === node) this.head = next;
    if (this.tail === node) this.head = prev;

    this.length--;
  }
}

class ListNode<T> {
  prev: ListNode<T> | null = null;
  next: ListNode<T> | null = null;
  freq = 1;

  constructor(
    public value: T,
    public key: string,
  ) {}
}
