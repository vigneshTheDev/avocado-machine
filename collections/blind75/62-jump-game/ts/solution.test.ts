import {expect, test} from 'vitest';
import {canJump} from './solution';

const cases = [
  {
    "args": [
      [
        0
      ]
    ],
    "expected": true,
    "name": "baseline: [[0]]"
  },
  {
    "name": "zero before the end can block progress",
    "args": [
      [
        3,
        2,
        1,
        0,
        4
      ]
    ],
    "expected": false
  },
  {
    "name": "zero at final index is reachable",
    "args": [
      [
        2,
        0,
        0
      ]
    ],
    "expected": true
  },
  {
    "name": "large jump skips zeros",
    "args": [
      [
        5,
        0,
        0,
        0,
        0,
        1
      ]
    ],
    "expected": true
  },
  {
    "name": "jump lands exactly on a zero before the end",
    "args": [
      [
        1,
        0,
        1
      ]
    ],
    "expected": false
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        2,
        0,
        1,
        0
      ]
    ],
    "expected": true
  },
  {
    "name": "long array of ones",
    "args": [
      new Array(10000).fill(1)
    ],
    "expected": true
  },
  {
    "name": "long array blocked just before the end",
    "args": [
      [...new Array(9998).fill(1), 0, 0]
    ],
    "expected": false
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(canJump(...(args as any))).toEqual(expected);
});
