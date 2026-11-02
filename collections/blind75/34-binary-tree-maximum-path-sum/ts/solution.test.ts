import {expect, test} from 'vitest';
import {maxPathSum} from './solution';
import {treeFrom, treeToArray} from '../../support';

const cases = [
  {
    "args": [
      [
        -3,
        -2,
        -1
      ]
    ],
    "expected": -1,
    "name": "baseline: [[-3,-2,-1]]"
  },
  {
    "name": "all negative tree chooses best single node",
    "args": [
      [
        -10,
        -20,
        -3
      ]
    ],
    "expected": -3
  },
  {
    "name": "best path can pass through root",
    "args": [
      [
        -10,
        9,
        20,
        null,
        null,
        15,
        7
      ]
    ],
    "expected": 42
  },
  {
    "name": "single negative node",
    "args": [
      [
        -5
      ]
    ],
    "expected": -5
  },
  {
    "name": "path turns at a deep node and excludes the root",
    "args": [
      [
        -100,
        -100,
        null,
        10,
        null,
        5,
        6
      ]
    ],
    "expected": 21
  },
  {
    "name": "zeros",
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
    "name": "zero beats negative neighbours",
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
        1,
        2,
        3
      ]
    ],
    "expected": 6
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(maxPathSum(treeFrom(args[0]))).toEqual(expected);
});
