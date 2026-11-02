import {expect, test} from 'vitest';
import {maxArea} from './solution';

const cases = [
  {
    "args": [
      [
        0,
        7
      ]
    ],
    "expected": 0,
    "name": "baseline: [[0,7]]"
  },
  {
    "name": "narrow tall pair beats distant short pair",
    "args": [
      [
        1,
        8,
        8,
        1
      ]
    ],
    "expected": 8
  },
  {
    "name": "all heights zero",
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
    "name": "LeetCode example",
    "args": [
      [
        1,
        8,
        6,
        2,
        5,
        4,
        8,
        3,
        7
      ]
    ],
    "expected": 49
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        7,
        2,
        5,
        4,
        7,
        3,
        6
      ]
    ],
    "expected": 36
  },
  {
    "name": "best pair is not at the extremes",
    "args": [
      [
        1,
        2,
        10,
        10,
        2,
        1
      ]
    ],
    "expected": 10
  },
  {
    "name": "strictly increasing heights",
    "args": [
      [
        1,
        2,
        3,
        4,
        5
      ]
    ],
    "expected": 6
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(maxArea(...(args as any))).toEqual(expected);
});

test('100k equal heights use the widest pair', () => {
    expect(maxArea(new Array(100000).fill(1))).toBe(99999);
});
