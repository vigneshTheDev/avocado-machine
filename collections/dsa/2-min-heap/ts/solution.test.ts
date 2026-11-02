import { describe, expect, test } from "vitest";
import { MinHeap } from "./solution";

describe("MinHeap", () => {
  test("starts empty and tolerates repeated empty operations", () => {
    const heap = new MinHeap();

    expect(heap.size).toBe(0);
    expect(heap.peek()).toBeUndefined();
    expect(heap.extractMin()).toBeUndefined();
    expect(heap.extractMin()).toBeUndefined();
    expect(heap.peek()).toBeUndefined();
    expect(heap.size).toBe(0);
  });

  test("peeks without removing and extracts a single value", () => {
    const heap = new MinHeap();
    heap.insert(42);

    expect(heap.size).toBe(1);
    expect(heap.peek()).toBe(42);
    expect(heap.peek()).toBe(42);
    expect(heap.size).toBe(1);
    expect(heap.extractMin()).toBe(42);
    expect(heap.size).toBe(0);
    expect(heap.peek()).toBeUndefined();
    expect(heap.extractMin()).toBeUndefined();
  });

  test.each([
    [1, 2, 3, 4, 5, 6, 7, 8],
    [8, 7, 6, 5, 4, 3, 2, 1],
    [7, 2, 8, 1, 6, 3, 5, 4],
    [0, -4, 2.5, -1.5, 0, -4, 10, 2.5],
    [5, 5, 5, 5, 5],
  ])("extracts every value in ascending order: %j", (...values) => {
    const heap = new MinHeap();
    values.forEach((value, index) => {
      heap.insert(value);
      expect(heap.size).toBe(index + 1);
      expect(heap.peek()).toBe(Math.min(...values.slice(0, index + 1)));
    });

    const sorted = [...values].sort((a, b) => a - b);
    sorted.forEach((value, index) => {
      expect(heap.peek()).toBe(value);
      expect(heap.extractMin()).toBe(value);
      expect(heap.size).toBe(sorted.length - index - 1);
    });
    expect(heap.peek()).toBeUndefined();
    expect(heap.extractMin()).toBeUndefined();
  });

  test("maintains order across interleaved insertions and extractions", () => {
    const heap = new MinHeap();
    [9, 3, 7, 1, 6].forEach((value) => heap.insert(value));

    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(3);
    heap.insert(2);
    heap.insert(-5);
    heap.insert(7);
    expect(heap.size).toBe(6);
    expect(heap.extractMin()).toBe(-5);
    expect(heap.extractMin()).toBe(2);
    expect(heap.peek()).toBe(6);
    heap.insert(0);
    expect(heap.size).toBe(5);
    expect(Array.from({ length: 5 }, () => heap.extractMin())).toEqual([
      0, 6, 7, 7, 9,
    ]);
    expect(heap.size).toBe(0);
  });

  test("can be reused after being drained", () => {
    const heap = new MinHeap();
    heap.insert(2);
    heap.insert(1);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(2);
    expect(heap.extractMin()).toBeUndefined();

    heap.insert(-3);
    heap.insert(0);
    expect(heap.size).toBe(2);
    expect(heap.peek()).toBe(-3);
    expect(heap.extractMin()).toBe(-3);
    expect(heap.extractMin()).toBe(0);
    expect(heap.size).toBe(0);
  });

  test("keeps heap instances independent", () => {
    const first = new MinHeap();
    const second = new MinHeap();
    first.insert(8);
    second.insert(-2);
    first.insert(3);

    expect(first.size).toBe(2);
    expect(second.size).toBe(1);
    expect(first.extractMin()).toBe(3);
    expect(second.extractMin()).toBe(-2);
    expect(second.size).toBe(0);
    expect(first.peek()).toBe(8);
    expect(first.size).toBe(1);
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

  test("drains 1,000 random values (with duplicates) in ascending order", () => {
    const random = seeded(2024);
    const heap = new MinHeap();
    const values = Array.from({ length: 1000 }, () => Math.floor(random() * 400) - 200 + (random() < 0.2 ? 0.5 : 0));
    values.forEach((value) => heap.insert(value));
    expect(heap.size).toBe(1000);

    const drained: (number | undefined)[] = [];
    while (heap.size > 0) drained.push(heap.extractMin());
    expect(drained).toEqual([...values].sort((a, b) => a - b));
    expect(heap.extractMin()).toBeUndefined();
  });

  test("drains 1,000 ascending and descending inserts", () => {
    for (const values of [
      Array.from({ length: 1000 }, (_, i) => i),
      Array.from({ length: 1000 }, (_, i) => 1000 - i),
    ]) {
      const heap = new MinHeap();
      values.forEach((value) => heap.insert(value));
      const sorted = [...values].sort((a, b) => a - b);
      for (const value of sorted) expect(heap.extractMin()).toBe(value);
      expect(heap.size).toBe(0);
    }
  });

  test("matches a sorted-array model under random interleaved operations", () => {
    const random = seeded(77);
    const heap = new MinHeap();
    const model: number[] = [];
    for (let step = 0; step < 5000; step++) {
      if (random() < 0.55) {
        const value = Math.floor(random() * 100) - 50;
        heap.insert(value);
        model.push(value);
        model.sort((a, b) => a - b);
      } else {
        expect(heap.extractMin(), `step ${step}`).toBe(model.shift());
      }
      expect(heap.size).toBe(model.length);
      expect(heap.peek()).toBe(model[0]);
    }
  });

  test("size is read-only", () => {
    const heap = new MinHeap();
    heap.insert(1);
    heap.insert(2);
    try {
      (heap as unknown as { size: number }).size = 5;
    } catch {
      // Throwing on assignment is an acceptable way to be read-only.
    }
    expect(heap.size).toBe(2);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(2);
    expect(heap.extractMin()).toBeUndefined();
    expect(heap.size).toBe(0);
  });
});
