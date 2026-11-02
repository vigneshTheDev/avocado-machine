import {expect, test} from 'vitest';
import {solve} from './solution';

function isBalanced(s: string): boolean {
  let depth = 0;
  for (const ch of s) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else return false;
    if (depth < 0) return false;
  }
  return depth === 0;
}

function expectAllBalanced(n: number, result: string[], count: number) {
  expect(result).toHaveLength(count);
  expect(new Set(result).size).toBe(result.length);
  for (const s of result) {
    expect(s).toHaveLength(2 * n);
    expect(isBalanced(s)).toBe(true);
  }
}

test('one pair', () => { expect(solve(1)).toEqual(['()']); });

test('two pairs in any order', () => { expect(solve(2).sort()).toEqual(['(())', '()()']); });

test('three pairs in any order', () => {
  expect(solve(3).sort()).toEqual(['((()))', '(()())', '(())()', '()(())', '()()()'].sort());
});

test('four pairs give fourteen distinct balanced strings', () => {
  const result = solve(4);
  expectAllBalanced(4, result, 14);
  expect(result.sort()).toEqual([
    '(((())))', '((()()))', '((())())', '((()))()', '(()(()))', '(()()())', '(()())()',
    '(())(())', '(())()()', '()((()))', '()(()())', '()(())()', '()()(())', '()()()()',
  ]);
});

test('eight pairs give 1430 distinct balanced strings', () => { expectAllBalanced(8, solve(8), 1430); });
