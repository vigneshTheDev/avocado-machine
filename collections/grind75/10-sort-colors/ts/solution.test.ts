import {expect, test} from 'vitest';
import {sortColors} from './solution';
test.each([
  [[2, 0, 2, 1, 1, 0], [0, 0, 1, 1, 2, 2]],
  [[2, 0, 1], [0, 1, 2]],
  [[1], [1]],
  [[], []],
  [[2, 2, 2], [2, 2, 2]],
  [[0, 0, 1, 1, 2, 2], [0, 0, 1, 1, 2, 2]],
  [[2, 2, 0, 0, 1], [0, 0, 1, 2, 2]],
  [[1, 1, 1, 2, 1, 1, 0, 1], [0, 1, 1, 1, 1, 1, 1, 2]],
])('sorts %j in place', (nums, expected) => {
  const original = nums as number[];
  expect(sortColors(original)).toBeUndefined();
  expect(original).toEqual(expected);
});
test('sorts 1,000 pseudo-random colors in place', () => {
  let seed = 11;
  const next = () => (seed = (seed * 48271) % 2147483647);
  const nums = Array.from({length: 1000}, () => next() % 3);
  const expected = [...nums].sort((a, b) => a - b);
  expect(sortColors(nums)).toBeUndefined();
  expect(nums).toEqual(expected);
});
