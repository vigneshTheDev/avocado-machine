import {expect, test} from 'vitest';
import {solve} from './solution';

function expectValidBoards(n: number, boards: string[][], count: number) {
  expect(boards).toHaveLength(count);
  for (const board of boards) {
    expect(board).toHaveLength(n);
    const columns = board.map(row => {
      expect(row).toHaveLength(n);
      expect(row).toMatch(/^[.Q]+$/);
      expect([...row].filter(cell => cell === 'Q')).toHaveLength(1);
      return row.indexOf('Q');
    });
    expect(new Set(columns).size).toBe(n);
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) expect(Math.abs(columns[i] - columns[j])).not.toBe(j - i);
  }
  expect(new Set(boards.map(board => board.join('|'))).size).toBe(boards.length);
}

test('one queen', () => { expect(solve(1)).toEqual([['Q']]); });

test('two and three queens have no arrangement', () => {
  expect(solve(2)).toEqual([]);
  expect(solve(3)).toEqual([]);
});

test('four queens have two valid arrangements', () => {
  const boards = solve(4);
  expectValidBoards(4, boards, 2);
  expect(boards.map(board => board.join('|')).sort()).toEqual(['..Q.|Q...|...Q|.Q..', '.Q..|...Q|Q...|..Q.']);
});

test('five queens have ten distinct arrangements', () => { expectValidBoards(5, solve(5), 10); });

test('six queens have four distinct arrangements', () => { expectValidBoards(6, solve(6), 4); });

test('eight queens have ninety-two distinct arrangements', () => { expectValidBoards(8, solve(8), 92); });
