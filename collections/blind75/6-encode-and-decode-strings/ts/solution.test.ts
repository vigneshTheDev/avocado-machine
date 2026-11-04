import {expect, test} from 'vitest';
import {Codec} from './solution';

const cases = [
  {
    "args": [
      []
    ],
    "expected": [],
    "name": "baseline: [[]]"
  },
  {
    "name": "empty fields and delimiter-like text survive round trip",
    "args": [
      [
        "",
        "a#b",
        "12#",
        "\n",
        ""
      ]
    ],
    "expected": [
      "",
      "a#b",
      "12#",
      "\n",
      ""
    ]
  },
  {
    "name": "length prefix grows to two digits",
    "args": [
      [
        "abcdefghij",
        "x"
      ]
    ],
    "expected": [
      "abcdefghij",
      "x"
    ]
  },
  {
    "name": "single empty string is not an empty list",
    "args": [
      [
        ""
      ]
    ],
    "expected": [
      ""
    ]
  },
  {
    "name": "strings containing commas and length-like prefixes",
    "args": [
      [
        ",",
        "3,abc",
        "1#",
        "#",
        "0#"
      ]
    ],
    "expected": [
      ",",
      "3,abc",
      "1#",
      "#",
      "0#"
    ]
  },
  {
    "name": "description example",
    "args": [
      [
        "Hello",
        "World"
      ]
    ],
    "expected": [
      "Hello",
      "World"
    ]
  }
];

test.each(cases)('$name', ({args, expected}) => {
    const codec = new Codec();
    expect(codec.decode(codec.encode(args[0]))).toEqual(expected);
});

test('encoded data can be decoded by a different Codec instance', () => {
    const input = ['', 'a#b', '12#', '\n', ''];
    const encoded = new Codec().encode(input);
    expect(new Codec().decode(encoded)).toEqual(input);
    expect(new Codec().encode([])).not.toBe(new Codec().encode(['']));
});

test('lengths of 9, 99, 100 and 1000 characters and every ASCII character survive a round trip', () => {
    const ascii = Array.from({length: 128}, (_, i) => String.fromCharCode(i)).join('');
    const input = ['a'.repeat(9), 'b'.repeat(99), 'c'.repeat(100), 'd'.repeat(1000), ascii, '9#' + ascii];
    const codec = new Codec();
    expect(codec.decode(codec.encode(input))).toEqual(input);
});
