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
  {
    name: "target at index 0",
    args: [[4, 5, 6, 7, 0, 1, 2], 4],
    expected: 0,
  },
  {
    name: "target at the last index",
    args: [[4, 5, 6, 7, 0, 1, 2], 2],
    expected: 6,
  },
  {
    name: "two elements unrotated, target last",
    args: [[1, 3], 3],
    expected: 1,
  },
  {
    name: "two elements unrotated, target first",
    args: [[1, 3], 1],
    expected: 0,
  },
  {
    name: "two elements rotated, target last",
    args: [[3, 1], 1],
    expected: 1,
  },
  {
    name: "unrotated array",
    args: [[1, 2, 3, 4, 5], 4],
    expected: 3,
  },
  {
    name: "description example",
    args: [[3, 4, 5, 6, 1, 2], 1],
    expected: 4,
  },
];

test.each(cases)("$name", ({ args, expected }) => {
  expect(search(...(args as any))).toEqual(expected);
});
