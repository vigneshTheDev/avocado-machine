import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[[[1,2],[5,6]],[[1,3]],[[4,10]]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([[3,4]]);
});

test("case 2", () => {
  const args = [[[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([[5,6],[7,9]]);
});

test('intervals that touch at an endpoint leave no gap', () => {
  expect(solve([[[1, 3]], [[3, 5]]])).toEqual([]);
  expect(solve([[[1, 3], [5, 6]], [[3, 5]]])).toEqual([]);
});

test('a single employee', () => {
  expect(solve([[[1, 2], [4, 6], [9, 10]]])).toEqual([[2, 4], [6, 9]]);
  expect(solve([[[1, 2]]])).toEqual([]);
});

test('one interval covering everyone else', () => {
  expect(solve([[[1, 100]], [[2, 3], [10, 20]], [[50, 60]]])).toEqual([]);
});

test('gaps are sorted and merged across employees', () => {
  expect(solve([[[10, 12]], [[1, 2], [20, 21]], [[5, 6]]])).toEqual([[2, 5], [6, 10], [12, 20]]);
});

test('many employees', () => {
  const schedule = Array.from({length: 500}, (_, e) => Array.from({length: 20}, (_, j) => [j * 1000 + e, j * 1000 + e + 1]));
  const expected = Array.from({length: 19}, (_, j) => [j * 1000 + 500, (j + 1) * 1000]);
  expect(solve(schedule)).toEqual(expected);
});
