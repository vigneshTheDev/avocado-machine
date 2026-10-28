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
];

test.each(cases)("$name", ({ args, expected }) => {
  expect(reverseBits(args[0])).toEqual(expected);
});
