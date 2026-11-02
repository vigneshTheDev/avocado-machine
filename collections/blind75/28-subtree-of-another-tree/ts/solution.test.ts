import {expect, test} from 'vitest';
import {isSubtree} from './solution';
import {treeFrom, treeToArray} from '../../support';

const cases = [
  {
    "args": [
      [
        1,
        2,
        3
      ],
      [
        1,
        2,
        3
      ]
    ],
    "expected": true,
    "name": "baseline: [[1,2,3],[1,2,3]]"
  },
  {
    "name": "candidate prefix with extra descendants is not identical",
    "args": [
      [
        1,
        2,
        3,
        4
      ],
      [
        2
      ]
    ],
    "expected": false
  },
  {
    "name": "matching subtree below root",
    "args": [
      [
        3,
        4,
        5,
        1,
        2
      ],
      [
        4,
        1,
        2
      ]
    ],
    "expected": true
  },
  {
    "name": "root value matches but the subtree is lower",
    "args": [
      [
        1,
        1
      ],
      [
        1
      ]
    ],
    "expected": true
  },
  {
    "name": "LeetCode example 2: candidate has an extra descendant",
    "args": [
      [
        3,
        4,
        5,
        1,
        2,
        null,
        null,
        null,
        null,
        0
      ],
      [
        4,
        1,
        2
      ]
    ],
    "expected": false
  },
  {
    "name": "multi-digit value does not contain a shorter one",
    "args": [
      [
        12
      ],
      [
        2
      ]
    ],
    "expected": false
  },
  {
    "name": "shorter value does not contain a multi-digit one",
    "args": [
      [
        2
      ],
      [
        12
      ]
    ],
    "expected": false
  },
  {
    "name": "child side matters",
    "args": [
      [
        1,
        2,
        null,
        3
      ],
      [
        2,
        null,
        3
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
        3,
        4,
        5
      ],
      [
        2,
        4,
        5
      ]
    ],
    "expected": true
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(isSubtree(treeFrom(args[0]), treeFrom(args[1]))).toBe(expected);
});
