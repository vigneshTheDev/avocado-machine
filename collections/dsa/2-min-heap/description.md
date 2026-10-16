# Min Heap

Implement an array-backed binary min heap for finite numbers. The smallest value
must always be available at the root.

- `new MinHeap()` creates an empty heap.
- `insert(value: number): void` adds one value.
- `peek(): number | undefined` returns the smallest value without removing it,
  or `undefined` when empty.
- `extractMin(): number | undefined` removes and returns the smallest value,
  or returns `undefined` when empty.
- Read-only `size: number` reports the number of stored values.
- Negative numbers, zero, fractional numbers, and duplicates are supported.
  Each insertion counts as a separate entry.
- Inputs are guaranteed to be finite numbers; validation of `NaN` or infinities
  is not required.

Use O(log n) time for insertion and extraction, O(1) time for peek and size,
and O(n) storage. Maintain heap order through parent/child comparisons and
sifting; sorting the array after each operation does not meet the requirements.
An insertion may occasionally take O(n) for the backing array to resize.

The tests in `solution.test.ts` define the expected behavior. The storage
representation and complexity requirements also apply, even though behavioral
tests alone cannot enforce them.
