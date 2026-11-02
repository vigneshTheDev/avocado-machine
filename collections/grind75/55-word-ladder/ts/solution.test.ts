import {expect, test} from 'vitest';
import {ladderLength} from './solution';
test.each([
  ['hit', 'cog', ['hot','dot','dog','lot','log','cog'], 5],
  ['hit', 'cog', ['hot','dot','dog','lot','log'], 0],
  ['a', 'c', ['a','b','c'], 2],
  ['hot', 'dog', ['hot','dog'], 0],
  ['hot', 'dot', ['dot'], 2],
  ['hit', 'cog', [], 0],
  ['red', 'tax', ['ted','tex','red','tax','tad','den','rex','pee'], 4],
  ['hit', 'hog', ['hot','hog','hig'], 3],
])('finds shortest transformation from %s to %s', (begin, end, words, expected) => {
  expect(ladderLength(begin, end, words as string[])).toBe(expected);
});
test('searches a list of 6,561 words', () => {
  // Every four-letter word over a..i, so aaaa reaches iiii in four changes.
  const letters = 'abcdefghi';
  const words: string[] = [];
  for (const a of letters) for (const b of letters) for (const c of letters) for (const d of letters) words.push(a + b + c + d);
  expect(ladderLength('aaaa', 'iiii', words)).toBe(5);
  expect(ladderLength('aaaa', 'iiiz', words)).toBe(0);
  expect(ladderLength('zaaa', 'iiii', words)).toBe(5);
  expect(ladderLength('abcd', 'abce', words)).toBe(2);
});
