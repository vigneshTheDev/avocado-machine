import {expect, test} from 'vitest';
import {productExceptSelf} from './solution';

const cases = [
  {
    "args": [
      [
        0,
        -1
      ]
    ],
    "expected": [
      -1,
      0
    ],
    "name": "baseline: [[0,-1]]"
  },
  {
    "name": "two zeroes force every product to zero",
    "args": [
      [
        1,
        0,
        2,
        0
      ]
    ],
    "expected": [
      0,
      0,
      0,
      0
    ]
  },
  {
    "name": "negative sign and no zero",
    "args": [
      [
        -1,
        2,
        -3,
        4
      ]
    ],
    "expected": [
      -24,
      12,
      -8,
      6
    ]
  },
  {
    "name": "single zero leaves one nonzero product",
    "args": [
      [
        1,
        2,
        0,
        4
      ]
    ],
    "expected": [
      0,
      0,
      8,
      0
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        2,
        4,
        6
      ]
    ],
    "expected": [
      48,
      24,
      12,
      8
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(productExceptSelf(...(args as any))).toEqual(expected);
});
