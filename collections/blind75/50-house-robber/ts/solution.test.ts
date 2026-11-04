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
    "name": "skip adjacent high values",
    "args": [
      [
        2,
        7,
        9,
        3,
        1
      ]
    ],
    "expected": 12
  },
  {
    "name": "empty house row yields zero",
    "args": [
      []
    ],
    "expected": 0
  },
  {
    "name": "two houses",
    "args": [
      [
        2,
        1
      ]
    ],
    "expected": 2
  },
  {
    "name": "all houses equal",
    "args": [
      [
        4,
        4,
        4,
        4,
        4
      ]
    ],
    "expected": 12
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        1,
        3,
        3
      ]
    ],
    "expected": 4
  },
  {
    "name": "2000 houses",
    "args": [
      new Array(2000).fill(1)
    ],
    "expected": 1000
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(rob(...(args as any))).toEqual(expected);
});
