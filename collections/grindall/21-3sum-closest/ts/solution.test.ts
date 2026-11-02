import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[-1,2,1,-4],1];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 2", () => {
  const args = [[0,0,0],1];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(0);
});

test('an exact match and a near miss with negatives', () => {
  expect(solve([1, 2, 4, 8, 16], 14)).toBe(14);
  expect(solve([-3, -2, -5, 3, -4], -1)).toBe(-2);
});

test('all negative values', () => { expect(solve([-8, -6, -3, -1], -100)).toBe(-17); });

test('the target is far above every sum', () => { expect(solve([1, 1, 1, 0], 100)).toBe(3); });

test('elements are used at most once each', () => {
  expect(solve([1, 1, -1, -1, 3], -1)).toBe(-1);
  expect(solve([5, 1, 2], 100)).toBe(8);
});

test('large values', () => {
  expect(solve([1000, -1000, 999, -999, 0], 2995)).toBe(1999);
  expect(solve([-1000, -1000, -1000, 1000], -10000)).toBe(-3000);
});

test('a large input needs better than cubic time', () => {
  const nums = Array.from({length: 1000}, (_, i) => i * 3);
  expect(solve(nums, 1)).toBe(9);
  expect(solve(nums, 5000)).toBe(5001);
});
