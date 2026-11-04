import {expect, test} from 'vitest';
import {missingNumber} from './solution';

const cases = [
  {
    "args": [
      [
        1
      ]
    ],
    "expected": 0,
    "name": "baseline: [[1]]"
  },
  {
    "name": "zero is missing",
    "args": [
      [
        1,
        2,
        3
      ]
    ],
    "expected": 0
  },
  {
    "name": "middle number is missing",
    "args": [
      [
        3,
        0,
        1
      ]
    ],
    "expected": 2
  },
  {
    "name": "n is missing",
    "args": [
      [
        0,
        1
      ]
    ],
    "expected": 2
  },
  {
    "name": "single zero",
    "args": [
      [
        0
      ]
    ],
    "expected": 1
  },
  {
    "name": "description example",
    "args": [
      [
        0,
        2
      ]
    ],
    "expected": 1
  },
  {
    "name": "LeetCode example",
    "args": [
      [
        9,
        6,
        4,
        2,
        3,
        5,
        7,
        0,
        1
      ]
    ],
    "expected": 8
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(missingNumber(...(args as any))).toEqual(expected);
});
