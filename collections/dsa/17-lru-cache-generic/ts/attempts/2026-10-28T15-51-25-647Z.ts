export default class LRU<K, V> {
  private head: ListNode<V> | null = null;
  private tail: ListNode<V> | null = null;

  private length = 0;

  private lookup = new Map<K, ListNode<V>>();
  private reverseLookup = new Map<ListNode<V>, K>();

  constructor(private capacity: number) {
    if (capacity <= 0) throw new Error("Capacity should be greater than 0");
  }

  update(key: K, value: V): void {
    const node = this.lookup.get(key);

    if (!node) {
      const newNode = new ListNode(value);
      this.prepend(newNode);

      this.lookup.set(key, newNode);
      this.reverseLookup.set(newNode, key);

      this.trimCache();
    } else {
      node.value = value;

      this.detach(node);
      this.prepend(node);
    }
  }

  get(key: K): V | undefined {
    const node = this.lookup.get(key);
    if (!node) return undefined;

    this.detach(node);
    this.prepend(node);
    return node.value;
  }

  private detach(node: ListNode<V>): void {
    const next = node.next;
    const prev = node.prev;

    if (prev) prev.next = next;
    if (next) next.prev = prev;

    if (node === this.head) this.head = next;
    if (node === this.tail) this.tail = prev;

    node.next = null;
    node.prev = null;

    this.length--;
  }

  private prepend(node: ListNode<V>) {
    node.next = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;

    this.length++;
  }

  private trimCache(): void {
    if (this.length <= this.capacity || !this.tail) return;

    const tail = this.tail;
    const key = this.reverseLookup.get(tail)!;

    if (this.head === tail) this.head = null;

    this.tail = tail.prev;
    if (this.tail) this.tail.next = null;

    this.lookup.delete(key);
    this.reverseLookup.delete(tail);
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
