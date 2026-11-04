import { test, expect } from "vitest";
import insertion_sort from "./solution";

test("insertion-sort", function () {
    const arr = [9, 3, 7, 4, 69, 420, 42];
    insertion_sort(arr);
    expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
});

test.each([[], [1], [2, 1], [1, 2, 3], [5, 4, 3, 2, 1],
  [3, -2, 0, 3, 1.5, -2], [7, 7, 7, 7],
  Array.from({ length: 80 }, (_, i) => (i * 37) % 19 - 9),
])("sorts boundary and duplicate cases: %j", (...input) => {
  const values = [...input];
  const expected = [...values].sort((a, b) => a - b);
  expect(insertion_sort(values)).toBeUndefined();
  expect(values).toEqual(expected);
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

// -0 and 0 compare equal, so their relative order is unspecified. Compare
// numerically and check that the multiset (including the sign of zero) is kept.
function expectSortedCopyOf(actual: number[], input: number[]) {
  const oracle = [...input].sort((a, b) => a - b);
  expect(actual.map((v) => (v === 0 ? 0 : v))).toEqual(oracle.map((v) => (v === 0 ? 0 : v)));
  const negativeZeros = (values: number[]) => values.filter((v) => Object.is(v, -0)).length;
  expect(negativeZeros(actual)).toBe(negativeZeros(input));
}

test("matches a sorted copy over seeded random arrays", () => {
  const random = seeded(0xc0ffee);
  for (let round = 0; round < 300; round++) {
    const length = Math.floor(random() * (200 + 1));
    const spread = [3, 50, 1e6][round % 3];
    const input = Array.from({ length }, () => {
      const value = Math.floor(random() * spread * 2) - spread;
      return random() < 0.2 ? value / 8 : value;
    });
    const values = [...input];
    expect(insertion_sort(values)).toBeUndefined();
    expectSortedCopyOf(values, input);
  }
});

test("orders mixed -0 and 0 and extreme finite magnitudes", () => {
  for (const input of [
    [0, -0, 0, -0, -1, 1],
    [-0, 0],
    [Number.MAX_VALUE, -Number.MAX_VALUE, Number.MIN_VALUE, -Number.MIN_VALUE, 0, 1e-300, -1e-300, 1e300, -1e300],
    [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.EPSILON, -Number.EPSILON, 1 + Number.EPSILON, 1],
  ]) {
    const values = [...input];
    insertion_sort(values);
    expectSortedCopyOf(values, input);
  }
});

// Larger inputs; 2,000 keeps the O(n^2) passes fast.
test.each([
  ["ascending", (i: number) => i],
  ["descending", (i: number) => 2000 - i],
  ["all equal", () => 7],
  ["organ pipe", (i: number) => Math.min(i, 2000 - i)],
  ["two values", (i: number) => i % 2],
])("sorts 2,000 %s elements", (_, make) => {
  const input = Array.from({ length: 2000 }, (_, i) => make(i));
  const values = [...input];
  insertion_sort(values);
  expectSortedCopyOf(values, input);
});
