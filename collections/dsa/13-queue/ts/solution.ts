export default class Queue<T> {
  public length: number = 0;

  constructor() {
    throw new Error("Not implemented");
  }

  enqueue(item: T): void {
    throw new Error("Not implemented");
  }

  deque(): T | undefined {
    throw new Error("Not implemented");
  }

  peek(): T | undefined {
    throw new Error("Not implemented");
  }
}
