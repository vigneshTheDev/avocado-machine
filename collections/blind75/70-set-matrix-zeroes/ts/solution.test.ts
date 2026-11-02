import {expect, test} from 'vitest';
import {setZeroes} from './solution';

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
      [
        0
      ]
    ],
    "name": "baseline: [[[0]]]"
  },
  {
    "name": "first row zero clears its column and row",
    "args": [
      [
        [
          1,
          0,
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
        ]
      ]
    ],
    "expected": [
      [
        0,
        0,
        0
      ],
      [
        4,
        0,
        6
      ],
      [
        7,
        0,
        9
      ]
    ]
  },
  {
    "name": "independent zeroes propagate without cascading",
    "args": [
      [
        [
          1,
          2,
          3
        ],
        [
          4,
          0,
          6
        ],
        [
          0,
          8,
          9
        ]
      ]
    ],
    "expected": [
      [
        0,
        0,
        3
      ],
      [
        0,
        0,
        0
      ],
      [
        0,
        0,
        0
      ]
    ]
  },
  {
    "name": "zeros in the first row and the first column",
    "args": [
      [
        [
          0,
          1,
          2,
          0
        ],
        [
          3,
          4,
          5,
          2
        ],
        [
          1,
          3,
          1,
          5
        ]
      ]
    ],
    "expected": [
      [
        0,
        0,
        0,
        0
      ],
      [
        0,
        4,
        5,
        0
      ],
      [
        0,
        3,
        1,
        0
      ]
    ]
  },
  {
    "name": "zero only in the first column",
    "args": [
      [
        [
          1,
          2
        ],
        [
          0,
          3
        ],
        [
          4,
          5
        ]
      ]
    ],
    "expected": [
      [
        0,
        2
      ],
      [
        0,
        0
      ],
      [
        0,
        5
      ]
    ]
  },
  {
    "name": "zero in the top-left corner",
    "args": [
      [
        [
          0,
          1
        ],
        [
          1,
          1
        ]
      ]
    ],
    "expected": [
      [
        0,
        0
      ],
      [
        0,
        1
      ]
    ]
  },
  {
    "name": "no zeros leaves the matrix unchanged",
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
          0,
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
          0
        ]
      ]
    ],
    "expected": [
      [
        1,
        0,
        3,
        0
      ],
      [
        0,
        0,
        0,
        0
      ],
      [
        9,
        0,
        11,
        0
      ],
      [
        0,
        0,
        0,
        0
      ]
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        [
          1,
          2,
          3
        ],
        [
          4,
          0,
          5
        ],
        [
          6,
          7,
          8
        ]
      ]
    ],
    "expected": [
      [
        1,
        0,
        3
      ],
      [
        0,
        0,
        0
      ],
      [
        6,
        0,
        8
      ]
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    setZeroes(...(args as [any]));
    expect(args[0]).toEqual(expected);
});
