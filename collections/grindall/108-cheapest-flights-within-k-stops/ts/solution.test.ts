import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [4,[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],0,3,1];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(700);
});

test("case 2", () => {
  const args = [3,[[0,1,100],[1,2,100],[0,2,500]],0,2,1];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(200);
});

test('zero stops allows only a direct flight', () => {
  expect(solve(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0)).toBe(500);
  expect(solve(3, [[0, 1, 100], [1, 2, 100]], 0, 2, 0)).toBe(-1);
});

test('unreachable destination', () => { expect(solve(3, [[0, 1, 100], [2, 0, 100]], 0, 2, 2)).toBe(-1); });

test('a cheaper path with more stops is not allowed', () => {
  const flights = [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1], [0, 4, 100]];
  expect(solve(5, flights, 0, 4, 2)).toBe(100);
  expect(solve(5, flights, 0, 4, 3)).toBe(4);
});

test('cycles do not reduce the fare', () => {
  expect(solve(4, [[0, 1, 1], [1, 0, 1], [1, 2, 5], [2, 3, 1], [0, 3, 10]], 0, 3, 5)).toBe(7);
});

test('the cheapest way into a node is not always usable within the stop limit', () => {
  // Node 1 is cheapest via node 3 (one extra stop), but only the direct 0 -> 1 flight leaves room for 1 -> 4 -> 2.
  const flights = [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 1], [4, 2, 1]];
  expect(solve(5, flights, 0, 2, 2)).toBe(7);
  expect(solve(5, flights, 0, 2, 1)).toBe(10);
});

test('a larger layered graph', () => {
  const n = 100;
  const flights: number[][] = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < Math.min(n, i + 10); j++) flights.push([i, j, (j - i) * (j - i)]);
  expect(solve(n, flights, 0, n - 1, n - 2)).toBe(n - 1);
  expect(solve(n, flights, 0, n - 1, 10)).toBe(891);
  expect(solve(n, flights, 0, n - 1, 9)).toBe(-1);
});
