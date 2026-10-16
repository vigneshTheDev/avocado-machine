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
