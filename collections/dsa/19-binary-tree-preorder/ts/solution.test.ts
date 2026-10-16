import { test, expect } from "vitest";
import bt_pre_order from "./solution";
import { tree } from "./tree";

test("Pre order", function () {
    expect(bt_pre_order(tree)).toEqual([
        20,
        10,
        5,
        7,
        15,
        50,
        30,
        29,
        45,
        100,
    ]);
});

test("empty, singleton, skewed, and repeated values without mutation", () => {
  expect(bt_pre_order(null)).toEqual([]);
  expect(bt_pre_order({value: 7, left: null, right: null})).toEqual([7]);
  const head = {value: 0, left: {value: -2, left: null, right: {value: -2, left: null, right: null}}, right: {value: 3, left: null, right: null}};
  const before = structuredClone(head);
  expect(bt_pre_order(head)).toEqual([0, -2, -2, 3]);
  expect(head).toEqual(before);
});
