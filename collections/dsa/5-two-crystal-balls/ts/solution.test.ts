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

test.each([99, 1000, 10_000, 1_000_000])("probes O(sqrt n) distinct indices at length %i", (length) => {
  let first = 0;
  const read = new Set<number>();
  // A Proxy over a sparse array, so each break point does not allocate n values.
  const breaks = new Proxy(new Array<boolean>(length), {
    get(target, key, receiver) {
      if (typeof key === "string" && /^-?\d+$/.test(key)) {
        const i = Number(key);
        read.add(i);
        return i >= 0 && i < length ? i >= first : undefined;
      }
      return Reflect.get(target, key, receiver);
    },
  });
  // About sqrt(n) jumps plus a sqrt(n) scan of one block, with a little slack.
  const limit = 2 * Math.ceil(Math.sqrt(length)) + 2;
  const step = Math.max(1, Math.floor(length / 997));
  const points = new Set<number>([0, 1, length - 1, length]);
  for (let p = 0; p <= length; p += step) points.add(p);
  for (const point of points) {
    first = point;
    read.clear();
    expect(two_crystal_balls(breaks), `break point ${point}`).toBe(point === length ? -1 : point);
    expect(read.size, `break point ${point} read ${read.size} indices`).toBeLessThanOrEqual(limit);
  }
});
