import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[2,2,1]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(1);
});

test("case 2", () => {
  const args = [[4,1,2,1,2]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(4);
});

test('a single element', () => { expect(solve([1])).toBe(1); });

test('negative values and zero', () => {
  expect(solve([-1, 3, 3])).toBe(-1);
  expect(solve([0, -7, -7])).toBe(0);
  expect(solve([-30000, 30000, -30000])).toBe(30000);
});

test('the single value can be anywhere', () => {
  expect(solve([9, 5, 5, 6, 6])).toBe(9);
  expect(solve([5, 6, 9, 6, 5])).toBe(9);
});

test('a large input', () => {
  const nums: number[] = [];
  for (let i = 1; i <= 7500; i++) nums.push(i, -i);
  for (let i = 1; i <= 7500; i++) nums.push(-i, i);
  nums.splice(12345, 0, 29999);
  expect(solve(nums)).toBe(29999);
});
