import { test, expect } from "vitest";
import SinglyLinkedList from "./solution";
import { test_list } from "./list-check";

test("linked-list", function () {
    const list = new SinglyLinkedList<number>();
    test_list(list);
});

test("inserts at the head, middle, and end, then empties and reuses the list", () => {
  const list = new SinglyLinkedList<number>();
  expect(list.length).toBe(0);
  expect(list.remove(99)).toBeUndefined();
  expect(list.length).toBe(0);
  list.insertAt(2, 0);
  list.insertAt(1, 0);
  list.insertAt(4, 2);
  list.insertAt(3, 2);
  expect(Array.from({length: list.length}, (_, i) => list.get(i))).toEqual([1, 2, 3, 4]);
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
  const byValue = new SinglyLinkedList<number>();
  byValue.append(1);
  byValue.append(2);
  byValue.append(3);
  expect(byValue.remove(3)).toBe(3);
  byValue.append(4);
  expect(byValue.get(2)).toBe(4);
  expect(byValue.length).toBe(3);
  expect(contents(byValue)).toEqual([1, 2, 4]);

  const byIndex = new SinglyLinkedList<number>();
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
  const list = new SinglyLinkedList<number>();
  list.append(1);
  expect(list.remove(1)).toBe(1);
  expect(list.length).toBe(0);
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
  const list = new SinglyLinkedList<number>();
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
  const list = new SinglyLinkedList<number>();
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

test("removing an absent value leaves empty and non-empty lists unchanged", () => {
  const list = new SinglyLinkedList<number>();
  expect(list.remove(9)).toBeUndefined();
  expect(list.length).toBe(0);
  for (const value of [1, 2, 3]) list.append(value);
  expect(list.remove(9)).toBeUndefined();
  expect(list.length).toBe(3);
  expect(contents(list)).toEqual([1, 2, 3]);
  list.append(4);
  list.prepend(0);
  expect(contents(list)).toEqual([0, 1, 2, 3, 4]);
});

test("stores falsy values as ordinary entries", () => {
  const list = new SinglyLinkedList<number>();
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

test("compares objects by reference when removing values", () => {
  const first = { value: 1 };
  const second = { value: 1 };
  const list = new SinglyLinkedList<typeof first>();
  list.append(first);
  list.append(second);
  expect(list.remove({ value: 1 })).toBeUndefined();
  expect(list.length).toBe(2);
  expect(list.get(0)).toBe(first);
  expect(list.get(1)).toBe(second);
  expect(list.remove(second)).toBe(second);
  expect(list.length).toBe(1);
  expect(list.get(0)).toBe(first);
  expect(list.remove(first)).toBe(first);
  expect(list.length).toBe(0);
});
