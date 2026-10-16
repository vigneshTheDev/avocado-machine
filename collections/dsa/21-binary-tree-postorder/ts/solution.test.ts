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
