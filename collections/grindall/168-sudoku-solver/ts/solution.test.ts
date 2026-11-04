import {expect, test} from 'vitest';
import {solve} from './solution';

function parse(rows: string[]): string[][] { return rows.map(row => row.split('')); }

function expectSolved(puzzle: string[][]) {
  const board = puzzle.map(row => [...row]);
  expect(solve(board)).toBeUndefined();
  const digits = '123456789';
  const sorted = (cells: string[]) => [...cells].sort().join('');
  expect(board).toHaveLength(9);
  for (let i = 0; i < 9; i++) {
    expect(board[i]).toHaveLength(9);
    expect(sorted(board[i])).toBe(digits);
    expect(sorted(board.map(row => row[i]))).toBe(digits);
    const box: string[] = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) box.push(board[3 * Math.floor(i / 3) + r][3 * (i % 3) + c]);
    expect(sorted(box)).toBe(digits);
  }
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if (puzzle[r][c] !== '.') expect(board[r][c]).toBe(puzzle[r][c]);
  return board;
}

test("case 1", () => {
  const args = [[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]];
  solve(...args as Parameters<typeof solve>);
  expect(args[0]).toEqual([["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]);
});

test('the example satisfies every row, column, and box constraint', () => {
  expectSolved(parse(['53..7....', '6..195...', '.98....6.', '8...6...3', '4..8.3..1', '7...2...6', '.6....28.', '...419..5', '....8..79']));
});

test('a board with one empty cell', () => {
  const board = expectSolved(parse(['534678912', '672195348', '198342567', '859761423', '426853791', '713924856', '961537284', '287419635', '34528617.']));
  expect(board[8][8]).toBe('9');
});

test('a second board keeps its givens', () => {
  expectSolved(parse([
    '..9748...', '7........', '.2.1.9...',
    '..7...24.', '.64.1.59.', '.98...3..',
    '...8.3.2.', '........6', '...2759..',
  ]));
});

test('a hard board that needs deep backtracking', () => {
  const board = expectSolved(parse([
    '8........', '..36.....', '.7..9.2..',
    '.5...7...', '....457..', '...1...3.',
    '..1....68', '..85...1.', '.9....4..',
  ]));
  expect(board.map(row => row.join(''))).toEqual([
    '812753649', '943682175', '675491283',
    '154237896', '369845721', '287169534',
    '521974368', '438526917', '796318452',
  ]);
});
