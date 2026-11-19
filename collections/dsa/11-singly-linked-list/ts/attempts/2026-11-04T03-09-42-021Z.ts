export default class SinglyLinkedList<T> {
  public length: number = 0;

  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  constructor() {}

  get(idx: number): T | undefined {
    const node = this.nodeAt(idx);
    return node?.value;
  }

  prepend(item: T): void {
    const node = new ListNode(item);

    node.next = this.head;
    this.head = node;

    if (this.tail == null) this.tail = node;
    this.length++;
  }

  append(item: T): void {
    const node = new ListNode(item);

    if (this.tail) this.tail.next = node;
    this.tail = node;

    if (this.head == null) this.head = node;
    this.length++;
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) throw new RangeError("Invalid idx");
    if (idx === 0) return this.prepend(item);
    if (idx === this.length) return this.append(item);

    const node = new ListNode(item);
    const prev = this.nodeAt(idx - 1);

    if (prev == null) throw new Error("prev not found");

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
        return curr.value;
      }
      prev = curr;
      curr = curr.next;
    }
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) return;
    if (idx === 0) {
      const head = this.head;
      if (this.head === this.tail) this.tail = null;
      if (this.head) this.head = this.head.next;
      this.length--;
      return head?.value;
    }

    const prev = this.nodeAt(idx - 1);
    if (!prev) throw new Error("prev not found");

    const curr = prev.next;
    prev.next = curr?.next || null;
    if (curr === this.tail) this.tail = prev;
    this.length--;
    return curr?.value;
  }

  private nodeAt(idx: number): ListNode<T> | null {
    let i = 0;
    let curr = this.head;
    while (curr) {
      if (idx === i) return curr;

      curr = curr.next;
      i++;
    }
    return null;
  }
}

class ListNode<V> {
  public next: ListNode<V> | null = null;
  constructor(public value: V) {}
}
