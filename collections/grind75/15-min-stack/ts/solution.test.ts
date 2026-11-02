import {expect, test} from 'vitest';
import {MinStack} from './solution';
test('tracks minimum through duplicate minima and pops', () => {
  const stack = new MinStack();
  stack.push(2); stack.push(1); stack.push(1);
  expect(stack.getMin()).toBe(1);
  stack.pop(); expect(stack.getMin()).toBe(1);
  stack.pop(); expect(stack.top()).toBe(2);
  expect(stack.getMin()).toBe(2);
  stack.push(-3); expect(stack.getMin()).toBe(-3);
});
test('follows the description example', () => {
  const stack = new MinStack();
  stack.push(-2); stack.push(0); stack.push(-3);
  expect(stack.getMin()).toBe(-3);
  stack.pop();
  expect(stack.top()).toBe(0);
  expect(stack.getMin()).toBe(-2);
});
test('keeps the minimum when larger values are pushed after it', () => {
  const stack = new MinStack();
  stack.push(1); stack.push(5); stack.push(3);
  expect(stack.getMin()).toBe(1);
  stack.pop(); expect(stack.getMin()).toBe(1);
  stack.pop(); expect(stack.getMin()).toBe(1);
  expect(stack.top()).toBe(1);
});
test('checks top and min after every operation, including extreme values', () => {
  const stack = new MinStack();
  const ops: Array<['push', number] | ['pop']> = [
    ['push', 0], ['push', -1], ['push', Number.MIN_SAFE_INTEGER], ['push', Number.MAX_SAFE_INTEGER],
    ['push', Number.MIN_SAFE_INTEGER], ['pop'], ['pop'], ['pop'], ['push', -1], ['pop'], ['pop'], ['push', 4],
  ];
  const model: number[] = [];
  for (const op of ops) {
    if (op[0] === 'push') { stack.push(op[1]); model.push(op[1]); }
    else { stack.pop(); model.pop(); }
    expect(stack.top()).toBe(model[model.length - 1]);
    expect(stack.getMin()).toBe(Math.min(...model));
  }
});
test('handles 100,000 operations in constant time each', () => {
  const stack = new MinStack();
  const n = 100_000;
  for (let i = n; i > 0; i--) stack.push(i);
  let ok = stack.getMin() === 1;
  for (let i = 1; i < n; i++) {
    stack.pop();
    if (stack.getMin() !== i + 1 || stack.top() !== i + 1) ok = false;
  }
  expect(ok).toBe(true);
});
