import { test, expect } from "vitest";
import bt_post_order from "./solution";
import { tree } from "./tree";

test("post order", function () {
    expect(bt_post_order(tree)).toEqual([
        7,
        5,
        15,
        10,
        29,
        45,
        30,
        100,
        50,
        20,
    ]);
});

test("empty, singleton, skewed, and repeated values without mutation", () => {
  expect(bt_post_order(null)).toEqual([]);
  expect(bt_post_order({value: 7, left: null, right: null})).toEqual([7]);
  const head = {value: 0, left: {value: -2, left: null, right: {value: -2, left: null, right: null}}, right: {value: 3, left: null, right: null}};
  const before = structuredClone(head);
  expect(bt_post_order(head)).toEqual([-2, -2, 3, 0]);
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
  expect(bt_post_order(head)).toEqual([16, 17, 8, 18, 19, 9, 4, 20, 21, 10, 22, 23, 11, 5, 2, 24, 25, 12, 26, 27, 13, 6, 28, 29, 14, 30, 31, 15, 7, 3, 1]);
  expect(head).toEqual(before);
});

test.each([
  ["right", descending(2000)],
  ["left", descending(2000)],
] as const)("%s-skewed chain of 2,000 nodes", (side, expected) => {
  const head = chain(2000, side);
  expect(bt_post_order(head)).toEqual(expected);
});

test("zigzag tree", () => {
  const head: Tree = {
    value: 1, right: null,
    left: { value: 2, left: null, right: { value: 3, right: null, left: { value: 4, left: null, right: { value: 5, left: null, right: null } } } },
  };
  expect(bt_post_order(head)).toEqual([5, 4, 3, 2, 1]);
});
