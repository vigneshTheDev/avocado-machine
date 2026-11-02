import {expect, test} from 'vitest';
import {solve} from './solution';

test("case 1", () => {
  const args = [[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(4);
});

test("case 2", () => {
  const args = [[["0","1"],["1","0"]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(1);
});

test('single cells', () => {
  expect(solve([['0']])).toBe(0);
  expect(solve([['1']])).toBe(1);
});

test('all zeros', () => { expect(solve([['0', '0', '0'], ['0', '0', '0']])).toBe(0); });

test('a rectangular all-ones grid is limited by its short side', () => {
  expect(solve([['1', '1', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '1', '1', '1', '1']])).toBe(9);
  expect(solve([['1'], ['1'], ['1']])).toBe(1);
});

test('a hole breaks the larger square', () => {
  expect(solve([
    ['1', '1', '1', '1'],
    ['1', '1', '1', '1'],
    ['1', '1', '0', '1'],
    ['1', '1', '1', '1'],
  ])).toBe(4);
});

test('a large grid', () => {
  const n = 300;
  const matrix = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => (i === 150 && j === 10 ? '0' : '1')));
  expect(solve(matrix)).toBe(289 * 289);
});
