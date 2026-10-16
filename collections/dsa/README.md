# DSA collection

Entries 1–2 are the existing LFU Cache and Min Heap exercises. Entries 3–30 adapt all other exercises supported by [kata-machine](https://github.com/ThePrimeagen/kata-machine), including those not enabled in its generated `day1` set. They accompany [The Last Algorithms Course You’ll Need](https://master.dev/courses/algorithms/introduction/).

Each imported exercise owns its TypeScript tests, blank starter/solution, and fresh review schedule. Similar exercises in other collections remain separate because these preserve kata-machine’s APIs. No solutions or review history were imported; Min Heap was excluded.

| Number | Problem | Source exercise |
| --- | --- | --- |
| 3 | [Linear Search](./3-linear-search/description.md) | `LinearSearchList` |
| 4 | [Binary Search (Membership)](./4-binary-search-membership/description.md) | `BinarySearchList` |
| 5 | [Two Crystal Balls](./5-two-crystal-balls/description.md) | `TwoCrystalBalls` |
| 6 | [Bubble Sort](./6-bubble-sort/description.md) | `BubbleSort` |
| 7 | [Insertion Sort](./7-insertion-sort/description.md) | `InsertionSort` |
| 8 | [Merge Sort](./8-merge-sort/description.md) | `MergeSort` |
| 9 | [Quick Sort](./9-quick-sort/description.md) | `QuickSort` |
| 10 | [Array List](./10-array-list/description.md) | `ArrayList` |
| 11 | [Singly Linked List](./11-singly-linked-list/description.md) | `SinglyLinkedList` |
| 12 | [Doubly Linked List](./12-doubly-linked-list/description.md) | `DoublyLinkedList` |
| 13 | [Queue](./13-queue/description.md) | `Queue` |
| 14 | [Stack](./14-stack/description.md) | `Stack` |
| 15 | [Ring Buffer](./15-ring-buffer/description.md) | `RingBuffer` |
| 16 | [Hash Map](./16-hash-map/description.md) | `Map` |
| 17 | [LRU Cache (Generic)](./17-lru-cache-generic/description.md) | `LRU` |
| 18 | [Trie (Prefix Completions)](./18-trie-prefix-completions/description.md) | `Trie` |
| 19 | [Binary Tree Preorder Traversal](./19-binary-tree-preorder/description.md) | `BTPreOrder` |
| 20 | [Binary Tree Inorder Traversal](./20-binary-tree-inorder/description.md) | `BTInOrder` |
| 21 | [Binary Tree Postorder Traversal](./21-binary-tree-postorder/description.md) | `BTPostOrder` |
| 22 | [Binary Tree Breadth First Search](./22-binary-tree-bfs/description.md) | `BTBFS` |
| 23 | [Binary Search Tree Depth First Search](./23-bst-dfs/description.md) | `DFSOnBST` |
| 24 | [Compare Binary Trees](./24-compare-binary-trees/description.md) | `CompareBinaryTrees` |
| 25 | [Maze Solver](./25-maze-solver/description.md) | `MazeSolver` |
| 26 | [Graph Depth First Search (Adjacency List)](./26-graph-dfs-list/description.md) | `DFSGraphList` |
| 27 | [Graph Breadth First Search (Adjacency List)](./27-graph-bfs-list/description.md) | `BFSGraphList` |
| 28 | [Graph Breadth First Search (Adjacency Matrix)](./28-graph-bfs-matrix/description.md) | `BFSGraphMatrix` |
| 29 | [Dijkstra's Shortest Path](./29-dijkstra-list/description.md) | `DijkstraList` |
| 30 | [Prim's Minimum Spanning Tree](./30-prims-list/description.md) | `PrimsList` |

## Adaptation notes

- Preserve default exports and original method names, including queue `deque`, cache `update`, and map `size()`.
- Supply the capacity constructors already required by the source ArrayList and LRU tests. ArrayList capacity is positive and grows; LRU accepts zero capacity.
- Accept null binary-tree roots, so the empty-tree cases are explicit and type-safe. Shared source types are local explicit imports rather than ambient globals.
- Specify list bounds, ring-buffer growth/FIFO behavior, map key equality, trie set/deletion semantics, and graph failure results in each description.
- Use local Vitest imports and fixtures. Replace the random Two Crystal Balls test with deterministic transition cases. Remove source debugger statements and fix the Prim’s import.
- Prim’s tests use a symmetric undirected version of the source graph and validate tree edges, connectivity, and total weight. Ties and adjacency order do not require a particular MST. Dijkstra’s tied shortest paths also accept any minimum route.

Run one exercise with `npx vitest run collections/dsa/<number>-<slug>/ts/solution.test.ts`. Fresh starters intentionally fail until implemented. Algorithm and storage restrictions in the descriptions apply even when behavioral tests cannot enforce them.
