import {expect, test} from 'vitest';
import {reorderList} from './solution';
import {listFrom, listToArray} from '../../support';

const cases = [
  {
    "args": [
      [
        0
      ]
    ],
    "expected": [
      0
    ],
    "name": "baseline: [[0]]"
  },
  {
    "name": "even length interleaves both halves",
    "args": [
      [
        1,
        2,
        3,
        4
      ]
    ],
    "expected": [
      1,
      4,
      2,
      3
    ]
  },
  {
    "name": "odd length leaves center last",
    "args": [
      [
        1,
        2,
        3,
        4,
        5
      ]
    ],
    "expected": [
      1,
      5,
      2,
      4,
      3
    ]
  },
  {
    "name": "two nodes stay in order",
    "args": [
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
    "name": "three nodes",
    "args": [
      [
        1,
        2,
        3
      ]
    ],
    "expected": [
      1,
      3,
      2
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        2,
        4,
        6,
        8,
        10
      ]
    ],
    "expected": [
      2,
      10,
      4,
      8,
      6
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    const head = listFrom(args[0]);
    reorderList(head);
    expect(listToArray(head)).toEqual(expected);
});

test('reordering changes links rather than node values', () => {
    const head = listFrom([1, 2, 3, 4, 5])!;
    const nodes: any[] = [];
    for (let node: any = head; node; node = node.next) nodes.push(node);

    reorderList(head);
    expect(listToArray(head)).toEqual([1, 5, 2, 4, 3]);
    const reordered: any[] = [];
    for (let node: any = head; node; node = node.next) reordered.push(node);
    [nodes[0], nodes[4], nodes[1], nodes[3], nodes[2]].forEach((node, index) => {
        expect(reordered[index]).toBe(node);
    });
});

test('even-length reordering also reuses the original nodes', () => {
    const head = listFrom([1, 2, 3, 4])!;
    const nodes: any[] = [];
    for (let node: any = head; node; node = node.next) nodes.push(node);
    reorderList(head);
    expect(listToArray(head)).toEqual([1, 4, 2, 3]);
    const reordered: any[] = [];
    for (let node: any = head; node; node = node.next) reordered.push(node);
    [nodes[0], nodes[3], nodes[1], nodes[2]].forEach((node, index) => {
        expect(reordered[index]).toBe(node);
    });
});
