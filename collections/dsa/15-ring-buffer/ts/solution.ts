export default class RingBuffer<T> {
  public length: number = 0;

  constructor() {
    throw new Error("Not implemented");
  }

  push(item: T): void {
    throw new Error("Not implemented");
  }

  get(idx: number): T | undefined {
    throw new Error("Not implemented");
  }

  pop(): T | undefined {
    throw new Error("Not implemented");
  }
}
