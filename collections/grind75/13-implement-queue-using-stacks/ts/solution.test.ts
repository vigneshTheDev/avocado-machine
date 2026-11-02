import {expect, test} from 'vitest';
import {MyQueue} from './solution';
test('maintains FIFO order across interleaved operations', () => {
  const q = new MyQueue();
  expect(q.empty()).toBe(true);
  q.push(1); q.push(2);
  expect(q.peek()).toBe(1);
  expect(q.pop()).toBe(1);
  q.push(3);
  expect(q.pop()).toBe(2);
  expect(q.pop()).toBe(3);
  expect(q.empty()).toBe(true);
});
test('peek after a transfer still sees the oldest value when more are pushed', () => {
  const q = new MyQueue();
  q.push(1); q.push(2); q.push(3);
  expect(q.pop()).toBe(1);
  expect(q.peek()).toBe(2);
  q.push(4);
  expect(q.peek()).toBe(2);
  expect(q.pop()).toBe(2);
  expect(q.pop()).toBe(3);
  expect(q.peek()).toBe(4);
  expect(q.pop()).toBe(4);
  expect(q.empty()).toBe(true);
});
test('empty reflects state after interleaved fills and drains', () => {
  const q = new MyQueue();
  q.push(5);
  expect(q.empty()).toBe(false);
  expect(q.pop()).toBe(5);
  expect(q.empty()).toBe(true);
  q.push(6); q.push(7);
  expect(q.pop()).toBe(6);
  q.push(8);
  expect(q.empty()).toBe(false);
  expect(q.pop()).toBe(7);
  expect(q.pop()).toBe(8);
  expect(q.empty()).toBe(true);
  q.push(9);
  expect(q.peek()).toBe(9);
  expect(q.empty()).toBe(false);
});
test('handles 100,000 pushes followed by pops in amortised constant time', () => {
  const q = new MyQueue();
  for (let i = 0; i < 100_000; i++) q.push(i);
  const peeked: number[] = [];
  const popped: number[] = [];
  for (let i = 0; i < 100_000; i++) {
    peeked.push(q.peek());
    popped.push(q.pop());
  }
  const expected = Array.from({length: 100_000}, (_, i) => i);
  expect(peeked).toEqual(expected);
  expect(popped).toEqual(expected);
  expect(q.empty()).toBe(true);
});
