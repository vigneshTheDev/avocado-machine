import {expect, test} from 'vitest';
import {HitCounter} from './solution';

test('counts hits and evicts old timestamps', () => {
  const counter = new HitCounter();
  counter.hit(1);
  counter.hit(2);
  counter.hit(3);
  expect(counter.getHits(4)).toBe(3);
  counter.hit(300);
  expect(counter.getHits(300)).toBe(4);
  expect(counter.getHits(301)).toBe(3);
});

test('counts multiple hits at one timestamp', () => {
  const counter = new HitCounter();
  counter.hit(1);
  counter.hit(1);
  expect(counter.getHits(1)).toBe(2);
});

test('no hits yet', () => {
  const counter = new HitCounter();
  expect(counter.getHits(1)).toBe(0);
  expect(counter.getHits(1000)).toBe(0);
});

test('a hit expires exactly 300 seconds later', () => {
  const counter = new HitCounter();
  counter.hit(100);
  expect(counter.getHits(100)).toBe(1);
  expect(counter.getHits(399)).toBe(1);
  expect(counter.getHits(400)).toBe(0);
});

test('many hits at one timestamp expire together', () => {
  const counter = new HitCounter();
  for (let i = 0; i < 1000; i++) counter.hit(5);
  counter.hit(6);
  expect(counter.getHits(304)).toBe(1001);
  expect(counter.getHits(305)).toBe(1);
  expect(counter.getHits(306)).toBe(0);
});

test('a large gap clears everything and counting resumes', () => {
  const counter = new HitCounter();
  for (let t = 1; t <= 300; t++) counter.hit(t);
  expect(counter.getHits(300)).toBe(300);
  expect(counter.getHits(1000000)).toBe(0);
  counter.hit(1000000);
  counter.hit(1000001);
  expect(counter.getHits(1000001)).toBe(2);
  expect(counter.getHits(1000300)).toBe(1);
});

test('many hits over a long period', () => {
  const counter = new HitCounter();
  for (let t = 1; t <= 50000; t++) {
    counter.hit(t);
    counter.hit(t);
    if (t % 1000 === 0) expect(counter.getHits(t)).toBe(600);
  }
  expect(counter.getHits(50150)).toBe(300);
});
