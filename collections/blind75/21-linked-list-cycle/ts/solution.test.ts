import {expect, test} from 'vitest';
import {hasCycle} from './solution';
import {listFrom, listToArray} from '../../support';

const cases = [
  {
    "args": [
      [
        0
      ],
      -1
    ],
    "expected": false,
    "name": "baseline: [[0],-1]"
  },
  {
    "name": "single node self cycle",
    "args": [
      [
        7
      ],
      0
    ],
    "expected": true
  },
  {
    "name": "cycle enters middle of list",
    "args": [
      [
        1,
        2,
        3,
        4
      ],
      1
    ],
    "expected": true
  },
  {
    "name": "empty list",
    "args": [
      [],
      -1
    ],
    "expected": false
  },
  {
    "name": "two nodes without a cycle",
    "args": [
      [
        1,
        2
      ],
      -1
    ],
    "expected": false
  },
  {
    "name": "two nodes with tail linked to head",
    "args": [
      [
        1,
        2
      ],
      0
    ],
    "expected": true
  },
  {
    "name": "description example",
    "args": [
      [
        1,
        2,
        3,
        4
      ],
      0
    ],
    "expected": true
  },
  {
    "name": "long list with tail linked to head",
    "args": [
      Array.from({length: 1000}, (_, i) => i),
      0
    ],
    "expected": true
  },
  {
    "name": "long list without a cycle",
    "args": [
      Array.from({length: 1000}, (_, i) => i),
      -1
    ],
    "expected": false
  }
];

test.each(cases)('$name', ({args, expected}) => {
    const head = listFrom(args[0]);
    if (args[1] >= 0) { let tail = head!; while (tail.next) tail = tail.next; let entry = head!; for (let j = 0; j < args[1]; j++) entry = entry.next!; tail.next = entry; }
    expect(hasCycle(head)).toBe(expected);
});
