import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[1,3],[2]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 2", () => {
  const args = [[1,2],[3,4]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2.5);
});

test('one array empty', () => {
  expect(solve([], [1])).toBe(1);
  expect(solve([2, 3], [])).toBe(2.5);
  expect(solve([], [1, 2, 3, 4, 5])).toBe(3);
});

test('all values in one array are smaller than the other', () => {
  expect(solve([1, 2, 3], [10, 20, 30])).toBe(6.5);
  expect(solve([10, 20, 30], [1, 2])).toBe(10);
});

test('arrays of very different lengths', () => {
  expect(solve([100], [1, 2, 3, 4, 5, 6, 7, 8])).toBe(5);
  expect(solve([1, 2, 3, 4, 5, 6, 7, 8, 9], [0])).toBe(4.5);
});

test('duplicates and negative values', () => {
  expect(solve([1, 1, 1], [1, 1])).toBe(1);
  expect(solve([-5, -3, -1], [-4, -2])).toBe(-3);
  expect(solve([-2, -1], [3])).toBe(-1);
});

test('interleaved values', () => { expect(solve([1, 4, 7, 10], [2, 3, 8, 9])).toBe(5.5); });

test('large arrays', () => {
  const evens = Array.from({length: 500000}, (_, i) => i * 2);
  const odds = Array.from({length: 500001}, (_, i) => i * 2 + 1);
  expect(solve(evens, odds)).toBe(500000);
  expect(solve(evens, [1000000000])).toBe(500000);
  expect(solve([-1000000], evens)).toBe(499998);
});
