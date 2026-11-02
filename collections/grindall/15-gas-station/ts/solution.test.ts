import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[1,2,3,4,5],[3,4,5,1,2]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(3);
});

test("case 2", () => {
  const args = [[2,3,4],[3,4,3]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(-1);
});

test('a single station', () => {
  expect(solve([5], [5])).toBe(0);
  expect(solve([0], [0])).toBe(0);
  expect(solve([4], [5])).toBe(-1);
});

test('the answer is the last station', () => {
  expect(solve([1, 1, 1, 10], [2, 2, 2, 4])).toBe(3);
  expect(solve([0, 0, 5], [1, 1, 3])).toBe(2);
});

test('the answer is the first station', () => { expect(solve([5, 1, 2], [1, 3, 3])).toBe(0); });

test('total gas exactly equals total cost', () => { expect(solve([2, 0, 1], [1, 2, 0])).toBe(2); });

test('a large circuit', () => {
  const n = 100000;
  const gas = new Array(n).fill(1);
  const cost = new Array(n).fill(1);
  cost[79999] = 2;
  gas[80000] = 2;
  expect(solve(gas, cost)).toBe(80000);
  cost[0] = 2;
  expect(solve(gas, cost)).toBe(-1);
});
