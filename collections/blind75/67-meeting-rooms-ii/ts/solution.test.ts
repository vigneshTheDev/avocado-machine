import {expect, test} from 'vitest';
import {minMeetingRooms} from './solution';

const cases = [
  {
    "args": [
      []
    ],
    "expected": 0,
    "name": "baseline: [[]]"
  },
  {
    "name": "end equals start reuses same room",
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
    "expected": 1
  },
  {
    "name": "peak concurrency requires three rooms",
    "args": [
      [
        [
          0,
          10
        ],
        [
          1,
          9
        ],
        [
          2,
          8
        ]
      ]
    ],
    "expected": 3
  },
  {
    "name": "identical intervals",
    "args": [
      [
        [
          1,
          5
        ],
        [
          1,
          5
        ],
        [
          1,
          5
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
          15,
          20
        ],
        [
          0,
          40
        ],
        [
          5,
          10
        ]
      ]
    ],
    "expected": 2
  },
  {
    "name": "single meeting",
    "args": [
      [
        [
          1,
          2
        ]
      ]
    ],
    "expected": 1
  },
  {
    "name": "staggered overlaps",
    "args": [
      [
        [
          1,
          10
        ],
        [
          2,
          7
        ],
        [
          3,
          19
        ],
        [
          8,
          12
        ],
        [
          10,
          20
        ],
        [
          11,
          30
        ]
      ]
    ],
    "expected": 4
  },
  {
    "name": "description example",
    "args": [
      [
        [
          0,
          40
        ],
        [
          5,
          10
        ],
        [
          15,
          20
        ]
      ]
    ],
    "expected": 2
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(minMeetingRooms(...(args as any))).toEqual(expected);
});
