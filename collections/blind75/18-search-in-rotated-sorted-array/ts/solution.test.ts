import { expect, test } from "vitest";
import { search } from "./solution";

const cases = [
  {
    args: [[0], 999],
    expected: -1,
    name: "baseline: [[0],999]",
  },
  {
    args: [[3, 0], 3],
    expected: 0,
    name: "baseline 2: [[3, 0], 3]",
  },
  {
    name: "target at pivot",
    args: [[4, 5, 6, 7, 0, 1, 2], 0],
    expected: 4,
  },
  {
    name: "absent target inside numeric range",
    args: [[4, 5, 6, 7, 0, 1, 2], 3],
    expected: -1,
  },
];

test.each(cases)("$name", ({ args, expected }) => {
  expect(search(...(args as any))).toEqual(expected);
});
