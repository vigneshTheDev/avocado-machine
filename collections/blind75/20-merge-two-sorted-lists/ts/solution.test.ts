import {expect, test} from 'vitest';
import {mergeTwoLists} from './solution';
import {listFrom, listToArray} from '../../support';

const cases = [
  {
    "args": [
      [],
      []
    ],
    "expected": [],
    "name": "baseline: [[],[]]"
  },
  {
    "name": "one list empty",
    "args": [
      [],
      [
        1,
        2
      ]
    ],
    "expected": [
      1,
      2
    ]
  },
  {
    "name": "equal values from both lists",
    "args": [
      [
        1,
        2,
        2
      ],
      [
        1,
        2,
        3
      ]
    ],
    "expected": [
      1,
      1,
      2,
      2,
      2,
      3
    ]
  },
  {
    "name": "second list empty",
    "args": [
      [
        1,
        2
      ],
      []
    ],
    "expected": [
      1,
      2
    ]
  },
  {
    "name": "every node of the first list is smaller",
    "args": [
      [
        1,
        2,
        3
      ],
      [
        4,
        5,
        6
      ]
    ],
    "expected": [
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "name": "every node of the second list is smaller",
    "args": [
      [
        4,
        5,
        6
      ],
      [
        1,
        2,
        3
      ]
    ],
    "expected": [
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "name": "negative values",
    "args": [
      [
        -5,
        -1,
        3
      ],
      [
        -3,
        0
      ]
    ],
    "expected": [
      -5,
      -3,
      -1,
      0,
      3
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        2,
        4
      ],
      [
        1,
        3,
        5
      ]
    ],
    "expected": [
      1,
      1,
      2,
      3,
      4,
      5
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(listToArray(mergeTwoLists(listFrom(args[0]), listFrom(args[1])))).toEqual(expected);
});

test('merging reuses every input node exactly once', () => {
    const left = listFrom([1, 3]);
    const right = listFrom([2, 4]);
    const inputNodes = new Set<any>();
    for (let node = left; node; node = node.next) inputNodes.add(node);
    for (let node = right; node; node = node.next) inputNodes.add(node);

    const merged = mergeTwoLists(left, right);
    expect(listToArray(merged)).toEqual([1, 2, 3, 4]);
    const outputNodes = new Set<any>();
    for (let node = merged; node; node = node.next) outputNodes.add(node);
    expect(outputNodes.size).toBe(inputNodes.size);
    for (const node of outputNodes) expect(inputNodes.has(node)).toBe(true);
});
