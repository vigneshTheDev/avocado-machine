import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([20,24]);
});

test("case 2", () => {
  const args = [[[1,2,3],[1,2,3],[1,2,3]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([1,1]);
});

test('a single list gives a single-value range at its smallest value', () => {
  expect(solve([[3, 8, 11]])).toEqual([3, 3]);
});

test('lists of very different lengths', () => {
  expect(solve([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [50]])).toEqual([12, 50]);
  expect(solve([[10], [1, 4, 9, 12, 20]])).toEqual([9, 10]);
});

test('negative values', () => {
  expect(solve([[-10, -5, 0], [-7, 3], [-6, 8]])).toEqual([-7, -5]);
});

test('ties in width are broken by the lower start', () => {
  expect(solve([[1, 10], [3, 12]])).toEqual([1, 3]);
  expect(solve([[0, 5], [2, 7]])).toEqual([0, 2]);
});

test('many long lists', () => {
  const lists = Array.from({length: 50}, (_, i) => Array.from({length: 2000}, (_, j) => j * 50 + i));
  lists[25] = [...lists[25], 1000000];
  expect(solve(lists)).toEqual([0, 49]);
  const shifted = Array.from({length: 50}, (_, i) => Array.from({length: 2000}, (_, j) => j * 100 + (i === 0 ? 60 : i)));
  expect(solve(shifted)).toEqual([1, 60]);
});
