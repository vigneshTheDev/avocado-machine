export default class SinglyLinkedList<T> {
  public length: number = 0;

  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  constructor() {}

  prepend(item: T): void {
    const node = new ListNode(item);
    node.next = this.head;
    this.head = node;

    if (this.tail == null) this.tail = node;
    this.length++;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length || idx < 0) throw new RangeError('idx out of range')
    if (idx === 0) return this.prepend(item);
    if (idx === this.length) return this.append(item);

    const prev = this.nodeAt(idx - 1);
    if (!prev) throw new Error("prev node not found");

    this.length++;
    const curr = prev.next;
    const node = new ListNode(item);

    prev.next = node;
    node.next = curr;
  }

  append(item: T): void {
    const node = new ListNode(item);

    if (this.head == null) this.head = node;
    if (this.tail) this.tail.next = node;

    this.tail = node;

    this.length++;
  }

  remove(item: T): T | undefined {
    let curr = this.head;
    let prev: ListNode<T> | null = null;
    while (curr) {
      if (curr.value !== item) {
        prev = curr;
        curr = curr.next;
        continue;
      }

      if (prev) prev.next = curr.next;
      if (this.head === curr) this.head = curr.next;
      if (this.tail === curr) this.tail = prev;
      this.length--;
      return item;
    }
  }

  get(idx: number): T | undefined {
    if (idx >= this.length || idx < 0) return;

    const node = this.nodeAt(idx);
    if (!node) throw new Error("node not found");
    return node.value;
  }

  removeAt(idx: number): T | undefined {
    if (!this.head || idx >= this.length || idx < 0) return;

    if (idx === 0) {
      this.length--;
      const head = this.head
      if (this.head === this.tail) this.tail = null;
      this.head = this.head.next;
      return head.value;
    }

    const prev = this.nodeAt(idx - 1);
    if (!prev) throw new Error("prev node not found");

    const curr = prev?.next;
    if (curr) prev.next = curr.next;
    if (curr === this.tail) this.tail = prev;

    this.length--;
    return curr?.value
  }

  private nodeAt(idx: number): ListNode<T> | undefined {
    if (idx >= this.length) return;

    let curr = this.head;
    let i = 0;
    while (curr) {
      if (i === idx) return curr;

      curr = curr.next;
      i++;
    }
  }
}

class ListNode<T> {
  public next: ListNode<T> | null = null;
  constructor(public value: T) {}
}
