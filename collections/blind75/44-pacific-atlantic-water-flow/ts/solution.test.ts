import {expect, test} from 'vitest';
import {pacificAtlantic} from './solution';
const normalize = (value: number[][]) => [...value].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
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
        0,
        0
      ]
    ],
    "name": "baseline: [[[0]]]"
  },
  {
    "name": "flat grid flows to both oceans",
    "args": [
      [
        [
          1,
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
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ]
    ]
  },
  {
    "name": "one row reaches both oceans",
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
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        0,
        2
      ]
    ]
  },
  {
    "name": "LeetCode 5x5 example",
    "args": [
      [
        [
          1,
          2,
          2,
          3,
          5
        ],
        [
          3,
          2,
          3,
          4,
          4
        ],
        [
          2,
          4,
          5,
          3,
          1
        ],
        [
          6,
          7,
          1,
          4,
          5
        ],
        [
          5,
          1,
          1,
          2,
          4
        ]
      ]
    ],
    "expected": [
      [
        0,
        4
      ],
      [
        1,
        3
      ],
      [
        1,
        4
      ],
      [
        2,
        2
      ],
      [
        3,
        0
      ],
      [
        3,
        1
      ],
      [
        4,
        0
      ]
    ]
  },
  {
    "name": "strictly increasing spiral",
    "args": [
      [
        [
          1,
          2,
          3
        ],
        [
          8,
          9,
          4
        ],
        [
          7,
          6,
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
        1,
        0
      ],
      [
        1,
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
        2,
        1
      ],
      [
        2,
        2
      ]
    ]
  },
  {
    "name": "single column reaches both oceans",
    "args": [
      [
        [
          3
        ],
        [
          1
        ],
        [
          2
        ]
      ]
    ],
    "expected": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ]
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        [
          1
        ],
        [
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
        1,
        0
      ]
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(normalize(pacificAtlantic(...(args as any)) as any)).toEqual(normalize(expected as any));
});
