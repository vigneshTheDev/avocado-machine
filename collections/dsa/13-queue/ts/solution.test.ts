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

// Deterministic PRNG so failures are reproducible.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

test("keeps FIFO order across 10,000 entries", () => {
  const list = new Queue<number>();
  for (let i = 0; i < 10_000; i++) list.enqueue(i);
  expect(list.length).toBe(10_000);
  for (let i = 0; i < 10_000; i++) {
    expect(list.peek()).toBe(i);
    expect(list.deque()).toBe(i);
  }
  expect(list.length).toBe(0);
  expect(list.deque()).toBeUndefined();
});

test("emptying to one element and refilling keeps head and tail linked", () => {
  const list = new Queue<string | boolean | null>();
  list.enqueue("a");
  expect(list.deque()).toBe("a");
  list.enqueue(false);
  list.enqueue("");
  expect(list.deque()).toBe(false);
  list.enqueue(null);
  expect(list.peek()).toBe("");
  expect(list.deque()).toBe("");
  expect(list.deque()).toBeNull();
  expect(list.length).toBe(0);
  list.enqueue("b");
  list.enqueue("c");
  expect(list.deque()).toBe("b");
  expect(list.deque()).toBe("c");
  expect(list.deque()).toBeUndefined();
});

test("matches an array model over seeded random operations", () => {
  const random = seeded(13);
  const list = new Queue<number>();
  const model: number[] = [];
  for (let step = 0; step < 5000; step++) {
    const op = random();
    if (op < 0.5) {
      const value = Math.floor(random() * 5);
      list.enqueue(value);
      model.push(value);
    } else if (op < 0.85) {
      expect(list.deque(), `step ${step}`).toBe(model.shift());
    } else {
      expect(list.peek(), `step ${step}`).toBe(model[0]);
    }
    expect(list.length, `step ${step}`).toBe(model.length);
  }
});
