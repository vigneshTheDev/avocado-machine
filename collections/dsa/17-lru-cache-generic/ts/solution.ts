export default class LRU<K, V> {
  private length = 0;

  private head: ListNode<V> | null = null;
  private tail: ListNode<V> | null = null;

  private lookup = new Map<K, ListNode<V>>();
  private reverseLookup = new Map<ListNode<V>, K>();

  constructor(private capacity: number) {
    if (typeof capacity !== "number" || capacity % 1 !== 0 || capacity < 0)
      throw new Error("Invalid Capacity");
  }

  update(key: K, value: V): void {
    const node = this.lookup.get(key);
    if (node) {
      this.detatch(node);
      this.prepend(node);
      node.value = value;
    } else {
      const newNode = new ListNode(value);
      this.prepend(newNode);

      this.lookup.set(key, newNode);
      this.reverseLookup.set(newNode, key);

      this.trimCache();
    }
  }

  get(key: K): V | undefined {
    const node = this.lookup.get(key);
    if (!node) return;

    this.detatch(node);
    this.prepend(node);
    return node.value;
  }

  private detatch(node: ListNode<V>): void {
    const next = node.next;
    const prev = node.prev;

    if (next) next.prev = prev;
    if (prev) prev.next = next;

    if (this.head === node) this.head = next;
    if (this.tail === node) this.tail = prev;

    node.next = null;
    node.prev = null;

    this.length--;
  }

  private prepend(node: ListNode<V>): void {
    if (this.head) this.head.prev = node;
    node.next = this.head;
    this.head = node;

    if (this.tail == null) this.tail = node;

    this.length++;
  }

  private trimCache(): void {
    if (this.length <= this.capacity || !this.tail) return;

    const oldTail = this.tail;
    const key = this.reverseLookup.get(oldTail)!;

    this.lookup.delete(key);
    this.reverseLookup.delete(oldTail);

    this.detatch(oldTail);
  }
}

class ListNode<V> {
  public next: ListNode<V> | null = null;
  public prev: ListNode<V> | null = null;
  constructor(public value: V) {}
}
