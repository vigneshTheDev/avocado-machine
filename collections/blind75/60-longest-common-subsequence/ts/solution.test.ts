import {expect, test} from 'vitest';
import {longestCommonSubsequence} from './solution';

const cases = [
  {
    "args": [
      "a",
      "b"
    ],
    "expected": 0,
    "name": "baseline: [\"a\",\"b\"]"
  },
  {
    "name": "order matters in a subsequence",
    "args": [
      "abc",
      "cba"
    ],
    "expected": 1
  },
  {
    "name": "repeated letters can be selected separately",
    "args": [
      "aaaa",
      "aa"
    ],
    "expected": 2
  },
  {
    "name": "identical strings",
    "args": [
      "abcde",
      "abcde"
    ],
    "expected": 5
  },
  {
    "name": "no common letters",
    "args": [
      "abc",
      "xyz"
    ],
    "expected": 0
  },
  {
    "name": "description example",
    "args": [
      "cat",
      "crabt"
    ],
    "expected": 3
  },
  {
    "name": "1000-character strings",
    "args": [
      "ab".repeat(500),
      "ba".repeat(500)
    ],
    "expected": 999
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(longestCommonSubsequence(...(args as any))).toEqual(expected);
});
