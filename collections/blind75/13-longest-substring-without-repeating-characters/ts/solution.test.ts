import {expect, test} from 'vitest';
import {lengthOfLongestSubstring} from './solution';

const cases = [
  {
    "args": [
      ""
    ],
    "expected": 0,
    "name": "baseline: [\"\"]"
  },
  {
    "name": "repeat at both sides of window",
    "args": [
      "abba"
    ],
    "expected": 2
  },
  {
    "name": "all unique characters",
    "args": [
      "abcd"
    ],
    "expected": 4
  },
  {
    "name": "space counts as a character",
    "args": [
      "ab cd"
    ],
    "expected": 5
  },
  {
    "name": "single space is unique",
    "args": [
      "a b"
    ],
    "expected": 3
  },
  {
    "name": "LeetCode pwwkew",
    "args": [
      "pwwkew"
    ],
    "expected": 3
  },
  {
    "name": "window must not reset to the duplicate index",
    "args": [
      "dvdf"
    ],
    "expected": 3
  },
  {
    "name": "description example",
    "args": [
      "zxyzxyz"
    ],
    "expected": 3
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(lengthOfLongestSubstring(...(args as any))).toEqual(expected);
});

test('50k-character input with a 95-character window', () => {
    const printable = Array.from({length: 95}, (_, i) => String.fromCharCode(32 + i)).join('');
    const s = printable.repeat(527).slice(0, 50000);
    expect(lengthOfLongestSubstring(s)).toBe(95);
});
