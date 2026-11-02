import {expect, test} from 'vitest';
import {findMin} from './solution';

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
    "name": "unrotated sorted input",
    "args": [
      [
        1,
        2,
        3,
        4
      ]
    ],
    "expected": 1
  },
  {
    "name": "pivot at final element",
    "args": [
      [
        2,
        3,
        4,
        1
      ]
    ],
    "expected": 1
  },
  {
    "name": "rotated by one",
    "args": [
      [
        5,
        1,
        2,
        3,
        4
      ]
    ],
    "expected": 1
  },
  {
    "name": "two elements rotated",
    "args": [
      [
        2,
        1
      ]
    ],
    "expected": 1
  },
  {
    "name": "two elements unrotated",
    "args": [
      [
        1,
        2
      ]
    ],
    "expected": 1
  },
  {
    "name": "negative values",
    "args": [
      [
        -1,
        0,
        3,
        -5,
        -3
      ]
    ],
    "expected": -5
  },
  {
    "name": "description example",
    "args": [
      [
        3,
        4,
        5,
        6,
        1,
        2
      ]
    ],
    "expected": 1
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(findMin(...(args as any))).toEqual(expected);
});
