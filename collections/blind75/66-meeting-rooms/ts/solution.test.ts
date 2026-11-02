import {expect, test} from 'vitest';
import {canAttendMeetings} from './solution';

const cases = [
  {
    "args": [
      []
    ],
    "expected": true,
    "name": "baseline: [[]]"
  },
  {
    "name": "end equals next start permits both meetings",
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
    "expected": true
  },
  {
    "name": "nested intervals conflict",
    "args": [
      [
        [
          1,
          10
        ],
        [
          2,
          3
        ]
      ]
    ],
    "expected": false
  },
  {
    "name": "single interval",
    "args": [
      [
        [
          1,
          5
        ]
      ]
    ],
    "expected": true
  },
  {
    "name": "unsorted overlapping input",
    "args": [
      [
        [
          5,
          10
        ],
        [
          0,
          30
        ]
      ]
    ],
    "expected": false
  },
  {
    "name": "unsorted non-overlapping input",
    "args": [
      [
        [
          7,
          10
        ],
        [
          2,
          4
        ]
      ]
    ],
    "expected": true
  },
  {
    "name": "description example",
    "args": [
      [
        [
          0,
          30
        ],
        [
          5,
          10
        ]
      ]
    ],
    "expected": false
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(canAttendMeetings(...(args as any))).toEqual(expected);
});
