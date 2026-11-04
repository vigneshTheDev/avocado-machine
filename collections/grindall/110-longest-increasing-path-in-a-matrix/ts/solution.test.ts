import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[[9,9,4],[6,6,8],[2,1,1]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(4);
});

test("case 2", () => {
  const args = [[[3,4,5],[3,2,6],[2,2,1]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(4);
});

test('a single cell', () => { expect(solve([[1]])).toBe(1); });

test('equal values are not increasing', () => { expect(solve([[7, 7, 7], [7, 7, 7]])).toBe(1); });

test('a single row and a single column', () => {
  expect(solve([[1, 2, 3, 2, 1, 0]])).toBe(4);
  expect(solve([[5], [4], [3], [9]])).toBe(3);
});

test('no diagonal moves', () => { expect(solve([[1, 9], [9, 2]])).toBe(2); });

test('a snake path covers every cell', () => {
  const n = 50;
  const matrix = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i * n + (i % 2 === 0 ? j : n - 1 - j)));
  expect(solve(matrix)).toBe(n * n);
});

test('a large grid needs memoisation', () => {
  const n = 200;
  const matrix = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i + j));
  expect(solve(matrix)).toBe(2 * n - 1);
});
