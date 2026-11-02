import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[1,2,3,4,5],4,3];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([1,2,3,4]);
});

test("case 2", () => {
  const args = [[1,2,3,4,5],4,-1];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([1,2,3,4]);
});

test('x beyond the right end', () => {
  expect(solve([1, 2, 3, 4, 5], 2, 100)).toEqual([4, 5]);
  expect(solve([1, 3, 7], 1, 8)).toEqual([7]);
});

test('equal-distance ties prefer the smaller value', () => {
  expect(solve([1, 2, 4, 5], 1, 3)).toEqual([2]);
  expect(solve([1, 2, 4, 5], 3, 3)).toEqual([1, 2, 4]);
  expect(solve([1, 1, 2, 2, 2, 2, 2, 3, 3], 3, 3)).toEqual([2, 3, 3]);
});

test('k equal to the array length', () => {
  expect(solve([-3, 0, 8], 3, 100)).toEqual([-3, 0, 8]);
  expect(solve([4], 1, -4)).toEqual([4]);
});

test('duplicates and x present in the array', () => {
  expect(solve([0, 0, 1, 2, 3, 3, 4, 7, 7, 8], 3, 5)).toEqual([3, 3, 4]);
  expect(solve([1, 1, 1, 10, 10, 10], 1, 9)).toEqual([10]);
});

test('a large array', () => {
  const arr = Array.from({length: 100000}, (_, i) => i * 2);
  expect(solve(arr, 4, 100001)).toEqual([99998, 100000, 100002, 100004]);
  expect(solve(arr, 3, -50)).toEqual([0, 2, 4]);
});
