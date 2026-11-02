import {expect, test} from 'vitest';
import {countComponents} from './solution';

const cases = [
  {
    "args": [
      1,
      []
    ],
    "expected": 1,
    "name": "baseline: [1,[]]"
  },
  {
    "name": "cycle contributes one component",
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
    "expected": 2
  },
  {
    "name": "no edges means one component per vertex",
    "args": [
      4,
      []
    ],
    "expected": 4
  },
  {
    "name": "duplicate edges",
    "args": [
      3,
      [
        [
          0,
          1
        ],
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
    "expected": 2
  },
  {
    "name": "self-loop",
    "args": [
      3,
      [
        [
          1,
          1
        ]
      ]
    ],
    "expected": 3
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
          1,
          2
        ],
        [
          3,
          4
        ]
      ]
    ],
    "expected": 2
  },
  {
    "name": "long chain is one component",
    "args": [
      3000,
      Array.from({length: 2999}, (_, i) => [i, i + 1])
    ],
    "expected": 1
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(countComponents(...(args as any))).toEqual(expected);
});
