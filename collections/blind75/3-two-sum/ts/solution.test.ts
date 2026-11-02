import {expect, test} from 'vitest';
import {twoSum} from './solution';

const cases = [
  {
    "args": [
      [
        5,
        5
      ],
      10
    ],
    "expected": [
      0,
      1
    ],
    "name": "baseline: [[5,5],10]"
  },
  {
    "name": "negative complement after a prior duplicate",
    "args": [
      [
        3,
        3,
        -2,
        8
      ],
      6
    ],
    "expected": [
      0,
      1
    ]
  },
  {
    "name": "uses two distinct indices for equal values",
    "args": [
      [
        4,
        7,
        4
      ],
      8
    ],
    "expected": [
      0,
      2
    ]
  },
  {
    "name": "answer uses the last index",
    "args": [
      [
        1,
        2,
        3,
        4,
        9
      ],
      13
    ],
    "expected": [
      3,
      4
    ]
  },
  {
    "name": "negative target",
    "args": [
      [
        -3,
        4,
        -5,
        1
      ],
      -8
    ],
    "expected": [
      0,
      2
    ]
  },
  {
    "name": "first value is not part of the answer",
    "args": [
      [
        3,
        2,
        4
      ],
      6
    ],
    "expected": [
      1,
      2
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        3,
        4,
        5,
        6
      ],
      7
    ],
    "expected": [
      0,
      1
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(twoSum(...(args as any))).toEqual(expected);
});
