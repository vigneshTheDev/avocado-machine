import {expect, test} from 'vitest';
import {mergeKLists} from './solution';
import {listFrom, listToArray} from '../../support';

const cases = [
  {
    "args": [
      []
    ],
    "expected": [],
    "name": "baseline: [[]]"
  },
  {
    "name": "empty lists among nonempty lists",
    "args": [
      [
        [],
        [
          1,
          4
        ],
        [],
        [
          2,
          3
        ]
      ]
    ],
    "expected": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "name": "equal heads from different lists",
    "args": [
      [
        [
          1,
          1
        ],
        [
          1
        ],
        [
          1,
          2
        ]
      ]
    ],
    "expected": [
      1,
      1,
      1,
      1,
      2
    ]
  },
  {
    "name": "single empty list",
    "args": [
      [
        []
      ]
    ],
    "expected": []
  },
  {
    "name": "one list",
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
      1,
      2,
      3
    ]
  },
  {
    "name": "many lists with negatives",
    "args": [
      [
        [
          -10,
          -5,
          0
        ],
        [
          -7,
          2
        ],
        [
          -8,
          -6,
          10
        ],
        [],
        [
          -9
        ]
      ]
    ],
    "expected": [
      -10,
      -9,
      -8,
      -7,
      -6,
      -5,
      0,
      2,
      10
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        [
          1,
          2,
          4
        ],
        [
          1,
          3,
          5
        ],
        [
          3,
          6
        ]
      ]
    ],
    "expected": [
      1,
      1,
      2,
      3,
      3,
      4,
      5,
      6
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(listToArray(mergeKLists(args[0].map(listFrom)))).toEqual(expected);
});

test('merging reuses every input node exactly once', () => {
    const lists = [[1, 4, 7], [], [2, 5], [3, 6, 8]].map(listFrom);
    const inputNodes = new Set<any>();
    for (const list of lists) for (let node = list; node; node = node.next) inputNodes.add(node);
    const merged = mergeKLists(lists);
    expect(listToArray(merged)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    const outputNodes = new Set<any>();
    for (let node = merged; node; node = node.next) outputNodes.add(node);
    expect(outputNodes.size).toBe(inputNodes.size);
    for (const node of outputNodes) expect(inputNodes.has(node)).toBe(true);
});
