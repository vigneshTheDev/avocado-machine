export default class SinglyLinkedList<T> {
  public length: number = 0;

  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  get(idx: number): T | undefined {
    const node = this.nodeAt(idx);
    return node?.value;
  }

  prepend(item: T): void {
    const node = new ListNode(item);
    node.next = this.head;
    this.head = node;

    if (!this.tail) this.tail = node;

    this.length++;
  }

  append(item: T): void {
    const node = new ListNode(item);
    if (this.tail) this.tail.next = node;
    this.tail = node;

    if (!this.head) this.head = node;
    this.length++;
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) throw new RangeError("invalid idx");
    if (idx === 0) return this.prepend(item);
    if (idx === this.length) return this.append(item);

    const prev = this.nodeAt(idx - 1);
    if (!prev) return;

    const node = new ListNode(item);
    const curr = prev.next;
    prev.next = node;
    node.next = curr;
    this.length++;
  }

  remove(item: T): T | undefined {
    let curr = this.head;
    let prev: ListNode<T> | null = null;
    while (curr) {
      if (curr.value === item) {
        if (prev) prev.next = curr.next;
        if (curr === this.head) this.head = curr.next;
        if (curr === this.tail) this.tail = prev;
        this.length--;
        return item;
      }
      prev = curr;
      curr = curr.next;
    }
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) return;
    this.length--;
    if (idx === 0) {
      const head = this.head;
      this.head = this.head?.next || null;
      if (!this.head) this.tail = null;
      return head?.value;
    }

    const prev = this.nodeAt(idx - 1);
    if (!prev) return;

    const curr = prev.next;
    prev.next = curr?.next || null;
    if (this.tail === curr) this.tail = prev;
    return curr?.value;
  }

  private nodeAt(idx: number): ListNode<T> | null {
    let i = 0;
    let curr = this.head;
    while (curr) {
      if (i === idx) return curr;

      i++;
      curr = curr.next;
    }
    return null;
  }
}

class ListNode<V> {
  public next: ListNode<V> | null = null;
  constructor(public value: V) {}
}
