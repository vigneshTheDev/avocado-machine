import {expect, test} from 'vitest';
import {exist} from './solution';

const cases = [
  {
    "args": [
      [
        [
          "A"
        ]
      ],
      "A"
    ],
    "expected": true,
    "name": "baseline: [[[\"A\"]],\"A\"]"
  },
  {
    "name": "cannot revisit one board cell",
    "args": [
      [
        [
          "A",
          "B"
        ],
        [
          "C",
          "D"
        ]
      ],
      "ABA"
    ],
    "expected": false
  },
  {
    "name": "orthogonal turns are allowed",
    "args": [
      [
        [
          "A",
          "B"
        ],
        [
          "C",
          "D"
        ]
      ],
      "ABD"
    ],
    "expected": true
  },
  {
    "name": "word longer than the board",
    "args": [
      [
        [
          "A",
          "B"
        ]
      ],
      "ABAB"
    ],
    "expected": false
  },
  {
    "name": "single cell with a different letter",
    "args": [
      [
        [
          "A"
        ]
      ],
      "B"
    ],
    "expected": false
  },
  {
    "name": "path must backtrack out of a dead end",
    "args": [
      [
        [
          "A",
          "B",
          "C",
          "E"
        ],
        [
          "S",
          "F",
          "E",
          "S"
        ],
        [
          "A",
          "D",
          "E",
          "E"
        ]
      ],
      "ABCESEEEFS"
    ],
    "expected": true
  },
  {
    "name": "LeetCode example 1",
    "args": [
      [
        [
          "A",
          "B",
          "C",
          "E"
        ],
        [
          "S",
          "F",
          "C",
          "S"
        ],
        [
          "A",
          "D",
          "E",
          "E"
        ]
      ],
      "ABCCED"
    ],
    "expected": true
  },
  {
    "name": "LeetCode example 3",
    "args": [
      [
        [
          "A",
          "B",
          "C",
          "E"
        ],
        [
          "S",
          "F",
          "C",
          "S"
        ],
        [
          "A",
          "D",
          "E",
          "E"
        ]
      ],
      "ABCB"
    ],
    "expected": false
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(exist(...(args as any))).toEqual(expected);
});
