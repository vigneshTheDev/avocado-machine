import {expect, test} from 'vitest';
import {canFinish} from './solution';

const cases = [
  {
    "args": [
      2,
      [
        [
          1,
          0
        ],
        [
          0,
          1
        ]
      ]
    ],
    "expected": false,
    "name": "baseline: [2,[[1,0],[0,1]]]"
  },
  {
    "name": "disconnected prerequisite chains are valid",
    "args": [
      4,
      [
        [
          1,
          0
        ],
        [
          3,
          2
        ]
      ]
    ],
    "expected": true
  },
  {
    "name": "diamond with shared prerequisites",
    "args": [
      4,
      [
        [
          1,
          0
        ],
        [
          2,
          0
        ],
        [
          3,
          1
        ],
        [
          3,
          2
        ]
      ]
    ],
    "expected": true
  },
  {
    "name": "self-loop blocks schedule",
    "args": [
      1,
      [
        [
          0,
          0
        ]
      ]
    ],
    "expected": false
  },
  {
    "name": "three-cycle inside a larger graph",
    "args": [
      5,
      [
        [
          1,
          0
        ],
        [
          2,
          1
        ],
        [
          3,
          2
        ],
        [
          1,
          3
        ],
        [
          4,
          0
        ]
      ]
    ],
    "expected": false
  },
  {
    "name": "no prerequisites",
    "args": [
      3,
      []
    ],
    "expected": true
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(canFinish(...(args as any))).toEqual(expected);
});

test('long prerequisite chain', () => {
    const prerequisites = Array.from({length: 4999}, (_, i) => [i + 1, i]);
    expect(canFinish(5000, prerequisites)).toBe(true);
    expect(canFinish(5000, [...prerequisites, [0, 4999]])).toBe(false);
});
