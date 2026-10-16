# Prim's Minimum Spanning Tree

Implement `prims(list)` on an undirected weighted adjacency list. Every edge `{ to, weight }` has a reverse edge with the same finite weight; vertices are array indices. Zero and negative weights are valid. Inputs have no parallel edges; self-loops may be ignored.

Return a minimum spanning tree as an adjacency list with the same vertex count, storing each tree edge in both directions. Any MST and any neighbor order are accepted on ties. Return null for a disconnected nonempty graph; return [] for no vertices and [[]] for one vertex. Do not mutate the input.

Use Prim's algorithm, growing one tree with the cheapest edge crossing to an unvisited vertex. An O(V² + E) implementation is sufficient; a priority queue is also allowed. Use O(V + E) auxiliary space or better.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `PrimsList`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
