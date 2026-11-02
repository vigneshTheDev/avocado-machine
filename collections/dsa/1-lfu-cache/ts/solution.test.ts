import { LFU } from "./solution";
import { test, describe, expect, vi, afterEach } from "vitest";

describe("LFU", () => {
  test("returns null if cache not found", () => {
    const lfu = new LFU(3);
    expect(lfu.get("a")).toBeNull();
  });

  test("returns value if cache item exists", () => {
    const lfu = new LFU(3);
    lfu.put("a", 1);
    expect(lfu.get("a")).toEqual(1);
  });

  test("evicts value if capacity reached", () => {
    const lfu = new LFU(3);
    lfu.put("a", 1);
    lfu.put("b", 2);
    lfu.put("c", 3);
    lfu.put("d", 4);

    expect(lfu.get("a")).toBeNull();
  });

  test("evicts LFU value if capacity reached", () => {
    const lfu = new LFU(3);
    lfu.put("a", 1);
    lfu.put("b", 2);
    lfu.put("c", 3);

    lfu.put("a", 11);
    lfu.get("b");

    lfu.put("d", 4);

    expect(lfu.get("a")).toBe(11);
    expect(lfu.get("b")).toBe(2);
    expect(lfu.get("c")).toBeNull();
    expect(lfu.get("d")).toBe(4);
  });

  test("evicts LRU value if there is a tie on frequency", () => {
    const lfu = new LFU(3);
    lfu.put("a", 1);
    lfu.put("b", 2);
    lfu.put("c", 3);

    lfu.get("b");
    lfu.put("a", 111);
    lfu.get("c");

    lfu.put("d", 3);

    expect(lfu.get("b")).toBeNull();
    expect(lfu.get("d")).toBe(3);
    expect(lfu.get("a")).toBe(111);
  });

  test("keeps capacity after evicting from a frequency bucket", () => {
    const lfu = new LFU(1);

    lfu.put("a", 1);
    lfu.put("b", 2);
    lfu.get("b");
    lfu.put("c", 3);

    expect(lfu.get("b")).toBeNull();
    expect(lfu.get("c")).toBe(3);
  });

  test("evicts LRU value when the capacity is 1", () => {
    const lfu = new LFU(1);
    lfu.put("a", 1);
    lfu.put("b", 2);

    expect(lfu.get("a")).toBeNull();
    expect(lfu.get("b")).toBe(2);
  });

  test("handles zero capacity correctly", () => {
    const lfu = new LFU(0);
    lfu.put("a", 1);
    expect(lfu.get("a")).toBeNull();
  });

  describe("zero capacity", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    test("stores nothing across inserts and updates without reporting errors", () => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});
      const lfu = new LFU<number>(0);
      lfu.put("a", 1);
      lfu.put("a", 2);
      lfu.put("b", 3);

      expect(lfu.get("a")).toBeNull();
      expect(lfu.get("b")).toBeNull();
      lfu.put("a", 4);
      expect(lfu.get("a")).toBeNull();
      expect(error).not.toHaveBeenCalled();
    });
  });

  test("updating an existing key at full capacity does not evict", () => {
    const lfu = new LFU<number>(2);
    lfu.put("a", 1);
    lfu.put("b", 2);
    lfu.put("a", 10);
    lfu.put("b", 20);
    lfu.put("a", 100);

    expect(lfu.get("a")).toBe(100);
    expect(lfu.get("b")).toBe(20);
  });

  test("evicts correctly when the minimum frequency is above 1", () => {
    const lfu = new LFU<number>(3);
    lfu.put("a", 1);
    lfu.put("b", 2);
    lfu.put("c", 3);
    // a: 3 uses, b: 2 uses, c: 3 uses
    lfu.get("a");
    lfu.get("a");
    lfu.get("b");
    lfu.get("c");
    lfu.get("c");

    lfu.put("d", 4);
    expect(lfu.get("b")).toBeNull();
    expect(lfu.get("a")).toBe(1);
    expect(lfu.get("c")).toBe(3);
    expect(lfu.get("d")).toBe(4);
  });

  test("a newly inserted key starts at frequency 1 and is the next victim", () => {
    const lfu = new LFU<number>(2);
    lfu.put("a", 1);
    lfu.put("b", 2);
    lfu.get("a");
    lfu.get("a");
    lfu.put("c", 3); // evicts b (frequency 1)
    lfu.put("d", 4); // evicts c (frequency 1, a has frequency 3)

    expect(lfu.get("b")).toBeNull();
    expect(lfu.get("c")).toBeNull();
    expect(lfu.get("a")).toBe(1);
    expect(lfu.get("d")).toBe(4);
  });

  test.each([0, false, ""])("returns the stored falsy value %j instead of a miss", (value) => {
    const lfu = new LFU<unknown>(2);
    lfu.put("a", value);
    lfu.put("b", "other");
    expect(lfu.get("a")).toBe(value);

    // a has frequency 2, so b is evicted.
    lfu.put("c", "new");
    expect(lfu.get("b")).toBeNull();
    expect(lfu.get("a")).toBe(value);
  });

  test("matches a reference model over a long randomized sequence", () => {
    // Deterministic PRNG so failures are reproducible.
    let seed = 0x1f2e3d4c;
    const random = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    type Entry = { key: string; value: number; freq: number; used: number };
    for (const capacity of [0, 1, 2, 3, 5]) {
      const lfu = new LFU<number>(capacity);
      const model: Entry[] = [];
      let clock = 0;
      const keys = ["a", "b", "c", "d", "e", "f", "g"];

      for (let step = 0; step < 3000; step++) {
        const key = keys[Math.floor(random() * keys.length)];
        const entry = model.find((e) => e.key === key);
        clock++;
        if (random() < 0.5) {
          const actual = lfu.get(key);
          if (entry) {
            entry.freq++;
            entry.used = clock;
            expect(actual, `capacity ${capacity}, step ${step}: get(${key})`).toBe(entry.value);
          } else {
            expect(actual, `capacity ${capacity}, step ${step}: get(${key})`).toBeNull();
          }
        } else {
          const value = Math.floor(random() * 1000);
          lfu.put(key, value);
          if (entry) {
            entry.value = value;
            entry.freq++;
            entry.used = clock;
          } else if (capacity > 0) {
            if (model.length >= capacity) {
              let victim = 0;
              for (let i = 1; i < model.length; i++) {
                const a = model[i], b = model[victim];
                if (a.freq < b.freq || (a.freq === b.freq && a.used < b.used)) victim = i;
              }
              model.splice(victim, 1);
            }
            model.push({ key, value, freq: 1, used: clock });
          }
        }
      }
    }
  });
});
