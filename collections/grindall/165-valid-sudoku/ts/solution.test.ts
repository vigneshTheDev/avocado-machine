import {expect, test} from 'vitest';
import {solve} from './solution';

const example = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];

function withCells(cells: Array<[number, number, string]>, base: string[][] = emptyBoard()): string[][] {
  const board = base.map(row => [...row]);
  for (const [r, c, v] of cells) board[r][c] = v;
  return board;
}

function emptyBoard(): string[][] { return Array.from({length: 9}, () => new Array(9).fill('.')); }

test("case 1", () => {
  const args = [[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(true);
});

test("case 2", () => {
  const args = [[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]];
  expect(solve(...args as Parameters<typeof solve>)).toEqual(false);
});

test('an empty board is valid', () => { expect(solve(emptyBoard())).toBe(true); });

test('a duplicate only in a 3x3 box', () => {
  expect(solve(withCells([[0, 0, '4'], [2, 2, '4']]))).toBe(false);
  expect(solve(withCells([[7, 7, '9'], [8, 6, '9']]))).toBe(false);
  expect(solve(withCells([[3, 4, '1'], [5, 3, '1']]))).toBe(false);
});

test('a duplicate only in a column', () => {
  expect(solve(withCells([[0, 4, '2'], [8, 4, '2']]))).toBe(false);
  expect(solve(withCells([[1, 8, '4'], [6, 8, '4']], example))).toBe(false);
});

test('a duplicate only in a row', () => {
  expect(solve(withCells([[4, 0, '3'], [4, 8, '3']]))).toBe(false);
});

test('equal digits in different rows, columns, and boxes are fine', () => {
  expect(solve(withCells([[0, 0, '5'], [1, 3, '5'], [2, 6, '5'], [3, 1, '5'], [4, 4, '5'], [5, 7, '5']]))).toBe(true);
  expect(solve(withCells([[0, 2, '1'], [3, 3, '5']], example))).toBe(true);
});

test('a complete valid board', () => {
  const solved = ['534678912', '672195348', '198342567', '859761423', '426853791', '713924856', '961537284', '287419635', '345286179'];
  expect(solve(solved.map(row => row.split('')))).toBe(true);
  const broken = solved.map(row => row.split(''));
  [broken[0][0], broken[0][1]] = [broken[0][1], broken[0][0]];
  expect(solve(broken)).toBe(false);
});
