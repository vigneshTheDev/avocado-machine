import {expect, test} from 'vitest';
import {maxProfit} from './solution';

const cases = [
  {
    "args": [
      [
        10,
        8,
        7,
        5,
        2
      ]
    ],
    "expected": 0,
    "name": "baseline: [[10,8,7,5,2]]"
  },
  {
    "name": "minimum before maximum yields profit",
    "args": [
      [
        7,
        1,
        5,
        3,
        6,
        4
      ]
    ],
    "expected": 5
  },
  {
    "name": "cannot sell before buying",
    "args": [
      [
        9,
        7,
        4,
        1
      ]
    ],
    "expected": 0
  },
  {
    "name": "no prices",
    "args": [
      []
    ],
    "expected": 0
  },
  {
    "name": "one price",
    "args": [
      [
        5
      ]
    ],
    "expected": 0
  },
  {
    "name": "a later minimum does not beat an earlier trade",
    "args": [
      [
        3,
        8,
        1,
        2
      ]
    ],
    "expected": 5
  },
  {
    "name": "description example",
    "args": [
      [
        10,
        1,
        5,
        6,
        7,
        1
      ]
    ],
    "expected": 6
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(maxProfit(...(args as any))).toEqual(expected);
});
