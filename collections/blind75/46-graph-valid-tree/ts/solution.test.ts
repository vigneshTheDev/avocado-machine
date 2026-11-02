import {expect, test} from 'vitest';
import {validTree} from './solution';

const cases = [
  {
    "args": [
      1,
      []
    ],
    "expected": true,
    "name": "baseline: [1,[]]"
  },
  {
    "name": "cycle with isolated vertex is not a tree",
    "args": [
      4,
      [
        [
          0,
          1
        ],
        [
          1,
          2
        ],
        [
          2,
          0
        ]
      ]
    ],
    "expected": false
  },
  {
    "name": "connected acyclic chain is a tree",
    "args": [
      4,
      [
        [
          0,
          1
        ],
        [
          1,
          2
        ],
        [
          2,
          3
        ]
      ]
    ],
    "expected": true
  },
  {
    "name": "two nodes without an edge",
    "args": [
      2,
      []
    ],
    "expected": false
  },
  {
    "name": "two nodes with an edge",
    "args": [
      2,
      [
        [
          0,
          1
        ]
      ]
    ],
    "expected": true
  },
  {
    "name": "n-1 edges with a cycle and a separate component",
    "args": [
      5,
      [
        [
          0,
          1
        ],
        [
          1,
          2
        ],
        [
          2,
          0
        ],
        [
          3,
          4
        ]
      ]
    ],
    "expected": false
  },
  {
    "name": "description example",
    "args": [
      5,
      [
        [
          0,
          1
        ],
        [
          0,
          2
        ],
        [
          0,
          3
        ],
        [
          1,
          4
        ]
      ]
    ],
    "expected": true
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(validTree(...(args as any))).toEqual(expected);
});
