# LRU Cache (Generic)

Implement `LRU<K, V>` with `new LRU<K, V>(capacity)`, where capacity is a nonnegative integer.

- `update(key, value)` inserts or replaces a mapping and marks it most recently used.
- `get(key)` returns the mapped value and marks a hit most recently used; a miss returns undefined without changing recency.
- When adding a new key to a full cache, evict the least recently used key.
- Capacity zero stores nothing. Updating an existing key never evicts another key.

Support arbitrary key/value types and falsy values; key equality follows JavaScript Map semantics. Use a key lookup plus a doubly linked recency list for O(1) get/update. There is no public length requirement; the source length field is private.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `LRU`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
