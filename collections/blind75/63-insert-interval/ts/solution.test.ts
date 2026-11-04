import {expect, test} from 'vitest';
import {insert} from './solution';

const cases = [
  {
    "args": [
      [],
      [
        0,
        2
      ]
    ],
    "expected": [
      [
        0,
        2
      ]
    ],
    "name": "baseline: [[],[0,2]]"
  },
  {
    "name": "new interval joins touching neighbors",
    "args": [
      [
        [
          1,
          2
        ],
        [
          5,
          6
        ]
      ],
      [
        2,
        5
      ]
    ],
    "expected": [
      [
        1,
        6
      ]
    ]
  },
  {
    "name": "new interval fits in an interior gap",
    "args": [
      [
        [
          1,
          2
        ],
        [
          5,
          6
        ]
      ],
      [
        3,
        4
      ]
    ],
    "expected": [
      [
        1,
        2
      ],
      [
        3,
        4
      ],
      [
        5,
        6
      ]
    ]
  },
  {
    "name": "insert before all",
    "args": [
      [
        [
          3,
          5
        ],
        [
          7,
          9
        ]
      ],
      [
        1,
        2
      ]
    ],
    "expected": [
      [
        1,
        2
      ],
      [
        3,
        5
      ],
      [
        7,
        9
      ]
    ]
  },
  {
    "name": "insert after all",
    "args": [
      [
        [
          3,
          5
        ],
        [
          7,
          9
        ]
      ],
      [
        10,
        11
      ]
    ],
    "expected": [
      [
        3,
        5
      ],
      [
        7,
        9
      ],
      [
        10,
        11
      ]
    ]
  },
  {
    "name": "new interval spans all",
    "args": [
      [
        [
          3,
          5
        ],
        [
          7,
          9
        ]
      ],
      [
        0,
        10
      ]
    ],
    "expected": [
      [
        0,
        10
      ]
    ]
  },
  {
    "name": "merges several middle intervals",
    "args": [
      [
        [
          1,
          2
        ],
        [
          3,
          5
        ],
        [
          6,
          7
        ],
        [
          8,
          10
        ],
        [
          12,
          16
        ]
      ],
      [
        4,
        8
      ]
    ],
    "expected": [
      [
        1,
        2
      ],
      [
        3,
        10
      ],
      [
        12,
        16
      ]
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        [
          1,
          3
        ],
        [
          4,
          6
        ]
      ],
      [
        2,
        5
      ]
    ],
    "expected": [
      [
        1,
        6
      ]
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(insert(...(args as any))).toEqual(expected);
});
