import {expect, test} from 'vitest';
import {characterReplacement} from './solution';

const cases = [
  {
    "args": [
      "AB",
      0
    ],
    "expected": 1,
    "name": "baseline: [\"AB\",0]"
  },
  {
    "name": "window must shrink after frequency changes",
    "args": [
      "AABABBA",
      1
    ],
    "expected": 4
  },
  {
    "name": "no replacements allowed",
    "args": [
      "ABBBAC",
      0
    ],
    "expected": 3
  },
  {
    "name": "k at least the string length",
    "args": [
      "ABC",
      5
    ],
    "expected": 3
  },
  {
    "name": "all the same letter",
    "args": [
      "AAAA",
      0
    ],
    "expected": 4
  },
  {
    "name": "k = 0 with alternating letters",
    "args": [
      "ABABAB",
      0
    ],
    "expected": 1
  },
  {
    "name": "description example",
    "args": [
      "XYYX",
      2
    ],
    "expected": 4
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(characterReplacement(...(args as any))).toEqual(expected);
});
