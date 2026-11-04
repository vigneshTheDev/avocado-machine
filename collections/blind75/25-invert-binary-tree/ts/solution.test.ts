import {expect, test} from 'vitest';
import {invertTree} from './solution';
import {treeFrom, treeToArray} from '../../support';

const cases = [
  {
    "args": [
      []
    ],
    "expected": [],
    "name": "baseline: [[]]"
  },
  {
    "name": "missing children switch sides",
    "args": [
      [
        1,
        2,
        3,
        null,
        4,
        5,
        null
      ]
    ],
    "expected": [
      1,
      3,
      2,
      null,
      5,
      4
    ]
  },
  {
    "name": "one-sided chain changes direction",
    "args": [
      [
        1,
        2,
        null,
        3
      ]
    ],
    "expected": [
      1,
      null,
      2,
      null,
      3
    ]
  },
  {
    "name": "single node",
    "args": [
      [
        1
      ]
    ],
    "expected": [
      1
    ]
  },
  {
    "name": "description example",
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
    "expected": [
      1,
      3,
      2,
      7,
      6,
      5,
      4
    ]
  },
  {
    "name": "full tree of depth 4",
    "args": [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15
      ]
    ],
    "expected": [
      1,
      3,
      2,
      7,
      6,
      5,
      4,
      15,
      14,
      13,
      12,
      11,
      10,
      9,
      8
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(treeToArray(invertTree(treeFrom(args[0])))).toEqual(expected);
});
