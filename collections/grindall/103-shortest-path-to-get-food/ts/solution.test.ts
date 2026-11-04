import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[["X","X","X","X"],["X","*","O","X"],["X","O","#","X"],["X","X","X","X"]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(2);
});

test("case 2", () => {
  const args = [[["*","X","#"]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(-1);
});

test('food next to the start', () => { expect(solve([['*', '#']])).toBe(1); });

test('a grid without food', () => { expect(solve([['*', 'O'], ['O', 'O']])).toBe(-1); });

test('food walled off from the start', () => {
  expect(solve([['*', 'O', 'X', '#'], ['O', 'O', 'X', 'O'], ['X', 'X', 'X', 'O']])).toBe(-1);
});

test('the nearest of several food cells wins', () => {
  expect(solve([
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', '*', 'O', 'X', 'O', 'X'],
    ['X', 'O', 'O', 'X', '#', 'X'],
    ['X', 'O', 'O', 'O', 'O', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X'],
  ])).toBe(6);
  expect(solve([['#', 'O', 'O', '*', 'O', '#']])).toBe(2);
});

test('paths go around walls', () => {
  expect(solve([['*', 'X', '#'], ['O', 'X', 'O'], ['O', 'O', 'O']])).toBe(6);
});

test('a large open grid', () => {
  const n = 200;
  const grid = Array.from({length: n}, () => Array.from({length: n}, () => 'O'));
  grid[0][0] = '*';
  grid[n - 1][n - 1] = '#';
  expect(solve(grid)).toBe(2 * (n - 1));
});
