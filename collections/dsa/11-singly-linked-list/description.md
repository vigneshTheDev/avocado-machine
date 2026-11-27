# Singly Linked List

Implement `SinglyLinkedList<T>` with a no-argument constructor and singly linked nodes.

Expose `length` (initially 0) and these methods:

- `prepend(item)` and `append(item)` add at either end.
- `insertAt(item, idx)` inserts before index idx; idx equal to length appends.
- `get(idx)` returns the indexed value.
- `remove(item)` removes and returns the first strictly equal item, or undefined if absent.
- `removeAt(idx)` removes and returns the indexed item.

Assume indices are integers and satisfy each operation's preconditions: `0 <= idx <= length` for insertion, and `0 <= idx < length` for indexed access and removal. Indexed access and removal are only called on non-empty lists. Invalid indices do not need validation or defined behavior.

Duplicates are separate entries. Removing an absent value is valid, including on an empty list, and returns undefined. Keep length accurate after every operation, including emptying and reusing the list.

Maintain head and tail pointers. Prepend and append are O(1); indexed access, insertion, and removal are O(n). Do not use an array as the underlying storage.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `SinglyLinkedList`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
