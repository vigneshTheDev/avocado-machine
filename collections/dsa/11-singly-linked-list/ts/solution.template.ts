export default class SinglyLinkedList<T> {
  public length: number = 0;

  get(idx: number): T | undefined {
    throw new Error("Not implemented");
  }

  prepend(item: T): void {
    throw new Error("Not implemented");
  }

  append(item: T): void {
    throw new Error("Not implemented");
  }

  insertAt(item: T, idx: number): void {
    throw new Error("Not implemented");
  }

  remove(item: T): T | undefined {
    throw new Error("Not implemented");
  }

  removeAt(idx: number): T | undefined {
    throw new Error("Not implemented");
  }
}

class ListNode<T> {
  public next?: ListNode<T>;
  constructor(public value: T) {}
}
