import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[5,10,-5]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([5,10]);
});

test("case 2", () => {
  const args = [[8,-8]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([]);
});

test("case 3", () => {
  const args = [[10,2,-5]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([10]);
});

test('left-movers before right-movers never collide', () => {
  expect(solve([-2, -1, 1, 2])).toEqual([-2, -1, 1, 2]);
  expect(solve([-5])).toEqual([-5]);
});

test('a large left-mover destroys a chain', () => {
  expect(solve([1, 2, 3, -10])).toEqual([-10]);
  expect(solve([4, 1, 2, 3, -3])).toEqual([4, 1, 2]);
});

test('equal sizes destroy both and the survivor keeps going', () => {
  expect(solve([5, 3, -3, -5, 7])).toEqual([7]);
  expect(solve([2, 2, -2, -2])).toEqual([]);
  expect(solve([1, -1, -2, 2])).toEqual([-2, 2]);
});

test('a right-mover survives several left-movers', () => {
  expect(solve([10, -1, -2, -3, -10, -1])).toEqual([-1]);
  expect(solve([10, -1, -2, -3])).toEqual([10]);
});

test('a large input', () => {
  const n = 100000;
  const asteroids = [...Array.from({length: n / 2}, (_, i) => (i % 999) + 1), ...Array.from({length: n / 2}, () => -1000)];
  expect(solve(asteroids)).toEqual(new Array(n / 2).fill(-1000));
  const pairs = Array.from({length: n}, (_, i) => (i % 2 === 0 ? 7 : -7));
  expect(solve(pairs)).toEqual([]);
});
