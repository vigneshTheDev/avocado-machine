import {expect, test} from 'vitest';
import {wordBreak} from './solution';

const cases = [
  {
    "args": [
      "ab",
      [
        "a",
        "ab",
        "b",
        "ba"
      ]
    ],
    "expected": true,
    "name": "baseline: [\"ab\",[\"a\",\"ab\",\"b\",\"ba\"]]"
  },
  {
    "name": "prefix match must continue to end",
    "args": [
      "catsandog",
      [
        "cats",
        "dog",
        "sand",
        "and",
        "cat"
      ]
    ],
    "expected": false
  },
  {
    "name": "multiple word boundaries form valid split",
    "args": [
      "leetcode",
      [
        "leet",
        "code"
      ]
    ],
    "expected": true
  },
  {
    "name": "overlapping words need backtracking",
    "args": [
      "aaaaaaa",
      [
        "aaaa",
        "aaa"
      ]
    ],
    "expected": true
  },
  {
    "name": "dictionary words may be reused",
    "args": [
      "applepenapple",
      [
        "apple",
        "pen"
      ]
    ],
    "expected": true
  },
  {
    "name": "description example",
    "args": [
      "neetcode",
      [
        "neet",
        "code"
      ]
    ],
    "expected": true
  },
  {
    "name": "long run of a with a trailing b",
    "args": [
      "a".repeat(60) + "b",
      ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa"]
    ],
    "expected": false
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(wordBreak(...(args as any))).toEqual(expected);
});
