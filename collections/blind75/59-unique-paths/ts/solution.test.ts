import {expect, test} from 'vitest';
import {uniquePaths} from './solution';

const cases = [
  {
    "args": [
      1,
      1
    ],
    "expected": 1,
    "name": "baseline: [1,1]"
  },
  {
    "name": "single row has exactly one route",
    "args": [
      1,
      7
    ],
    "expected": 1
  },
  {
    "name": "three by three grid has six routes",
    "args": [
      3,
      3
    ],
    "expected": 6
  },
  {
    "name": "one row, many columns",
    "args": [
      1,
      100
    ],
    "expected": 1
  },
  {
    "name": "many rows, one column",
    "args": [
      100,
      1
    ],
    "expected": 1
  },
  {
    "name": "two by two",
    "args": [
      2,
      2
    ],
    "expected": 2
  },
  {
    "name": "three by seven",
    "args": [
      3,
      7
    ],
    "expected": 28
  },
  {
    "name": "23 by 12",
    "args": [
      23,
      12
    ],
    "expected": 193536720
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(uniquePaths(...(args as any))).toEqual(expected);
});
