import {expect, test} from 'vitest';
import {isValidBST} from './solution';
import {treeFrom, treeToArray} from '../../support';

const cases = [
  {
    "args": [
      [
        5,
        1,
        7,
        null,
        null,
        3,
        8
      ]
    ],
    "expected": false,
    "name": "baseline: [[5,1,7,null,null,3,8]]"
  },
  {
    "name": "deep descendant violates ancestor bound",
    "args": [
      [
        5,
        4,
        6,
        null,
        null,
        3,
        7
      ]
    ],
    "expected": false
  },
  {
    "name": "equal value violates strict ordering",
    "args": [
      [
        2,
        1,
        2
      ]
    ],
    "expected": false
  },
  {
    "name": "empty tree is valid",
    "args": [
      []
    ],
    "expected": true
  },
  {
    "name": "single node is valid",
    "args": [
      [
        1
      ]
    ],
    "expected": true
  },
  {
    "name": "simple valid BST",
    "args": [
      [
        2,
        1,
        3
      ]
    ],
    "expected": true
  },
  {
    "name": "larger valid BST",
    "args": [
      [
        8,
        4,
        12,
        2,
        6,
        10,
        14,
        1,
        3,
        5,
        7,
        9,
        11,
        13,
        15
      ]
    ],
    "expected": true
  },
  {
    "name": "grandchild violates root bound on the left",
    "args": [
      [
        10,
        5,
        15,
        null,
        11
      ]
    ],
    "expected": false
  },
  {
    "name": "equal value in left subtree",
    "args": [
      [
        2,
        2
      ]
    ],
    "expected": false
  },
  {
    "name": "extreme values",
    "args": [
      [
        2147483647
      ]
    ],
    "expected": true
  },
  {
    "name": "negative values valid",
    "args": [
      [
        -1,
        -2,
        0
      ]
    ],
    "expected": true
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(isValidBST(treeFrom(args[0]))).toEqual(expected);
});
