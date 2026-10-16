import { test, expect } from "vitest";
import Queue from "./solution";

test("queue", function () {
    const list = new Queue<number>();

    list.enqueue(5);
    list.enqueue(7);
    list.enqueue(9);

    expect(list.deque()).toEqual(5);
    expect(list.length).toEqual(2);
    list.enqueue(11);
    expect(list.deque()).toEqual(7);
    expect(list.deque()).toEqual(9);
    expect(list.peek()).toEqual(11);
    expect(list.deque()).toEqual(11);
    expect(list.deque()).toEqual(undefined);
    expect(list.length).toEqual(0);
    list.enqueue(69);
    expect(list.peek()).toEqual(69);
    expect(list.length).toEqual(1);
});

test("empty reads, falsy entries, and repeated drain/refill", () => {
  const list = new Queue<number>();
  expect(list.length).toBe(0);
  expect(list.peek()).toBeUndefined();
  expect(list.deque()).toBeUndefined();
  expect(list.length).toBe(0);
  for (let round = 0; round < 3; round++) {
    for (const value of [0, -1, 2]) list.enqueue(value);
    expect(list.peek()).toBe(0);
    expect(list.peek()).toBe(0);
    expect(list.length).toBe(3);
    for (const value of [0, -1, 2]) expect(list.deque()).toBe(value);
    expect(list.length).toBe(0);
    expect(list.peek()).toBeUndefined();
    expect(list.deque()).toBeUndefined();
  }
});
