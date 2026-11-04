import {expect, test} from 'vitest';
import {eraseOverlapIntervals} from './solution';

const cases = [
  {
    "args": [
      [
        [
          0,
          1
        ]
      ]
    ],
    "expected": 0,
    "name": "baseline: [[[0,1]]]"
  },
  {
    "name": "touching intervals do not overlap",
    "args": [
      [
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
    "expected": 0
  },
  {
    "name": "choose short intervals over one long interval",
    "args": [
      [
        [
          1,
          10
        ],
        [
          2,
          3
        ],
        [
          3,
          4
        ]
      ]
    ],
    "expected": 1
  },
  {
    "name": "duplicate intervals",
    "args": [
      [
        [
          1,
          2
        ],
        [
          1,
          2
        ],
        [
          1,
          2
        ]
      ]
    ],
    "expected": 2
  },
  {
    "name": "nested chain",
    "args": [
      [
        [
          1,
          10
        ],
        [
          2,
          9
        ],
        [
          3,
          8
        ],
        [
          4,
          7
        ]
      ]
    ],
    "expected": 3
  },
  {
    "name": "unsorted input",
    "args": [
      [
        [
          3,
          4
        ],
        [
          1,
          2
        ],
        [
          2,
          3
        ],
        [
          1,
          3
        ]
      ]
    ],
    "expected": 1
  },
  {
    "name": "description example",
    "args": [
      [
        [
          1,
          2
        ],
        [
          2,
          4
        ],
        [
          1,
          4
        ]
      ]
    ],
    "expected": 1
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(eraseOverlapIntervals(...(args as any))).toEqual(expected);
});
