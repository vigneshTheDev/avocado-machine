import {expect, test} from 'vitest';
import {rob} from './solution';

const cases = [
  {
    "args": [
      [
        0
      ]
    ],
    "expected": 0,
    "name": "baseline: [[0]]"
  },
  {
    "name": "first and last houses cannot both be robbed",
    "args": [
      [
        2,
        3,
        2
      ]
    ],
    "expected": 3
  },
  {
    "name": "single house",
    "args": [
      [
        5
      ]
    ],
    "expected": 5
  },
  {
    "name": "two houses",
    "args": [
      [
        2,
        3
      ]
    ],
    "expected": 3
  },
  {
    "name": "all houses equal, even count",
    "args": [
      [
        4,
        4,
        4,
        4
      ]
    ],
    "expected": 8
  },
  {
    "name": "all houses equal, odd count",
    "args": [
      [
        4,
        4,
        4
      ]
    ],
    "expected": 4
  },
  {
    "name": "skipping both the first and the last house is optimal",
    "args": [
      [
        1,
        3,
        1,
        3,
        1
      ]
    ],
    "expected": 6
  },
  {
    "name": "first and last are adjacent in a longer ring",
    "args": [
      [
        2,
        7,
        9,
        3,
        1
      ]
    ],
    "expected": 11
  },
  {
    "name": "description example",
    "args": [
      [
        3,
        4,
        3
      ]
    ],
    "expected": 4
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(rob(...(args as any))).toEqual(expected);
});
