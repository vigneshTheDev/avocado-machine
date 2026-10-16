import { test, expect } from "vitest";
import quick_sort from "./solution";

test("quick-sort", function () {
    const arr = [9, 3, 7, 4, 69, 420, 42];

    quick_sort(arr);
    expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
});

test.each([[], [1], [2, 1], [1, 2, 3], [5, 4, 3, 2, 1],
  [3, -2, 0, 3, 1.5, -2], [7, 7, 7, 7],
  Array.from({ length: 80 }, (_, i) => (i * 37) % 19 - 9),
])("sorts boundary and duplicate cases: %j", (...input) => {
  const values = [...input];
  const expected = [...values].sort((a, b) => a - b);
  expect(quick_sort(values)).toBeUndefined();
  expect(values).toEqual(expected);
});
