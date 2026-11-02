import {expect, test} from 'vitest';
import {numDecodings} from './solution';

const cases = [
  {
    "args": [
      "10"
    ],
    "expected": 1,
    "name": "baseline: [\"10\"]"
  },
  {
    "name": "zero must belong to ten or twenty",
    "args": [
      "101"
    ],
    "expected": 1
  },
  {
    "name": "invalid leading zero",
    "args": [
      "06"
    ],
    "expected": 0
  },
  {
    "name": "single zero",
    "args": [
      "0"
    ],
    "expected": 0
  },
  {
    "name": "27 has only one decoding",
    "args": [
      "27"
    ],
    "expected": 1
  },
  {
    "name": "226",
    "args": [
      "226"
    ],
    "expected": 3
  },
  {
    "name": "double zero",
    "args": [
      "100"
    ],
    "expected": 0
  },
  {
    "name": "description example",
    "args": [
      "12"
    ],
    "expected": 2
  },
  {
    "name": "45 ones",
    "args": [
      "1".repeat(45)
    ],
    "expected": 1836311903
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(numDecodings(...(args as any))).toEqual(expected);
});
