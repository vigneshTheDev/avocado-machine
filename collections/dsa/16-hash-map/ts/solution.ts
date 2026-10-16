export default class Map<T extends string | number, V> {
  constructor() {
    throw new Error("Not implemented");
  }

  get(key: T): V | undefined {
    throw new Error("Not implemented");
  }

  set(key: T, value: V): void {
    throw new Error("Not implemented");
  }

  delete(key: T): V | undefined {
    throw new Error("Not implemented");
  }

  size(): number {
    throw new Error("Not implemented");
  }
}
