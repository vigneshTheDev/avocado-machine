import {expect, test} from 'vitest';
import {countBits} from './solution';

const cases = [
  {
    "args": [
      0
    ],
    "expected": [
      0
    ],
    "name": "baseline: [0]"
  },
  {
    "name": "counts bits at powers of two and neighbors",
    "args": [
      5
    ],
    "expected": [
      0,
      1,
      1,
      2,
      1,
      2
    ]
  },
  {
    "name": "n = 1",
    "args": [
      1
    ],
    "expected": [
      0,
      1
    ]
  },
  {
    "name": "description example",
    "args": [
      4
    ],
    "expected": [
      0,
      1,
      1,
      2,
      1
    ]
  },
  {
    "name": "n = 16 ends on a power of two",
    "args": [
      16
    ],
    "expected": [
      0,
      1,
      1,
      2,
      1,
      2,
      2,
      3,
      1,
      2,
      2,
      3,
      2,
      3,
      3,
      4,
      1
    ]
  },
  {
    "name": "n = 31 ends on all five low bits set",
    "args": [
      31
    ],
    "expected": [
      0,
      1,
      1,
      2,
      1,
      2,
      2,
      3,
      1,
      2,
      2,
      3,
      2,
      3,
      3,
      4,
      1,
      2,
      2,
      3,
      2,
      3,
      3,
      4,
      2,
      3,
      3,
      4,
      3,
      4,
      4,
      5
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(countBits(...(args as any))).toEqual(expected);
});
