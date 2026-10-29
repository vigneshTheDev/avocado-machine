export default class LRU<K, V> {
  private length = 0;

  private head: ListNode<V> | null = null;
  private tail: ListNode<V> | null = null;

  private lookup = new Map<K, ListNode<V>>();
  private reverseLookup = new Map<ListNode<V>, K>();
  constructor(private capacity: number) {}

  update(key: K, value: V): void {
    const node = this.lookup.get(key);
    if (node == null) {
      const newNode = new ListNode<V>(value);
      this.prepend(newNode);
      this.lookup.set(key, newNode);
      this.reverseLookup.set(newNode, key);
      this.trimCache();
    } else {
      this.detach(node);
      this.prepend(node);
      node.value = value;
    }
  }

  get(key: K): V | undefined {
    const node = this.lookup.get(key);
    if (!node) return;

    this.detach(node);
    this.prepend(node);
    return node.value;
  }

  private detach(node: ListNode<V>): void {
    const prev = node.prev;
    const next = node.next;

    if (prev) prev.next = next;
    if (next) next.prev = prev;
    node.next = null;
    node.prev = null;

    if (node === this.head) this.head = next;
    if (node === this.tail) this.tail = prev;
    this.length--;
  }

  private prepend(node: ListNode<V>): void {
    this.length++;

    node.next = this.head;
    if (this.head) this.head.prev = node;

    this.head = node;
    if (this.tail == null) this.tail = node;
  }

  private trimCache(): void {
    if (this.length <= this.capacity) return;
    if (this.tail == null) return;

    const tail = this.tail;
    const key = this.reverseLookup.get(tail)!;

    this.lookup.delete(key);
    this.reverseLookup.delete(tail);

    this.tail = tail.prev;
    if (this.tail) this.tail.next = null;
    if (this.head === tail) this.head = null;
    this.length--;
  }
}

class ListNode<V> {
  constructor(
    public value: V,
    public next: ListNode<V> | null = null,
    public prev: ListNode<V> | null = null,
  ) {}
}
