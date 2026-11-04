import {expect, test} from 'vitest';
import {coinChange} from './solution';

const cases = [
  {
    "args": [
      [
        1
      ],
      0
    ],
    "expected": 0,
    "name": "baseline: [[1],0]"
  },
  {
    "name": "greedy largest coin is suboptimal",
    "args": [
      [
        1,
        3,
        4
      ],
      6
    ],
    "expected": 2
  },
  {
    "name": "unreachable amount",
    "args": [
      [
        2
      ],
      3
    ],
    "expected": -1
  },
  {
    "name": "every coin larger than the amount",
    "args": [
      [
        5,
        10
      ],
      3
    ],
    "expected": -1
  },
  {
    "name": "larger coin unusable, smaller coin works",
    "args": [
      [
        7,
        2
      ],
      4
    ],
    "expected": 2
  },
  {
    "name": "LeetCode large example",
    "args": [
      [
        186,
        419,
        83,
        408
      ],
      6249
    ],
    "expected": 20
  },
  {
    "name": "amount 10,000",
    "args": [
      [
        1,
        2,
        5
      ],
      10000
    ],
    "expected": 2000
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        5,
        10
      ],
      12
    ],
    "expected": 3
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(coinChange(...(args as any))).toEqual(expected);
});
