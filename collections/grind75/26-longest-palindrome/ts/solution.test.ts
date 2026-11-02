import {expect, test} from 'vitest';
import {longestPalindrome} from './solution';
test.each([
  ['abccccdd', 7],
  ['a', 1],
  ['Aa', 1],
  ['abc', 1],
  ['', 0],
  ['aaaa', 4],
  ['aaa', 3],
  ['aaabbbccc', 7],
  ['AAaa', 4],
  ['aabbccdde', 9],
])('finds maximum palindrome length for %j', (s, expected) => {
  expect(longestPalindrome(s)).toBe(expected);
});
