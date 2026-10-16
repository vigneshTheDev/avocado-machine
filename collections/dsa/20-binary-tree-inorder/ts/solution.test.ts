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
