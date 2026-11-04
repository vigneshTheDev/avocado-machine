import {expect, test} from 'vitest';
import {maxDepth} from './solution';
import {treeFrom, treeToArray} from '../../support';

const cases = [
  {
    "args": [
      []
    ],
    "expected": 0,
    "name": "baseline: [[]]"
  },
  {
    "name": "one-sided chain has full depth",
    "args": [
      [
        1,
        null,
        2,
        null,
        3
      ]
    ],
    "expected": 3
  },
  {
    "name": "wide tree depth is not node count",
    "args": [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ]
    ],
    "expected": 3
  },
  {
    "name": "single node",
    "args": [
      [
        1
      ]
    ],
    "expected": 1
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        2,
        3,
        null,
        null,
        4
      ]
    ],
    "expected": 3
  },
  {
    "name": "depth-1000 right chain",
    "args": [
      [0, ...Array.from({length: 999}, (_, i) => [null, i + 1]).flat()]
    ],
    "expected": 1000
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(maxDepth(treeFrom(args[0]))).toEqual(expected);
});
