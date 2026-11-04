import {expect, test} from 'vitest';
import {FreqStack} from './solution';

test('frequency and recency determine pop order', () => {
  const stack = new FreqStack();
  for (const value of [5, 7, 5, 7, 4, 5]) stack.push(value);
  expect([stack.pop(), stack.pop(), stack.pop(), stack.pop()]).toEqual([5, 7, 5, 4]);
});

test('a single value can be pushed and popped repeatedly', () => {
  const stack = new FreqStack();
  stack.push(1);
  stack.push(1);
  expect([stack.pop(), stack.pop()]).toEqual([1, 1]);
});

test('all values tied at frequency one behave like a stack', () => {
  const stack = new FreqStack();
  for (const value of [1, 2, 3, 4]) stack.push(value);
  expect([stack.pop(), stack.pop(), stack.pop(), stack.pop()]).toEqual([4, 3, 2, 1]);
});

test('ties among several values are broken by the most recent push', () => {
  const stack = new FreqStack();
  for (const value of [1, 2, 3, 3, 2, 1]) stack.push(value);
  expect([stack.pop(), stack.pop(), stack.pop(), stack.pop(), stack.pop(), stack.pop()]).toEqual([1, 2, 3, 3, 2, 1]);
});

test('interleaved pushes and pops', () => {
  const stack = new FreqStack();
  stack.push(4);
  stack.push(0);
  stack.push(9);
  stack.push(3);
  stack.push(4);
  stack.push(2);
  expect(stack.pop()).toBe(4);
  stack.push(6);
  expect(stack.pop()).toBe(6);
  stack.push(1);
  expect(stack.pop()).toBe(1);
  stack.push(1);
  expect(stack.pop()).toBe(1);
  stack.push(4);
  expect([stack.pop(), stack.pop(), stack.pop(), stack.pop(), stack.pop(), stack.pop()]).toEqual([4, 2, 3, 9, 0, 4]);
});

test('a value regains priority after more pushes', () => {
  const stack = new FreqStack();
  for (const value of [7, 7, 8]) stack.push(value);
  expect(stack.pop()).toBe(7);
  stack.push(8);
  expect(stack.pop()).toBe(8);
  expect(stack.pop()).toBe(8);
  expect(stack.pop()).toBe(7);
});

test('many operations stay fast', () => {
  const stack = new FreqStack();
  const n = 20000;
  for (let i = 0; i < n; i++) stack.push(i % 100);
  for (let round = n / 100; round > 0; round--) {
    for (let v = 99; v >= 0; v--) expect(stack.pop()).toBe(v);
  }
});
