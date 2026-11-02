import {expect, test} from 'vitest';
import {trap} from './solution';
test.each([
  [[0, 1, 0, 2, 1, 0, 1, 3], 5],
  [[4, 2, 0, 3, 2, 5], 9],
  [[1, 2, 3], 0],
  [[], 0],
  [[5], 0],
  [[3, 3], 0],
  [[5, 2, 1, 2, 1, 5], 14],
  [[5, 4, 3, 2, 1], 0],
  [[2, 0, 2], 2],
  [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], 6],
])('counts water for %j', (heights, expected) => {
  expect(trap(heights as number[])).toBe(expected);
});
test('counts water across 20,000 bars', () => {
  // Alternating walls of height 3 with pits of height 0 hold 3 units per pit.
  const heights = Array.from({length: 20_001}, (_, i) => (i % 2 === 0 ? 3 : 0));
  expect(trap(heights)).toBe(30_000);
});
