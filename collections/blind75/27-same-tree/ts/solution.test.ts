import {expect, test} from 'vitest';
import {isSameTree} from './solution';
import {treeFrom, treeToArray} from '../../support';

const cases = [
  {
    "args": [
      [],
      []
    ],
    "expected": true,
    "name": "baseline: [[],[]]"
  },
  {
    "name": "same values but different child positions",
    "args": [
      [
        1,
        2,
        null
      ],
      [
        1,
        null,
        2
      ]
    ],
    "expected": false
  },
  {
    "name": "empty and nonempty trees differ",
    "args": [
      [],
      [
        1
      ]
    ],
    "expected": false
  },
  {
    "name": "same shape with different values",
    "args": [
      [
        1,
        2,
        3
      ],
      [
        1,
        2,
        4
      ]
    ],
    "expected": false
  },
  {
    "name": "one tree is deeper",
    "args": [
      [
        1,
        2
      ],
      [
        1,
        2,
        null,
        3
      ]
    ],
    "expected": false
  },
  {
    "name": "single nodes with different values",
    "args": [
      [
        1
      ],
      [
        2
      ]
    ],
    "expected": false
  },
  {
    "name": "identical larger trees",
    "args": [
      [
        1,
        2,
        3,
        4,
        null,
        5
      ],
      [
        1,
        2,
        3,
        4,
        null,
        5
      ]
    ],
    "expected": true
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(isSameTree(treeFrom(args[0]), treeFrom(args[1]))).toBe(expected);
});
