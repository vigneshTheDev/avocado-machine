import {expect, test} from 'vitest';
import {largestRectangleArea} from './solution';
test.each([
  [[2, 1, 5, 6, 2, 3], 10],
  [[2, 4], 4],
  [[3, 3, 3], 9],
  [[], 0],
  [[7], 7],
  [[0], 0],
  [[1, 2, 3, 4, 5], 9],
  [[5, 4, 3, 2, 1], 9],
  [[2, 0, 2], 2],
  [[4, 0, 1, 1, 1, 0, 3], 4],
])('finds largest rectangle in %j', (heights, expected) => {
  expect(largestRectangleArea(heights as number[])).toBe(expected);
});
test('handles 100,000 bars', () => {
  const n = 100_000;
  const increasing = Array.from({length: n}, (_, i) => i + 1);
  // Bars k..n have height k and width n - k + 1; the best k is n / 2.
  expect(largestRectangleArea(increasing)).toBe((n / 2) * (n / 2 + 1));
  expect(largestRectangleArea(Array(n).fill(1))).toBe(n);
});
