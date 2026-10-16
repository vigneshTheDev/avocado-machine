import { test, expect } from "vitest";
import Stack from "./solution";

test("stack", function () {
    const list = new Stack<number>();

    list.push(5);
    list.push(7);
    list.push(9);

    expect(list.pop()).toEqual(9);
    expect(list.length).toEqual(2);

    list.push(11);
    expect(list.pop()).toEqual(11);
    expect(list.pop()).toEqual(7);
    expect(list.peek()).toEqual(5);
    expect(list.pop()).toEqual(5);
    expect(list.pop()).toEqual(undefined);
    list.push(69);
    expect(list.peek()).toEqual(69);
    expect(list.length).toEqual(1);
});

test("empty reads, falsy entries, and repeated drain/refill", () => {
  const list = new Stack<number>();
  expect(list.length).toBe(0);
  expect(list.peek()).toBeUndefined();
  expect(list.pop()).toBeUndefined();
  expect(list.length).toBe(0);
  for (let round = 0; round < 3; round++) {
    for (const value of [0, -1, 2]) list.push(value);
    expect(list.peek()).toBe(2);
    expect(list.peek()).toBe(2);
    expect(list.length).toBe(3);
    for (const value of [2, -1, 0]) expect(list.pop()).toBe(value);
    expect(list.length).toBe(0);
    expect(list.peek()).toBeUndefined();
    expect(list.pop()).toBeUndefined();
  }
});
