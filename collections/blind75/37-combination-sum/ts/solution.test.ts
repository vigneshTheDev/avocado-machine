import {expect, test} from 'vitest';
import {combinationSum} from './solution';
const normalize = (value: number[][] | string[][]) => value.map(group => [...group].sort()).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
const cases = [
  {
    "args": [
      [
        2,
        5,
        9
      ],
      5
    ],
    "expected": [
      [
        5
      ]
    ],
    "name": "baseline: [[2,5,9],5]"
  },
  {
    "name": "one candidate can be reused",
    "args": [
      [
        2,
        3,
        6,
        7
      ],
      7
    ],
    "expected": [
      [
        2,
        2,
        3
      ],
      [
        7
      ]
    ]
  },
  {
    "name": "unreachable target has no combinations",
    "args": [
      [
        4,
        6
      ],
      7
    ],
    "expected": []
  },
  {
    "name": "target smaller than every candidate",
    "args": [
      [
        5,
        6
      ],
      3
    ],
    "expected": []
  },
  {
    "name": "single candidate equal to the target",
    "args": [
      [
        7
      ],
      7
    ],
    "expected": [
      [
        7
      ]
    ]
  },
  {
    "name": "each combination appears once",
    "args": [
      [
        2,
        3
      ],
      6
    ],
    "expected": [
      [
        2,
        2,
        2
      ],
      [
        3,
        3
      ]
    ]
  },
  {
    "name": "no permutations of the same combination",
    "args": [
      [
        2,
        3
      ],
      8
    ],
    "expected": [
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        3,
        3
      ]
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        2,
        5,
        6,
        9
      ],
      9
    ],
    "expected": [
      [
        2,
        2,
        5
      ],
      [
        9
      ]
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(normalize(combinationSum(...(args as any)) as any)).toEqual(normalize(expected as any));
});
