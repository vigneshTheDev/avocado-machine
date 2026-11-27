export default class SinglyLinkedList<T> {
  private head?: ListNode<T>;
  private tail?: ListNode<T>;

  public length: number = 0;

  get(idx: number): T | undefined {
    return this.nodeAt(idx)?.value;
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

  /**
   * @throws RangeError when the idx is out of bounds
   */
  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) throw new RangeError("Invalid idx");

    if (idx === 0) return this.prepend(item);
    if (idx === this.length) return this.append(item);

    const prev = this.nodeAt(idx - 1);
    if (!prev) throw new Error("prev not found");

    const curr = prev.next;
    const node = new ListNode(item);

    prev.next = node;
    node.next = curr;
    this.length++;
  }

  remove(item: T): T | undefined {
    let curr = this.head;
    let prev: ListNode<T> | undefined;
    while (curr) {
      if (curr.value === item) {
        if (prev) prev.next = curr.next;
        if (this.head === curr) this.head = curr.next;
        if (this.tail === curr) this.tail = prev;
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
      this.head = head?.next;
      if (!this.head) this.tail = undefined;
      this.length--;
      return head?.value;
    }

    let prev = this.nodeAt(idx - 1);
    if (!prev) return;

    let curr = prev.next;
    prev.next = curr?.next;
    if (this.tail === curr) this.tail = prev;
    this.length--;
    return curr?.value;
  }

  private nodeAt(idx: number): ListNode<T> | undefined {
    let i = 0;
    let curr = this.head;
    while (curr) {
      if (i === idx) return curr;
      curr = curr.next;
      i++;
    }
  }
}

class ListNode<T> {
  public next?: ListNode<T>;
  constructor(public value: T) {}
}
