import {expect, test} from 'vitest';
import {findAnagrams} from './solution';
test.each([
  ['cbaebabacd', 'abc', [0, 6]],
  ['abab', 'ab', [0, 1, 2]],
  ['aaaa', 'aa', [0, 1, 2]],
  ['a', 'ab', []],
  ['ab', 'abcdef', []],
  ['abc', 'abc', [0]],
  ['abc', 'cba', [0]],
  ['abab', 'aab', [0]],
  ['abba', 'aab', []],
  ['baa', 'aa', [1]],
  ['a', 'a', [0]],
  ['xyz', 'a', []],
])('finds anagrams in %j', (s, p, expected) => {
  expect(findAnagrams(s, p)).toEqual(expected);
});
