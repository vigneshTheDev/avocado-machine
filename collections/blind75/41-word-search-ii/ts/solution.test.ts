import {expect, test} from 'vitest';
import {findWords} from './solution';
const normalize = (value: string[]) => [...value].sort();
const cases = [
  {
    "args": [
      [
        [
          "a",
          "b",
          "c"
        ],
        [
          "d",
          "a",
          "f"
        ]
      ],
      [
        "ab",
        "abc",
        "ad",
        "aba",
        "aaf"
      ]
    ],
    "expected": [
      "ab",
      "abc",
      "ad",
      "aba"
    ],
    "name": "baseline: [[[\"a\",\"b\",\"c\"],[\"d\",\"a\",\"f\"]],[\"ab\",\"abc\",\"ad\",\"aba\",\"aaf\"]]"
  },
  {
    "name": "deduplicates a candidate found by multiple paths",
    "args": [
      [
        [
          "a",
          "a"
        ],
        [
          "a",
          "a"
        ]
      ],
      [
        "aa",
        "aaa",
        "aaaa",
        "aaaaa"
      ]
    ],
    "expected": [
      "aa",
      "aaa",
      "aaaa"
    ]
  },
  {
    "name": "cannot reuse cells and preserves valid prefix word",
    "args": [
      [
        [
          "a",
          "b"
        ],
        [
          "c",
          "d"
        ]
      ],
      [
        "ab",
        "aba",
        "ac"
      ]
    ],
    "expected": [
      "ab",
      "ac"
    ]
  },
  {
    "name": "words sharing prefixes",
    "args": [
      [
        [
          "o",
          "a",
          "a",
          "n"
        ],
        [
          "e",
          "t",
          "a",
          "e"
        ],
        [
          "i",
          "h",
          "k",
          "r"
        ],
        [
          "i",
          "f",
          "l",
          "v"
        ]
      ],
      [
        "oath",
        "pea",
        "eat",
        "rain",
        "oat",
        "oaths"
      ]
    ],
    "expected": [
      "eat",
      "oath",
      "oat"
    ]
  },
  {
    "name": "empty word list",
    "args": [
      [
        [
          "a",
          "b"
        ],
        [
          "c",
          "d"
        ]
      ],
      []
    ],
    "expected": []
  },
  {
    "name": "description example",
    "args": [
      [
        [
          "a",
          "b"
        ],
        [
          "c",
          "d"
        ]
      ],
      [
        "ab",
        "ac",
        "abcd"
      ]
    ],
    "expected": [
      "ab",
      "ac"
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    expect(normalize(findWords(...(args as any)) as any)).toEqual(normalize(expected as any));
});
