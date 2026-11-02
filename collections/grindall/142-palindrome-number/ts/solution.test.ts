import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [121];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(true);
});

test("case 2", () => {
  const args = [-121];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(false);
});

test("case 3", () => {
  const args = [10];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(false);
});

test('zero and single digits', () => {
  expect(solve(0)).toBe(true);
  expect(solve(7)).toBe(true);
  expect(solve(-7)).toBe(false);
});

test('even length palindromes and near misses', () => {
  expect(solve(1221)).toBe(true);
  expect(solve(1231)).toBe(false);
  expect(solve(1000021)).toBe(false);
  expect(solve(1001)).toBe(true);
});

test('32-bit limits', () => {
  expect(solve(2147483647)).toBe(false);
  expect(solve(-2147483648)).toBe(false);
  expect(solve(2147447412)).toBe(true);
  expect(solve(1999999999)).toBe(false);
});
