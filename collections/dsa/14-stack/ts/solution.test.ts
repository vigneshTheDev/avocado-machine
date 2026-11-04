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

// Deterministic PRNG so failures are reproducible.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

test("keeps LIFO order across 10,000 entries", () => {
  const list = new Stack<number>();
  for (let i = 0; i < 10_000; i++) list.push(i);
  expect(list.length).toBe(10_000);
  for (let i = 9_999; i >= 0; i--) {
    expect(list.peek()).toBe(i);
    expect(list.pop()).toBe(i);
  }
  expect(list.length).toBe(0);
  expect(list.pop()).toBeUndefined();
});

test("stores other falsy values as ordinary entries", () => {
  const list = new Stack<string | boolean | null>();
  list.push(null);
  list.push("");
  list.push(false);
  expect(list.length).toBe(3);
  expect(list.pop()).toBe(false);
  expect(list.peek()).toBe("");
  expect(list.pop()).toBe("");
  expect(list.pop()).toBeNull();
  expect(list.length).toBe(0);
  expect(list.peek()).toBeUndefined();
});

test("matches an array model over seeded random operations", () => {
  const random = seeded(14);
  const list = new Stack<number>();
  const model: number[] = [];
  for (let step = 0; step < 5000; step++) {
    const op = random();
    if (op < 0.5) {
      const value = Math.floor(random() * 5);
      list.push(value);
      model.push(value);
    } else if (op < 0.85) {
      expect(list.pop(), `step ${step}`).toBe(model.pop());
    } else {
      expect(list.peek(), `step ${step}`).toBe(model[model.length - 1]);
    }
    expect(list.length, `step ${step}`).toBe(model.length);
  }
});
