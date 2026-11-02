import { test, expect } from "vitest";
import RingBuffer from "./solution";

test("RingBuffer", function() {
    const buffer = new RingBuffer<number>();

    buffer.push(5);
    expect(buffer.pop()).toEqual(5);
    expect(buffer.pop()).toEqual(undefined);

    buffer.push(42);
    buffer.push(9);
    expect(buffer.pop()).toEqual(42);
    expect(buffer.pop()).toEqual(9);
    expect(buffer.pop()).toEqual(undefined);

    buffer.push(42);
    buffer.push(9);
    buffer.push(12);
    expect(buffer.get(2)).toEqual(12);
    expect(buffer.get(1)).toEqual(9);
    expect(buffer.get(0)).toEqual(42);
});

test("wraparound, growth, bounds, and refill preserve logical FIFO order", () => {
  const buffer = new RingBuffer<number>();
  const expected: number[] = [];
  expect(buffer.length).toBe(0);
  expect(buffer.pop()).toBeUndefined();
  expect(buffer.get(0)).toBeUndefined();
  for (let round = 0; round < 12; round++) {
    for (let i = 0; i < 40; i++) {
      const value = round * 40 + i;
      buffer.push(value);
      expected.push(value);
    }
    for (let i = 0; i < 25; i++) expect(buffer.pop()).toBe(expected.shift());
    expect(buffer.length).toBe(expected.length);
    expect(buffer.get(-1)).toBeUndefined();
    expect(buffer.get(expected.length)).toBeUndefined();
    expected.forEach((value, i) => expect(buffer.get(i)).toBe(value));
  }
  while (expected.length) expect(buffer.pop()).toBe(expected.shift());
  expect(buffer.pop()).toBeUndefined();
  expect(buffer.length).toBe(0);
  buffer.push(0);
  expect(buffer.get(0)).toBe(0);
  expect(buffer.pop()).toBe(0);
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

test("grows through 1,000 pushes without losing order", () => {
  const buffer = new RingBuffer<number>();
  for (let i = 0; i < 1000; i++) {
    buffer.push(i);
    expect(buffer.length).toBe(i + 1);
    expect(buffer.get(0)).toBe(0);
    expect(buffer.get(i)).toBe(i);
  }
  for (let i = 0; i < 1000; i++) expect(buffer.get(i)).toBe(i);
  for (let i = 0; i < 1000; i++) expect(buffer.pop()).toBe(i);
  expect(buffer.length).toBe(0);
  expect(buffer.pop()).toBeUndefined();
});

test("grows while the head is in the middle of the backing array", () => {
  const buffer = new RingBuffer<number>();
  const expected: number[] = [];
  let next = 0;
  // Pop one for every two pushes so growth repeatedly happens after wraparound.
  for (let i = 0; i < 1500; i++) {
    buffer.push(next);
    expected.push(next++);
    if (i % 2 === 1) expect(buffer.pop()).toBe(expected.shift());
    if (i % 97 === 0) expected.forEach((value, j) => expect(buffer.get(j)).toBe(value));
  }
  expect(buffer.length).toBe(expected.length);
  expected.forEach((value, j) => expect(buffer.get(j)).toBe(value));
  while (expected.length) expect(buffer.pop()).toBe(expected.shift());
  expect(buffer.get(0)).toBeUndefined();
});

test("stores falsy values as ordinary entries", () => {
  const buffer = new RingBuffer<number | string | boolean | null>();
  for (const value of [0, "", false, null]) buffer.push(value);
  expect(buffer.length).toBe(4);
  expect(buffer.get(0)).toBe(0);
  expect(buffer.get(3)).toBeNull();
  expect(buffer.pop()).toBe(0);
  expect(buffer.pop()).toBe("");
  expect(buffer.pop()).toBe(false);
  expect(buffer.pop()).toBeNull();
  expect(buffer.pop()).toBeUndefined();
});

test("matches an array model over seeded random operations", () => {
  const random = seeded(15);
  const buffer = new RingBuffer<number>();
  const model: number[] = [];
  for (let step = 0; step < 6000; step++) {
    const op = random();
    // Bias toward pushes early and pops late so the buffer grows and drains.
    const pushBias = step < 3000 ? 0.65 : 0.35;
    if (op < pushBias) {
      const value = Math.floor(random() * 1000);
      buffer.push(value);
      model.push(value);
    } else if (op < 0.9) {
      expect(buffer.pop(), `step ${step}`).toBe(model.shift());
    } else {
      const idx = Math.floor(random() * (model.length + 2)) - 1;
      expect(buffer.get(idx), `step ${step}`).toBe(idx >= 0 && idx < model.length ? model[idx] : undefined);
    }
    expect(buffer.length, `step ${step}`).toBe(model.length);
  }
});
