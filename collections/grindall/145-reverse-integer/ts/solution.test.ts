import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [123];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(321);
});

test("case 2", () => {
  const args = [-123];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(-321);
});

test("case 3", () => {
  const args = [1534236469];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(0);
});

test('zero and trailing zeros', () => {
  expect(solve(0)).toBe(0);
  expect(solve(120)).toBe(21);
  expect(solve(-1000)).toBe(-1);
});

test('the 32-bit limits overflow when reversed', () => {
  expect(solve(-2147483648)).toBe(0);
  expect(solve(2147483647)).toBe(0);
  expect(solve(1563847412)).toBe(0);
  expect(solve(-1563847412)).toBe(0);
});

test('reversals that just fit', () => {
  expect(solve(1463847412)).toBe(2147483641);
  expect(solve(-1463847412)).toBe(-2147483641);
  expect(solve(-2147483412)).toBe(-2143847412);
});
