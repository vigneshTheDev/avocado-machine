import {expect, test} from 'vitest';
import {countSubstrings} from './solution';

const cases = [
  {
    "args": [
      "a"
    ],
    "expected": 1,
    "name": "baseline: [\"a\"]"
  },
  {
    "name": "even and odd palindromes overlap",
    "args": [
      "aaa"
    ],
    "expected": 6
  },
  {
    "name": "no palindrome longer than one character",
    "args": [
      "abc"
    ],
    "expected": 3
  },
  {
    "name": "empty string",
    "args": [
      ""
    ],
    "expected": 0
  },
  {
    "name": "even palindrome inside",
    "args": [
      "abba"
    ],
    "expected": 6
  },
  {
    "name": "1000 identical characters",
    "args": [
      "a".repeat(1000)
    ],
    "expected": 500500
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(countSubstrings(...(args as any))).toEqual(expected);
});
