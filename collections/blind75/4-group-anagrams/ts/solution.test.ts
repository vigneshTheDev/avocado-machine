import {expect, test} from 'vitest';
import {groupAnagrams} from './solution';
const normalize = (value: number[][] | string[][]) => value.map(group => [...group].sort()).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
const cases = [
  {
    "args": [
      [
        "a",
        "",
        "",
        ""
      ]
    ],
    "expected": [
      [
        "a"
      ],
      [
        "",
        "",
        ""
      ]
    ],
    "name": "baseline: [[\"a\",\"\",\"\",\"\"]]"
  },
  {
    "name": "same letters with multiplicity form one group",
    "args": [
      [
        "abb",
        "bab",
        "bba",
        "ab"
      ]
    ],
    "expected": [
      [
        "abb",
        "bab",
        "bba"
      ],
      [
        "ab"
      ]
    ]
  },
  {
    "name": "empty strings group separately from single letters",
    "args": [
      [
        "",
        "a",
        "",
        "b"
      ]
    ],
    "expected": [
      [
        "",
        ""
      ],
      [
        "a"
      ],
      [
        "b"
      ]
    ]
  },
  {
    "name": "all strings identical form one group",
    "args": [
      [
        "abc",
        "abc",
        "abc"
      ]
    ],
    "expected": [
      [
        "abc",
        "abc",
        "abc"
      ]
    ]
  },
  {
    "name": "single empty string",
    "args": [
      [
        ""
      ]
    ],
    "expected": [
      [
        ""
      ]
    ]
  },
  {
    "name": "strings that differ only in letter counts stay apart",
    "args": [
      [
        "aab",
        "abb",
        "bab"
      ]
    ],
    "expected": [
      [
        "aab"
      ],
      [
        "abb",
        "bab"
      ]
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        "act",
        "cat",
        "hat"
      ]
    ],
    "expected": [
      [
        "act",
        "cat"
      ],
      [
        "hat"
      ]
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(normalize(groupAnagrams(...(args as any)) as any)).toEqual(normalize(expected as any));
});
