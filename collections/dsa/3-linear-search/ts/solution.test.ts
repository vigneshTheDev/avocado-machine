import { test, expect } from "vitest";
import linear_search from "./solution"

test("linear search array", function() {

    const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
    expect(linear_search(foo, 69)).toEqual(true);
    expect(linear_search(foo, 1336)).toEqual(false);
    expect(linear_search(foo, 69420)).toEqual(true);
    expect(linear_search(foo, 69421)).toEqual(false);
    expect(linear_search(foo, 1)).toEqual(true);
    expect(linear_search(foo, 0)).toEqual(false);
});

test.each([
  [[], 0, false], [[4], 4, true], [[4], 3, false],
  [[-5, -1, 0, 0, 2.5, 8], 0, true],
  [[-5, -1, 0, 0, 2.5, 8], 2.5, true],
  [[-5, -1, 0, 0, 2.5, 8], -6, false],
  [[-5, -1, 0, 0, 2.5, 8], 9, false],
  [[1, 3], 2, false],
])("searches %j for %s", (values, needle, expected) => {
  const before = [...values];
  expect(linear_search(values, needle)).toBe(expected);
  expect(values).toEqual(before);
});

test("searches unsorted input without assuming binary-search ordering", () => {
  const values = [8, -2, 5, 0, 3];
  const before = [...values];
  for (const value of values) expect(linear_search(values, value)).toBe(true);
  expect(linear_search(values, 7)).toBe(false);
  expect(values).toEqual(before);
});
