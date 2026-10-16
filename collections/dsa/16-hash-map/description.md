# Hash Map

Implement the default-exported `Map<T extends string | number, V>` class with a no-argument constructor.

- `set(key, value)` adds or updates a mapping and returns void.
- `get(key)` returns its value, or undefined when absent.
- `delete(key)` removes and returns the prior value, or undefined when absent.
- `size()` returns the number of distinct keys; updating an existing key does not increase it.

Keys are strings or finite numbers. Distinguish numeric 1 from string "1"; treat -0 and 0 as the same key. Support empty strings, prototype-like names, and falsy values. Handle hash collisions and grow storage while preserving entries. Implement hashing and collision resolution yourself, with expected amortized O(1) operations. Built-in Map/Set and direct object-property storage of user keys are outside this exercise.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `Map`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
