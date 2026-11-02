import {expect, test} from 'vitest';
import {lengthOfLIS} from './solution';

const cases = [
  {
    "args": [
      [
        0
      ]
    ],
    "expected": 1,
    "name": "baseline: [[0]]"
  },
  {
    "name": "duplicate values are not increasing",
    "args": [
      [
        2,
        2,
        2
      ]
    ],
    "expected": 1
  },
  {
    "name": "later small values allow longer subsequence",
    "args": [
      [
        10,
        9,
        2,
        5,
        3,
        7,
        101,
        18
      ]
    ],
    "expected": 4
  },
  {
    "name": "strictly decreasing",
    "args": [
      [
        5,
        4,
        3,
        2,
        1
      ]
    ],
    "expected": 1
  },
  {
    "name": "description example",
    "args": [
      [
        9,
        1,
        4,
        2,
        3,
        3,
        7
      ]
    ],
    "expected": 4
  },
  {
    "name": "2500 elements",
    "args": [
      Array.from({length: 2500}, (_, i) => (i % 50) * 50 + (49 - Math.floor(i / 50)))
    ],
    "expected": 50
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(lengthOfLIS(...(args as any))).toEqual(expected);
});
