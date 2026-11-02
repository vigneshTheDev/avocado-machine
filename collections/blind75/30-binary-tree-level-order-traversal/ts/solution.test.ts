import {expect, test} from 'vitest';
import {levelOrder} from './solution';
import {treeFrom, treeToArray} from '../../support';

const cases = [
  {
    "args": [
      []
    ],
    "expected": [],
    "name": "baseline: [[]]"
  },
  {
    "name": "levels retain left-to-right order",
    "args": [
      [
        1,
        2,
        3,
        null,
        4,
        5
      ]
    ],
    "expected": [
      [
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ]
    ]
  },
  {
    "name": "single root level",
    "args": [
      [
        9
      ]
    ],
    "expected": [
      [
        9
      ]
    ]
  },
  {
    "name": "left-skewed tree has one node per level",
    "args": [
      [
        1,
        2,
        null,
        3,
        null,
        4
      ]
    ],
    "expected": [
      [
        1
      ],
      [
        2
      ],
      [
        3
      ],
      [
        4
      ]
    ]
  },
  {
    "name": "level with gaps",
    "args": [
      [
        1,
        2,
        3,
        4,
        null,
        null,
        5
      ]
    ],
    "expected": [
      [
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ]
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ]
    ],
    "expected": [
      [
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(levelOrder(treeFrom(args[0]))).toEqual(expected);
});
