import {expect, test} from 'vitest';
import {solve} from './solution';

test('positive, negative, and fractional bases', () => {
  expect(solve(2, 10)).toBe(1024);
  expect(solve(2, -2)).toBe(0.25);
  expect(solve(2.1, 3)).toBeCloseTo(9.261);
});

test('a zero exponent gives one', () => {
  expect(solve(5, 0)).toBe(1);
  expect(solve(-3.5, 0)).toBe(1);
});

test('a zero base with a positive exponent', () => {
  expect(solve(0, 5)).toBe(0);
  expect(solve(0, 2147483647)).toBe(0);
});

test('negative bases keep the sign of odd powers', () => {
  expect(solve(-2, 3)).toBe(-8);
  expect(solve(-2, 4)).toBe(16);
  expect(solve(-2, -3)).toBe(-0.125);
});

test('the most negative 32-bit exponent', () => {
  expect(solve(1, -2147483648)).toBe(1);
  expect(solve(-1, -2147483648)).toBe(1);
  expect(solve(2, -2147483648)).toBe(0);
});

test('very large exponents need fast exponentiation', () => {
  expect(solve(1, 2147483647)).toBe(1);
  expect(solve(-1, 2147483647)).toBe(-1);
  expect(Math.abs(solve(1.0000001, 50000000) / Math.pow(1.0000001, 50000000) - 1)).toBeLessThan(1e-6);
  expect(solve(0.5, 1000000000)).toBe(0);
});
