import { test, expect } from "vitest";
import DoublyLinkedList from "./solution";
import { test_list } from "./list-check";

test("DoublyLinkedList", function () {
    const list = new DoublyLinkedList<number>();
    test_list(list);
});

test("handles empty boundaries, inserts, duplicates, and reuse", () => {
  const list = new DoublyLinkedList<number>();
  expect(list.length).toBe(0);
  for (const i of [-1, 0, 10]) {
    expect(list.get(i)).toBeUndefined();
    expect(list.removeAt(i)).toBeUndefined();
  }
  expect(list.remove(99)).toBeUndefined();
  expect(() => list.insertAt(99, -1)).toThrow(RangeError);
  expect(() => list.insertAt(99, 1)).toThrow(RangeError);
  expect(list.length).toBe(0);
  list.insertAt(2, 0);
  list.insertAt(1, 0);
  list.insertAt(4, 2);
  list.insertAt(3, 2);
  expect(Array.from({length: list.length}, (_, i) => list.get(i))).toEqual([1, 2, 3, 4]);
  expect(list.get(4)).toBeUndefined();
  expect(list.removeAt(4)).toBeUndefined();
  expect(() => list.insertAt(0, 5)).toThrow(RangeError);
  list.prepend(2);
  expect(list.remove(2)).toBe(2);
  expect(list.get(0)).toBe(1);
  expect(list.removeAt(list.length - 1)).toBe(4);
  expect(list.remove(2)).toBe(2);
  expect(list.remove(2)).toBeUndefined();
  expect(list.removeAt(0)).toBe(1);
  expect(list.removeAt(0)).toBe(3);
  expect(list.length).toBe(0);
  for (let i = 0; i < 64; i++) list.append(i);
  expect(list.length).toBe(64);
  for (let i = 0; i < 64; i++) expect(list.removeAt(0)).toBe(i);
  expect(list.length).toBe(0);
  list.prepend(0);
  list.append(-1);
  expect(list.removeAt(1)).toBe(-1);
  expect(list.removeAt(0)).toBe(0);
  expect(list.length).toBe(0);
});

function contents(list: { length: number; get(idx: number): number | undefined }) {
  return Array.from({ length: list.length }, (_, i) => list.get(i));
}

test("appending after removing the tail links the new tail", () => {
  const byValue = new DoublyLinkedList<number>();
  byValue.append(1);
  byValue.append(2);
  byValue.append(3);
  expect(byValue.remove(3)).toBe(3);
  byValue.append(4);
  expect(byValue.get(2)).toBe(4);
  expect(byValue.length).toBe(3);
  expect(contents(byValue)).toEqual([1, 2, 4]);

  const byIndex = new DoublyLinkedList<number>();
  byIndex.append(1);
  byIndex.append(2);
  byIndex.append(3);
  expect(byIndex.removeAt(byIndex.length - 1)).toBe(3);
  byIndex.append(4);
  expect(byIndex.length).toBe(3);
  expect(contents(byIndex)).toEqual([1, 2, 4]);
  expect(byIndex.removeAt(2)).toBe(4);
  expect(byIndex.removeAt(1)).toBe(2);
  byIndex.append(5);
  expect(contents(byIndex)).toEqual([1, 5]);
});

test("removing the only element by value allows appending and prepending", () => {
  const list = new DoublyLinkedList<number>();
  list.append(1);
  expect(list.remove(1)).toBe(1);
  expect(list.length).toBe(0);
  expect(list.get(0)).toBeUndefined();
  list.append(2);
  expect(contents(list)).toEqual([2]);
  expect(list.remove(2)).toBe(2);
  list.prepend(3);
  list.append(4);
  expect(contents(list)).toEqual([3, 4]);
  expect(list.remove(4)).toBe(4);
  expect(list.remove(3)).toBe(3);
  list.prepend(5);
  list.prepend(6);
  expect(contents(list)).toEqual([6, 5]);
});

test("insertAt(item, length) on a non-empty list updates the tail", () => {
  const list = new DoublyLinkedList<number>();
  list.append(1);
  list.append(2);
  list.insertAt(3, list.length);
  list.append(4);
  expect(contents(list)).toEqual([1, 2, 3, 4]);
  list.insertAt(5, 4);
  expect(list.removeAt(list.length - 1)).toBe(5);
  list.append(6);
  expect(contents(list)).toEqual([1, 2, 3, 4, 6]);
});

test("remove deletes only the first duplicate and keeps order", () => {
  const list = new DoublyLinkedList<number>();
  for (const value of [1, 2, 1, 3, 1]) list.append(value);
  expect(list.remove(1)).toBe(1);
  expect(contents(list)).toEqual([2, 1, 3, 1]);
  expect(list.remove(1)).toBe(1);
  expect(contents(list)).toEqual([2, 3, 1]);
  expect(list.remove(1)).toBe(1);
  expect(contents(list)).toEqual([2, 3]);
  list.append(1);
  expect(contents(list)).toEqual([2, 3, 1]);
});

test("rejected insertions and out-of-range reads leave the list unchanged", () => {
  const list = new DoublyLinkedList<number>();
  for (const value of [1, 2, 3]) list.append(value);
  for (const idx of [-1, 4, 100]) expect(() => list.insertAt(9, idx)).toThrow(RangeError);
  for (const idx of [-1, 3, 100]) {
    expect(list.get(idx)).toBeUndefined();
    expect(list.removeAt(idx)).toBeUndefined();
  }
  expect(list.remove(9)).toBeUndefined();
  expect(list.length).toBe(3);
  expect(contents(list)).toEqual([1, 2, 3]);
  list.append(4);
  list.prepend(0);
  expect(contents(list)).toEqual([0, 1, 2, 3, 4]);
});

test("stores falsy values as ordinary entries", () => {
  const list = new DoublyLinkedList<number>();
  list.append(0);
  list.prepend(0);
  list.insertAt(0, 1);
  expect(list.length).toBe(3);
  expect(list.get(1)).toBe(0);
  expect(list.remove(0)).toBe(0);
  expect(list.length).toBe(2);
  expect(list.removeAt(1)).toBe(0);
  expect(list.removeAt(0)).toBe(0);
  expect(list.length).toBe(0);
});

test("matches an array model over seeded random operations", () => {
  // Deterministic PRNG so failures are reproducible.
  let seed = 0x5eed;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (n: number) => Math.floor(random() * n);

  const list = new DoublyLinkedList<number>();
  const model: number[] = [];
  for (let step = 0; step < 4000; step++) {
    const op = int(7);
    const value = int(10);
    const where = `step ${step}, op ${op}`;
    if (op === 0) {
      list.append(value);
      model.push(value);
    } else if (op === 1) {
      list.prepend(value);
      model.unshift(value);
    } else if (op === 2) {
      const idx = int(model.length + 3) - 1;
      if (idx < 0 || idx > model.length) {
        expect(() => list.insertAt(value, idx), where).toThrow(RangeError);
      } else {
        list.insertAt(value, idx);
        model.splice(idx, 0, value);
      }
    } else if (op === 3) {
      const at = model.indexOf(value);
      expect(list.remove(value), where).toBe(at === -1 ? undefined : value);
      if (at !== -1) model.splice(at, 1);
    } else if (op === 4 || op === 5) {
      const idx = int(model.length + 2) - 1;
      const inRange = idx >= 0 && idx < model.length;
      expect(list.removeAt(idx), where).toBe(inRange ? model[idx] : undefined);
      if (inRange) model.splice(idx, 1);
    } else {
      const idx = int(model.length + 2) - 1;
      expect(list.get(idx), where).toBe(idx >= 0 && idx < model.length ? model[idx] : undefined);
    }
    expect(list.length, where).toBe(model.length);
    if (step % 50 === 0) expect(contents(list), where).toEqual(model);
  }
  expect(contents(list)).toEqual(model);
});
