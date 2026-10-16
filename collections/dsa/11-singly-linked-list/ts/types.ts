export interface List<T> {
  readonly length: number;
  prepend(item: T): void;
  append(item: T): void;
  insertAt(item: T, idx: number): void;
  get(idx: number): T | undefined;
  remove(item: T): T | undefined;
  removeAt(idx: number): T | undefined;
}
