import {expect, test} from 'vitest';
import {merge} from './solution';
const normalize = (value: number[][]) => [...value].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
const cases = [
  {
    "args": [
      [
        [
          0,
          2
        ]
      ]
    ],
    "expected": [
      [
        0,
        2
      ]
    ],
    "name": "baseline: [[[0,2]]]"
  },
  {
    "name": "touching intervals merge",
    "args": [
      [
        [
          1,
          3
        ],
        [
          3,
          5
        ]
      ]
    ],
    "expected": [
      [
        1,
        5
      ]
    ]
  },
  {
    "name": "nested interval does not shorten outer interval",
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
          4,
          8
        ]
      ]
    ],
    "expected": [
      [
        1,
        10
      ]
    ]
  },
  {
    "name": "unsorted input",
    "args": [
      [
        [
          8,
          10
        ],
        [
          1,
          3
        ],
        [
          2,
          6
        ],
        [
          15,
          18
        ]
      ]
    ],
    "expected": [
      [
        1,
        6
      ],
      [
        8,
        10
      ],
      [
        15,
        18
      ]
    ]
  },
  {
    "name": "everything merges into one",
    "args": [
      [
        [
          4,
          5
        ],
        [
          1,
          4
        ],
        [
          2,
          3
        ],
        [
          5,
          7
        ]
      ]
    ],
    "expected": [
      [
        1,
        7
      ]
    ]
  },
  {
    "name": "duplicate intervals",
    "args": [
      [
        [
          1,
          3
        ],
        [
          1,
          3
        ],
        [
          1,
          3
        ]
      ]
    ],
    "expected": [
      [
        1,
        3
      ]
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
          2,
          3
        ]
      ]
    ],
    "expected": [
      [
        1,
        3
      ]
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(normalize(merge(...(args as any)) as any)).toEqual(normalize(expected as any));
});
