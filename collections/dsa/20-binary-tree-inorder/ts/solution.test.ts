import { test, expect } from "vitest";
import bt_in_order from "./solution";
import { tree } from "./tree";

test("In order", function () {
    expect(bt_in_order(tree)).toEqual([
        5,
        7,
        10,
        15,
        20,
        29,
        30,
        45,
        50,
        100,
    ]);
});

test("empty, singleton, skewed, and repeated values without mutation", () => {
  expect(bt_in_order(null)).toEqual([]);
  expect(bt_in_order({value: 7, left: null, right: null})).toEqual([7]);
  const head = {value: 0, left: {value: -2, left: null, right: {value: -2, left: null, right: null}}, right: {value: 3, left: null, right: null}};
  const before = structuredClone(head);
  expect(bt_in_order(head)).toEqual([-2, -2, 0, 3]);
  expect(head).toEqual(before);
});

type Tree = { value: number; left: Tree | null; right: Tree | null };

// Full tree of depth 5: node i has children 2i and 2i + 1 (values 1..31).
function fullTree(i = 1): Tree | null {
  return i > 31 ? null : { value: i, left: fullTree(2 * i), right: fullTree(2 * i + 1) };
}

// Skewed chain with values 1..n from the root down.
function chain(n: number, side: "left" | "right"): Tree | null {
  let head: Tree | null = null;
  for (let value = n; value >= 1; value--) {
    head = { value, left: side === "left" ? head : null, right: side === "right" ? head : null };
  }
  return head;
}

const ascending = (n: number) => Array.from({ length: n }, (_, i) => i + 1);
const descending = (n: number) => ascending(n).reverse();

test("full tree of depth 5", () => {
  const head = fullTree();
  const before = structuredClone(head);
  expect(bt_in_order(head)).toEqual([16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 23, 1, 24, 12, 25, 6, 26, 13, 27, 3, 28, 14, 29, 7, 30, 15, 31]);
  expect(head).toEqual(before);
});

test.each([
  ["right", ascending(2000)],
  ["left", descending(2000)],
] as const)("%s-skewed chain of 2,000 nodes", (side, expected) => {
  const head = chain(2000, side);
  expect(bt_in_order(head)).toEqual(expected);
});

test("zigzag tree", () => {
  const head: Tree = {
    value: 1, right: null,
    left: { value: 2, left: null, right: { value: 3, right: null, left: { value: 4, left: null, right: { value: 5, left: null, right: null } } } },
  };
  expect(bt_in_order(head)).toEqual([2, 4, 5, 3, 1]);
});
