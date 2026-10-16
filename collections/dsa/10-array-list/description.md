# Array List

Implement `ArrayList<T>` with `new ArrayList<T>(capacity)`, where capacity is a positive integer initial backing-array size, not a length limit. Grow storage when full; retain all elements across growth.

Expose `length` (initially 0) and these methods:

- `prepend(item)` and `append(item)` add at either end.
- `insertAt(item, idx)` inserts before index idx; idx equal to length appends.
- `get(idx)` returns the indexed value or undefined when out of bounds.
- `remove(item)` removes and returns the first strictly equal item, or undefined if absent.
- `removeAt(idx)` removes and returns the indexed item, or undefined when out of bounds.

Indices are integers. Negative or too-large read/removal indices return undefined without changes. An insertion outside [0, length] throws RangeError without changes. Duplicates are separate entries. Keep length accurate after every operation, including emptying and reusing the list.

Use an array and explicit length/capacity bookkeeping. Indexed reads are O(1), append is amortized O(1), and insertion/removal is O(n). Do not implement shifts with built-in `splice`, `shift`, or `unshift`.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `ArrayList`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
