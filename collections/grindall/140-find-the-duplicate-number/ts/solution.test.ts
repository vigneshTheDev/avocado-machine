import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[1,3,4,2,2]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 2", () => {
  const args = [[3,1,3,4,2]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(3);
});

test('the smallest input', () => { expect(solve([1, 1])).toBe(1); });

test('the duplicate may repeat many times', () => {
  expect(solve([3, 3, 3, 3, 3])).toBe(3);
  expect(solve([2, 2, 2, 2, 2])).toBe(2);
});

test('the duplicate is the largest value', () => { expect(solve([4, 1, 2, 3, 4])).toBe(4); });

test('the input array is not modified', () => {
  const nums = [1, 4, 4, 2, 4];
  expect(solve(nums)).toBe(4);
  expect(nums).toEqual([1, 4, 4, 2, 4]);
});

test('a large input', () => {
  const n = 100000;
  const nums = Array.from({length: n}, (_, i) => i + 1);
  nums.push(73129);
  let seed = 17;
  for (let i = nums.length - 1; i > 0; i--) {
    seed = (seed * 48271) % 2147483647;
    const j = seed % (i + 1);
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  const copy = [...nums];
  expect(solve(nums)).toBe(73129);
  expect(nums).toEqual(copy);
});
