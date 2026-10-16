# Ring Buffer

Implement `RingBuffer<T>` with a no-argument constructor, array storage, a circular head index, and public `length` initially 0.

- `push(item)` adds at the logical back; grow the backing array when full instead of overwriting unread entries.
- `pop()` removes and returns the logical front (FIFO), or undefined when empty.
- `get(idx)` reads a zero-based logical index without removing it, or undefined when outside [0, length).

Indices are integers. Preserve order across wraparound, growth, emptying, and reuse. Use O(1) get/pop and amortized O(1) push; do not shift array contents on every pop. Initial internal capacity is your choice.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `RingBuffer`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
