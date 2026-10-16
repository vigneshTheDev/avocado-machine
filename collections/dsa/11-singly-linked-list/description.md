# Singly Linked List

Implement `SinglyLinkedList<T>` with a no-argument constructor and singly linked nodes.

Expose `length` (initially 0) and these methods:

- `prepend(item)` and `append(item)` add at either end.
- `insertAt(item, idx)` inserts before index idx; idx equal to length appends.
- `get(idx)` returns the indexed value or undefined when out of bounds.
- `remove(item)` removes and returns the first strictly equal item, or undefined if absent.
- `removeAt(idx)` removes and returns the indexed item, or undefined when out of bounds.

Indices are integers. Negative or too-large read/removal indices return undefined without changes. An insertion outside [0, length] throws RangeError without changes. Duplicates are separate entries. Keep length accurate after every operation, including emptying and reusing the list.

Maintain head and tail pointers. Prepend and append are O(1); indexed access, insertion, and removal are O(n). Do not use an array as the underlying storage.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `SinglyLinkedList`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
