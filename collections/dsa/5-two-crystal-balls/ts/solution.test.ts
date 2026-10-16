import { test, expect } from "vitest";
import two_crystal_balls from "./solution";

test.each([0, 1, 2, 3, 4, 9, 10, 17, 64, 100, 821])("every break point at length %i", (length) => {
  for (let first = 0; first <= length; first++) {
    const values = Array.from({ length }, (_, i) => i >= first);
    const before = [...values];
    expect(two_crystal_balls(values)).toBe(first === length ? -1 : first);
    expect(values).toEqual(before);
  }
});
