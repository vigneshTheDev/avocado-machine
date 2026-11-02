import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[1,1,1],2];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 2", () => {
  const args = [[1,2,3],3];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 3", () => {
  const args = [[0,0,0],0];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(6);
});

test('a single element', () => {
  expect(solve([5], 5)).toBe(1);
  expect(solve([5], 3)).toBe(0);
});

test('negative values', () => {
  expect(solve([1, -1, 1, -1], 0)).toBe(4);
  expect(solve([3, 4, 7, 2, -3, 1, 4, 2], 7)).toBe(4);
});

test('a negative k', () => {
  expect(solve([-1, -1, 1], -1)).toBe(3);
  expect(solve([2, -5, 1, -2, 3], -4)).toBe(2);
});

test('no subarray matches', () => { expect(solve([1, 2, 3], 7)).toBe(0); });

test('a large input needs prefix sums', () => {
  const n = 20000;
  const zeros = new Array(n).fill(0);
  expect(solve(zeros, 0)).toBe((n * (n + 1)) / 2);
  const alternating = Array.from({length: n}, (_, i) => (i % 2 === 0 ? 1 : -1));
  // Prefix sums alternate 0, 1, 0, 1, ...; each odd end pairs with every earlier even start.
  expect(solve(alternating, 1)).toBe(50005000);
});
