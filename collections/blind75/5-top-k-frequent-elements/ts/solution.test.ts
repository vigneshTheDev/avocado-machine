import {expect, test} from 'vitest';
import {topKFrequent} from './solution';
const normalize = (value: number[]) => [...value].sort((a, b) => a - b);
const cases = [
  {
    "args": [
      [
        100,
        100,
        100,
        100,
        100,
        -1,
        -1,
        -1,
        0,
        200
      ],
      1
    ],
    "expected": [
      100
    ],
    "name": "baseline: [[100,100,100,100,100,-1,-1,-1,0,200],1]"
  },
  {
    "name": "negative values and a frequency tie",
    "args": [
      [
        -1,
        -1,
        2,
        2,
        2,
        3
      ],
      2
    ],
    "expected": [
      2,
      -1
    ]
  },
  {
    "name": "one distinct value despite many copies",
    "args": [
      [
        4,
        4,
        4
      ],
      1
    ],
    "expected": [
      4
    ]
  },
  {
    "name": "k equals the number of distinct values",
    "args": [
      [
        1,
        2,
        2,
        3
      ],
      3
    ],
    "expected": [
      1,
      2,
      3
    ]
  },
  {
    "name": "frequencies need bucket ordering",
    "args": [
      [
        1,
        1,
        1,
        2,
        2,
        3
      ],
      2
    ],
    "expected": [
      1,
      2
    ]
  },
  {
    "name": "most frequent values are not the largest values",
    "args": [
      [
        5,
        3,
        3,
        1,
        1,
        1
      ],
      2
    ],
    "expected": [
      1,
      3
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        2,
        2,
        3,
        3,
        3
      ],
      2
    ],
    "expected": [
      2,
      3
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(normalize(topKFrequent(...(args as any)) as any)).toEqual(normalize(expected as any));
});
