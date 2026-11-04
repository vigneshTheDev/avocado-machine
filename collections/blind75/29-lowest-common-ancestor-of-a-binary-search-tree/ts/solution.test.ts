import {expect, test} from 'vitest';
import {lowestCommonAncestor} from './solution';
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
      1,
      8
    ],
    "expected": 5,
    "name": "baseline: [[5,3,8,1,4,7,9],1,8]"
  },
  {
    "name": "ancestor can equal one target",
    "args": [
      [
        6,
        2,
        8,
        0,
        4,
        7,
        9
      ],
      2,
      4
    ],
    "expected": 2
  },
  {
    "name": "targets on opposite sides return root",
    "args": [
      [
        6,
        2,
        8,
        0,
        4,
        7,
        9
      ],
      2,
      8
    ],
    "expected": 6
  },
  {
    "name": "both targets in the left subtree",
    "args": [
      [
        6,
        2,
        8,
        0,
        4,
        7,
        9,
        null,
        null,
        3,
        5
      ],
      3,
      5
    ],
    "expected": 4
  },
  {
    "name": "targets on both sides of a left-subtree node",
    "args": [
      [
        6,
        2,
        8,
        0,
        4,
        7,
        9,
        null,
        null,
        3,
        5
      ],
      0,
      5
    ],
    "expected": 2
  },
  {
    "name": "both targets in the right subtree",
    "args": [
      [
        6,
        2,
        8,
        0,
        4,
        7,
        9,
        null,
        null,
        3,
        5
      ],
      7,
      9
    ],
    "expected": 8
  },
  {
    "name": "one target is the root",
    "args": [
      [
        6,
        2,
        8,
        0,
        4,
        7,
        9,
        null,
        null,
        3,
        5
      ],
      6,
      4
    ],
    "expected": 6
  },
  {
    "name": "description example",
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
      3,
      8
    ],
    "expected": 5
  }
];

test.each(cases)('$name', ({args, expected}) => {
    const root = treeFrom(args[0]);
    const find = (node: any, value: number): any => !node ? null : node.val === value ? node : find(node.left, value) ?? find(node.right, value);
    expect(lowestCommonAncestor(root, find(root, args[1]), find(root, args[2]))?.val).toBe(expected);
});
