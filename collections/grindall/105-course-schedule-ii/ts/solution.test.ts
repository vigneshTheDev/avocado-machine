import {expect, test} from 'vitest';
import {solve} from './solution';

function expectValidOrder(numCourses: number, prerequisites: number[][], order: number[]) {
  expect(order).toHaveLength(numCourses);
  expect([...order].sort((a, b) => a - b)).toEqual(Array.from({length: numCourses}, (_, i) => i));
  const position = new Map(order.map((course, index) => [course, index]));
  for (const [course, prerequisite] of prerequisites) expect(position.get(prerequisite)!).toBeLessThan(position.get(course)!);
}

test("case 1", () => {
  const args = [2,[[1,0]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([0,1]);
});

test("case 2", () => {
  const args = [2,[[1,0],[0,1]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual([]);
});

test('a single course with no prerequisites', () => { expect(solve(1, [])).toEqual([0]); });

test('a self-loop makes the schedule impossible', () => {
  expect(solve(1, [[0, 0]])).toEqual([]);
  expect(solve(3, [[1, 0], [2, 2]])).toEqual([]);
});

test('a diamond with many valid orders', () => {
  const prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]];
  expectValidOrder(4, prerequisites, solve(4, prerequisites));
});

test('courses without edges may appear anywhere', () => {
  const prerequisites = [[3, 1], [4, 3], [5, 0], [5, 4]];
  expectValidOrder(7, prerequisites, solve(7, prerequisites));
  expectValidOrder(5, [], solve(5, []));
});

test('a cycle hidden behind an acyclic prefix', () => {
  expect(solve(5, [[1, 0], [2, 1], [3, 2], [1, 3], [4, 0]])).toEqual([]);
});

test('a long chain and a wide fan-in', () => {
  const n = 2000;
  const chain = Array.from({length: n - 1}, (_, i) => [i + 1, i]);
  expectValidOrder(n, chain, solve(n, chain));
  const fan = Array.from({length: n - 1}, (_, i) => [n - 1, i]);
  expectValidOrder(n, fan, solve(n, fan));
});

test('a dense random DAG', () => {
  const n = 2000;
  const prerequisites: number[][] = [];
  let seed = 11;
  const next = () => (seed = (seed * 1103515245 + 12345) % 2147483648);
  for (let i = 0; i < 5000; i++) {
    const a = next() % n, b = next() % n;
    if (a !== b) prerequisites.push([Math.max(a, b), Math.min(a, b)]);
  }
  expectValidOrder(n, prerequisites, solve(n, prerequisites));
  expect(solve(n, [...prerequisites, [0, n - 1], [n - 1, 0]])).toEqual([]);
});
