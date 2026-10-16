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
