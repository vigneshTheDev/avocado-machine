import {expect, test} from 'vitest';
import {canPartition} from './solution';
test.each([
  [[1,5,11,5], true],
  [[1,2,3,5], false],
  [[1,1], true],
  [[2], false],
  [[1,2,4], false],
  [[1,2,3,6], true],
  [[3,3,3,4,5], true],
  [[2,2,3,5], false],
])('checks partition for %j', (nums, expected) => {
  expect(canPartition(nums as number[])).toBe(expected);
});
test('handles large sums and inputs too big for brute force', () => {
  expect(canPartition(Array(200).fill(100))).toBe(true);
  // Sum is 19,902, but half (9,951) cannot be made from hundreds plus one 2.
  expect(canPartition([...Array(199).fill(100), 2])).toBe(false);
  expect(canPartition([...Array(199).fill(100), 100])).toBe(true);
  // Sum is 140; forty 1s cannot reach 70 and 100 is too large.
  expect(canPartition([...Array(40).fill(1), 100])).toBe(false);
});
