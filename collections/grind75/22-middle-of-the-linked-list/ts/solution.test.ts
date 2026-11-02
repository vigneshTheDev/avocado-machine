import {expect, test} from 'vitest';
import {middleNode, type ListNode} from './solution';
function list(values: number[]): ListNode | null {
  return values.reduceRight<ListNode | null>((next, val) => ({val, next}), null);
}
function nodes(head: ListNode | null): ListNode[] {
  const result: ListNode[] = [];
  for (let node = head; node; node = node.next) result.push(node);
  return result;
}
test.each([
  [[1, 2, 3, 4, 5], 3],
  [[1, 2, 3, 4, 5, 6], 4],
  [[7], 7],
  [[1, 2], 2],
  [[1, 2, 3], 2],
])('finds middle in %j', (values, expected) => {
  expect(middleNode(list(values as number[]))?.val).toBe(expected);
});
test('empty list', () => expect(middleNode(null)).toBeNull());
test.each([1, 2, 5, 6, 1001])('returns the original middle node of a %i-node list', length => {
  const head = list(Array(length).fill(0));
  const all = nodes(head);
  expect(middleNode(head)).toBe(all[Math.floor(length / 2)]);
  expect(nodes(head)).toHaveLength(length);
});
