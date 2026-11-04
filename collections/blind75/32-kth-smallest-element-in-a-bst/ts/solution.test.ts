import {expect, test} from 'vitest';
import {kthSmallest} from './solution';
import {treeFrom, treeToArray} from '../../support';

const cases = [
  {
    "args": [
      [
        5,
        3,
        8,
        1,
        4,
        7,
        9
      ],
      1
    ],
    "expected": 1,
    "name": "baseline: [[5,3,8,1,4,7,9],1]"
  },
  {
    "name": "k counts nodes in sorted order",
    "args": [
      [
        5,
        3,
        6,
        2,
        4,
        null,
        null,
        1
      ],
      3
    ],
    "expected": 3
  },
  {
    "name": "largest k returns maximum",
    "args": [
      [
        2,
        1,
        3
      ],
      3
    ],
    "expected": 3
  },
  {
    "name": "left-skewed BST",
    "args": [
      [
        5,
        4,
        null,
        3,
        null,
        2,
        null,
        1
      ],
      2
    ],
    "expected": 2
  },
  {
    "name": "right-skewed BST",
    "args": [
      [
        1,
        null,
        2,
        null,
        3,
        null,
        4
      ],
      3
    ],
    "expected": 3
  },
  {
    "name": "k in the middle",
    "args": [
      [
        5,
        3,
        8,
        1,
        4,
        7,
        9
      ],
      4
    ],
    "expected": 5
  },
  {
    "name": "description example",
    "args": [
      [
        2,
        1,
        3
      ],
      1
    ],
    "expected": 1
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(kthSmallest(treeFrom(args[0]), args[1])).toBe(expected);
});
