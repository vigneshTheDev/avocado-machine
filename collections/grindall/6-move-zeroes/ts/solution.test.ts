import {expect, test} from 'vitest';
import {solve} from './solution';

function moved(nums: number[]): number[] {
  const copy = [...nums];
  expect(solve(copy)).toBeUndefined();
  return copy;
}

test("case 1", () => {
  const args = [[0,1,0,3,12]];
  solve(...args as Parameters<typeof solve>);
  expect(args[0]).toEqual([1,3,12,0,0]);
});

test("case 2", () => {
  const args = [[0,0,1]];
  solve(...args as Parameters<typeof solve>);
  expect(args[0]).toEqual([1,0,0]);
});

test('LeetCode example with a single zero', () => { expect(moved([0])).toEqual([0]); });

test('no zeros leaves the array unchanged', () => { expect(moved([4, -2, 7])).toEqual([4, -2, 7]); });

test('all zeros', () => { expect(moved([0, 0, 0])).toEqual([0, 0, 0]); });

test('zeros already at the end', () => { expect(moved([1, 2, 0, 0])).toEqual([1, 2, 0, 0]); });

test('negative values keep their relative order', () => { expect(moved([-1, 0, -3, 0, 2, -1])).toEqual([-1, -3, 2, -1, 0, 0]); });

test('the same array object is mutated and nothing is returned', () => {
  const nums = [0, 5, 0, 6];
  const before = nums;
  expect(solve(nums)).toBeUndefined();
  expect(nums).toBe(before);
  expect(nums).toEqual([5, 6, 0, 0]);
});

test('a large array', () => {
  const n = 100000;
  const nums = Array.from({length: n}, (_, i) => (i % 3 === 0 ? 0 : i));
  solve(nums);
  const nonZero = Array.from({length: n}, (_, i) => i).filter(i => i % 3 !== 0);
  expect(nums).toEqual([...nonZero, ...new Array(n - nonZero.length).fill(0)]);
});
