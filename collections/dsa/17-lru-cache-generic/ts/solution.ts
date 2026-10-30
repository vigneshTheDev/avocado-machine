export default class LRU<K, V> {
  private length = 0;

  private head: ListNode<V> | null = null;
  private tail: ListNode<V> | null = null;

  private lookup = new Map<K, ListNode<V>>();
  private reverseLookup = new Map<ListNode<V>, K>();
  constructor(private capacity: number) {
    if (capacity < 0 || capacity % 1 !== 0) throw new Error("Invalid Capacity");
  }

  update(key: K, value: V): void {
    const node = this.lookup.get(key);
    if (node) {
      node.value = value;
      this.detatch(node);
      this.prepend(node);
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

  private detatch(node: ListNode<V>) {
    const prev = node.prev;
    const next = node.next;

    node.next = null;
    node.prev = null;

    if (prev) prev.next = next;
    if (next) next.prev = prev;

    if (this.head === node) this.head = next;
    if (this.tail === node) this.tail = prev;

    this.length--;
  }
  private prepend(node: ListNode<V>) {
    const head = this.head;
    this.head = node;

    node.next = head;
    if (head) head.prev = node;
    if (this.tail == null) this.tail = node;

    this.length++;
  }
  private trimCache(): void {
    if (this.length <= this.capacity || this.tail == null) return;

    const tail = this.tail;
    const key = this.reverseLookup.get(tail)!;

    this.lookup.delete(key);
    this.reverseLookup.delete(tail);

    this.detatch(tail);
  }
}

class ListNode<V> {
  public next: ListNode<V> | null = null;
  public prev: ListNode<V> | null = null;
  constructor(public value: V) {}
}
