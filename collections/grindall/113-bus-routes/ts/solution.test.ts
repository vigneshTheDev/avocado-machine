import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[[1,2,7],[3,6,7]],1,6];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 2", () => {
  const args = [[[1,2,7]],1,1];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(0);
});

test("case 3", () => {
  const args = [[[1,2],[3,4]],1,4];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(-1);
});

test('LeetCode example with an unreachable target', () => {
  expect(solve([[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], 15, 12)).toBe(-1);
});

test('a source that no bus serves', () => {
  expect(solve([[1, 2], [2, 3]], 9, 3)).toBe(-1);
  expect(solve([[1, 2], [2, 3]], 9, 9)).toBe(0);
});

test('one bus covers both stops', () => { expect(solve([[1, 5, 9], [9, 10]], 1, 9)).toBe(1); });

test('counts buses, not stops', () => {
  expect(solve([[1, 2, 3, 4, 5, 6, 7, 8], [8, 9], [1, 100], [100, 9]], 1, 9)).toBe(2);
  expect(solve([[1, 2], [2, 3], [3, 4], [4, 5]], 1, 5)).toBe(4);
});

test('a long chain of transfers', () => {
  const routes = Array.from({length: 500}, (_, i) => Array.from({length: 101}, (_, j) => i * 100 + j));
  expect(solve(routes, 0, 500 * 100)).toBe(500);
  expect(solve(routes, 50, 150)).toBe(2);
});
