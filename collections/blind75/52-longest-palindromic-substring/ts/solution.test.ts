import {expect, test} from 'vitest';
import {longestPalindrome} from './solution';

const cases = [
  {
    "args": [
      "cabbac0"
    ],
    "expected": "cabbac",
    "name": "baseline: [\"cabbac0\"]"
  },
  {
    "name": "even length maximum palindrome",
    "args": [
      "cbbd"
    ],
    "expected": "bb"
  },
  {
    "name": "two equally long answers accepted",
    "args": [
      "babad"
    ],
    "expected": "bab"
  },
  {
    "name": "single character",
    "args": [
      "a"
    ],
    "expected": "a"
  },
  {
    "name": "whole string is a palindrome",
    "args": [
      "racecar"
    ],
    "expected": "racecar"
  },
  {
    "name": "even-length palindrome at the end",
    "args": [
      "xyzabba"
    ],
    "expected": "abba"
  },
  {
    "name": "description example",
    "args": [
      "abbc"
    ],
    "expected": "bb"
  }
];

test.each(cases)('$name', ({args, expected}) => {
    const answer = longestPalindrome(...(args as [any]));
    expect(args[0].includes(answer)).toBe(true);
    expect(answer).toBe([...answer].reverse().join(''));
    expect(answer.length).toBe(expected.length);
});
