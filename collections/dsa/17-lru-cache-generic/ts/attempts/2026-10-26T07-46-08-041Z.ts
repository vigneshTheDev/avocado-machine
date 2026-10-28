export default class LRU<K, V> {
  private head: ListNode<V> | null = null;
  private tail: ListNode<V> | null = null;
  private length: number = 0;

  private lookup = new Map<K, ListNode<V>>();
  private reverseLookup = new Map<ListNode<V>, K>();

  constructor(private capacity: number) {}

  update(key: K, value: V): void {
    if (this.capacity === 0) return;

    if (this.lookup.has(key)) {
      const node = this.lookup.get(key)!;
      node.value = value;
      this.visit(key);
    } else {
      this.insert(key, value);
    }
  }

  get(key: K): V | undefined {
    if (this.capacity === 0) return;

    const node = this.lookup.get(key);
    this.visit(key);

    return node?.value;
  }

  private visit(key: K): void {
    const node = this.lookup.get(key);
    if (!node) return;
    if (node === this.tail) return;

    const prev = node.prev;
    const next = node.next;

    if (prev) prev.next = next;
    if (next) next.prev = prev;

    if (node === this.head) this.head = next;

    if (this.tail) {
      node.prev = this.tail;
      node.next = null;
      this.tail.next = node;
      this.tail = node;
    }
  }

  private insert(key: K, value: V): void {
    const node = new ListNode(value);
    if (this.capacity === this.length) this.evict();

    this.length++;
    this.lookup.set(key, node);
    this.reverseLookup.set(node, key);
    if (!this.tail || !this.head) {
      this.tail = this.head = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  private evict(): void {
    if (!this.tail || !this.head) return;

    const old = this.head;
    if (old) {
      this.lookup.delete(this.reverseLookup.get(old) as K);
      this.reverseLookup.delete(old);
    }

    this.head = this.head.next || null;
    if (this.head) this.head.prev = null;

    this.length--;
    if (this.length === 0) this.tail = null;
  }
}

class ListNode<V> {
  public next: ListNode<V> | null = null;
  public prev: ListNode<V> | null = null;
  constructor(public value: V) {}
}
