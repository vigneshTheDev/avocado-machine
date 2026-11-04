import { test, expect } from "vitest";
import binary_fn from "./solution"

test("binary search array", function() {

    const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
    expect(binary_fn(foo, 69)).toEqual(true);
    expect(binary_fn(foo, 1336)).toEqual(false);
    expect(binary_fn(foo, 69420)).toEqual(true);
    expect(binary_fn(foo, 69421)).toEqual(false);
    expect(binary_fn(foo, 1)).toEqual(true);
    expect(binary_fn(foo, 0)).toEqual(false);
});

test.each([
  [[], 0, false], [[4], 4, true], [[4], 3, false],
  [[-5, -1, 0, 0, 2.5, 8], 0, true],
  [[-5, -1, 0, 0, 2.5, 8], 2.5, true],
  [[-5, -1, 0, 0, 2.5, 8], -6, false],
  [[-5, -1, 0, 0, 2.5, 8], 9, false],
  [[1, 3], 2, false],
])("searches %j for %s", (values, needle, expected) => {
  const before = [...values];
  expect(binary_fn(values, needle)).toBe(expected);
  expect(values).toEqual(before);
});

// Wraps an array in a Proxy that records which indices are read.
function countingArray(values: number[]) {
  const read = new Set<number>();
  const proxy = new Proxy(values, {
    get(target, key, receiver) {
      if (typeof key === "string" && /^-?\d+$/.test(key)) read.add(Number(key));
      return Reflect.get(target, key, receiver);
    },
  });
  return { proxy, read };
}

test("reads O(log n) distinct indices of a 1,000,000-element array", () => {
  const n = 1_000_000;
  const values = Array.from({ length: n }, (_, i) => i * 2);
  // Slack above ceil(log2 n) so off-by-one loop shapes are still accepted.
  const limit = Math.ceil(Math.log2(n)) + 2;
  for (const [needle, expected] of [
    [0, true], [(n - 1) * 2, true], [n, true], [-1, false], [1, false],
    [n * 2, false], [(n - 1) * 2 - 1, false], [n + 1, false],
  ] as const) {
    const { proxy, read } = countingArray(values);
    expect(binary_fn(proxy, needle)).toBe(expected);
    expect(read.size, `needle ${needle} read ${read.size} indices`).toBeLessThanOrEqual(limit);
  }
});

test("finds both ends and misses of a larger array with duplicates", () => {
  const values = [-7, -7, -7, ...Array.from({ length: 997 }, (_, i) => i), 996, 996];
  const before = [...values];
  expect(binary_fn(values, -7)).toBe(true);
  expect(binary_fn(values, 996)).toBe(true);
  expect(binary_fn(values, 500)).toBe(true);
  expect(binary_fn(values, -8)).toBe(false);
  expect(binary_fn(values, -6)).toBe(false);
  expect(binary_fn(values, 997)).toBe(false);
  expect(binary_fn(values, 0.5)).toBe(false);
  expect(values).toEqual(before);
});
