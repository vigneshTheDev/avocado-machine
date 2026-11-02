import {expect, test} from 'vitest';
import {maxSubArray} from './solution';

const cases = [
  {
    "args": [
      [
        -8
      ]
    ],
    "expected": -8,
    "name": "baseline: [[-8]]"
  },
  {
    "name": "all negative values choose the least negative",
    "args": [
      [
        -2,
        -3,
        -1,
        -5
      ]
    ],
    "expected": -1
  },
  {
    "name": "internal best segment beats entire array",
    "args": [
      [
        4,
        -1,
        2,
        1,
        -9,
        3
      ]
    ],
    "expected": 6
  },
  {
    "name": "single positive",
    "args": [
      [
        5
      ]
    ],
    "expected": 5
  },
  {
    "name": "all zeros",
    "args": [
      [
        0,
        0,
        0
      ]
    ],
    "expected": 0
  },
  {
    "name": "zero beats negatives",
    "args": [
      [
        -1,
        0,
        -2
      ]
    ],
    "expected": 0
  },
  {
    "name": "description example",
    "args": [
      [
        2,
        -3,
        4,
        -2,
        2,
        1,
        -1,
        4
      ]
    ],
    "expected": 8
  },
  {
    "name": "100k elements",
    "args": [
      Array.from({length: 100000}, (_, i) => (i % 2 ? -1 : 2))
    ],
    "expected": 50001
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(maxSubArray(...(args as any))).toEqual(expected);
});
