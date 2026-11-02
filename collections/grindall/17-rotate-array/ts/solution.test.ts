import {expect, test} from 'vitest';
import {solve} from './solution';

function rotated(nums: number[], k: number): number[] {
  const copy = [...nums];
  expect(solve(copy, k)).toBeUndefined();
  return copy;
}

test("case 1", () => {
  const args = [[1,2,3,4,5,6,7],3];
  solve(...args as Parameters<typeof solve>);
  expect(args[0]).toEqual([5,6,7,1,2,3,4]);
});

test("case 2", () => {
  const args = [[-1,-100,3,99],2];
  solve(...args as Parameters<typeof solve>);
  expect(args[0]).toEqual([3,99,-1,-100]);
});

test('k = 0 leaves the array unchanged', () => { expect(rotated([1, 2, 3], 0)).toEqual([1, 2, 3]); });

test('k a multiple of n leaves the array unchanged', () => {
  expect(rotated([1, 2, 3], 3)).toEqual([1, 2, 3]);
  expect(rotated([1, 2, 3], 9)).toEqual([1, 2, 3]);
});

test('k greater than n wraps around', () => {
  expect(rotated([1, 2], 3)).toEqual([2, 1]);
  expect(rotated([1, 2, 3, 4, 5], 12)).toEqual([4, 5, 1, 2, 3]);
});

test('a single element', () => { expect(rotated([42], 5)).toEqual([42]); });

test('the same array object is rotated in place', () => {
  const nums = [1, 2, 3, 4];
  const before = nums;
  solve(nums, 1);
  expect(nums).toBe(before);
  expect(nums).toEqual([4, 1, 2, 3]);
});

test('a large array with a large k', () => {
  const n = 100000;
  const nums = Array.from({length: n}, (_, i) => i);
  solve(nums, 100000 * 3 + 12345);
  expect(nums[0]).toBe(n - 12345);
  expect(nums[12345]).toBe(0);
  expect(nums[n - 1]).toBe(n - 12346);
  expect(new Set(nums).size).toBe(n);
});
