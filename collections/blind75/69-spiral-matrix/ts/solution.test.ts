import {expect, test} from 'vitest';
import {spiralOrder} from './solution';

const cases = [
  {
    "args": [
      [
        [
          0
        ]
      ]
    ],
    "expected": [
      0
    ],
    "name": "baseline: [[[0]]]"
  },
  {
    "name": "single row never revisits a cell",
    "args": [
      [
        [
          1,
          2,
          3
        ]
      ]
    ],
    "expected": [
      1,
      2,
      3
    ]
  },
  {
    "name": "rectangular matrix changes boundaries",
    "args": [
      [
        [
          1,
          2,
          3
        ],
        [
          4,
          5,
          6
        ]
      ]
    ],
    "expected": [
      1,
      2,
      3,
      6,
      5,
      4
    ]
  },
  {
    "name": "four by four",
    "args": [
      [
        [
          1,
          2,
          3,
          4
        ],
        [
          5,
          6,
          7,
          8
        ],
        [
          9,
          10,
          11,
          12
        ],
        [
          13,
          14,
          15,
          16
        ]
      ]
    ],
    "expected": [
      1,
      2,
      3,
      4,
      8,
      12,
      16,
      15,
      14,
      13,
      9,
      5,
      6,
      7,
      11,
      10
    ]
  },
  {
    "name": "three by four",
    "args": [
      [
        [
          1,
          2,
          3,
          4
        ],
        [
          5,
          6,
          7,
          8
        ],
        [
          9,
          10,
          11,
          12
        ]
      ]
    ],
    "expected": [
      1,
      2,
      3,
      4,
      8,
      12,
      11,
      10,
      9,
      5,
      6,
      7
    ]
  },
  {
    "name": "four by three",
    "args": [
      [
        [
          1,
          2,
          3
        ],
        [
          4,
          5,
          6
        ],
        [
          7,
          8,
          9
        ],
        [
          10,
          11,
          12
        ]
      ]
    ],
    "expected": [
      1,
      2,
      3,
      6,
      9,
      12,
      11,
      10,
      7,
      4,
      5,
      8
    ]
  },
  {
    "name": "single column",
    "args": [
      [
        [
          1
        ],
        [
          2
        ],
        [
          3
        ]
      ]
    ],
    "expected": [
      1,
      2,
      3
    ]
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
          3,
          4
        ]
      ]
    ],
    "expected": [
      1,
      2,
      4,
      3
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(spiralOrder(...(args as any))).toEqual(expected);
});
