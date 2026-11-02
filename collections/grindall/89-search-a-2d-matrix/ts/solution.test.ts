import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[[1,3,5,7],[10,11,16,20],[23,30,34,60]],3];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(true);
});

test("case 2", () => {
  const args = [[[1,3,5,7],[10,11,16,20]],13];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(false);
});

test('a single cell', () => {
  expect(solve([[5]], 5)).toBe(true);
  expect(solve([[5]], 4)).toBe(false);
});

test('a single row and a single column', () => {
  expect(solve([[1, 3, 5, 7, 9]], 9)).toBe(true);
  expect(solve([[1, 3, 5, 7, 9]], 4)).toBe(false);
  expect(solve([[1], [3], [5], [7]], 1)).toBe(true);
  expect(solve([[1], [3], [5], [7]], 6)).toBe(false);
});

test('targets smaller or larger than every value', () => {
  const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
  expect(solve(matrix, 0)).toBe(false);
  expect(solve(matrix, -10000)).toBe(false);
  expect(solve(matrix, 61)).toBe(false);
});

test('every corner and row boundary', () => {
  const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
  for (const target of [1, 7, 10, 20, 23, 60]) expect(solve(matrix, target)).toBe(true);
  for (const target of [8, 9, 21, 22]) expect(solve(matrix, target)).toBe(false);
});

test('negative values', () => {
  expect(solve([[-10, -8], [-5, -1], [0, 4]], -5)).toBe(true);
  expect(solve([[-10, -8], [-5, -1], [0, 4]], -6)).toBe(false);
});

test('a large matrix', () => {
  const matrix = Array.from({length: 100}, (_, i) => Array.from({length: 100}, (_, j) => (i * 100 + j) * 2));
  expect(solve(matrix, 0)).toBe(true);
  expect(solve(matrix, 19998)).toBe(true);
  expect(solve(matrix, 12345)).toBe(false);
  expect(solve(matrix, 12346)).toBe(true);
});
