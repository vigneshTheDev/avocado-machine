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
});
