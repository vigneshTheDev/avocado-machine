# Queue

Implement a generic FIFO `Queue<T>` with a no-argument constructor. `enqueue(item)` appends, `deque()` removes and returns the oldest item, and `peek()` returns the oldest item without removing it. Preserve the original method spelling `deque`. Empty deque/peek return undefined. Public `length` starts at 0 and tracks stored entries. Support draining and refilling, including falsy values. Use linked nodes with O(1) enqueue, deque, and peek; do not use array shifting.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `Queue`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
