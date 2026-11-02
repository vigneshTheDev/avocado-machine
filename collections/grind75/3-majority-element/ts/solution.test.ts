import {expect, test} from 'vitest';
import {majorityElement} from './solution';
test.each([
  [[3], 3],
  [[2, 2, 1, 2], 2],
  [[1, 2, 1, 2, 2], 2],
  [[1, 1, 2, 2, 2], 2],
  [[-1, -1, 2], -1],
  [[3, -5, -5, 3, -5], -5],
])('finds majority in %j', (nums, expected) => {
  expect(majorityElement(nums as number[])).toBe(expected);
});
test('finds majority in 50,000 shuffled values', () => {
  let seed = 7;
  const next = () => (seed = (seed * 48271) % 2147483647);
  const nums = [...Array(25001).fill(42), ...Array.from({length: 24999}, () => next() % 1000)];
  for (let i = nums.length - 1; i > 0; i--) {
    const j = next() % (i + 1);
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  expect(majorityElement(nums)).toBe(42);
});
