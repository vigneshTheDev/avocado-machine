import { expect, test } from "vitest";
import { reverseBits } from "./solution";

const cases = [
  {
    args: [0],
    expected: 0,
    name: "baseline: [0]",
  },
  {
    name: "highest bit becomes lowest bit",
    args: [2147483648],
    expected: 1,
  },
  {
    name: "lowest bit becomes unsigned highest bit",
    args: [1],
    expected: 2147483648,
  },
  {
    name: "LeetCode example 1",
    args: [43261596],
    expected: 964176192,
  },
  {
    name: "LeetCode example 2 has the high bit set",
    args: [4294967293],
    expected: 3221225471,
  },
  {
    name: "description example",
    args: [21],
    expected: 2818572288,
  },
];

test.each(cases)("$name", ({ args, expected }) => {
  expect(reverseBits(args[0])).toEqual(expected);
});
