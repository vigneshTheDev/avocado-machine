# Graph Depth First Search (Adjacency List)

Implement `dfs(graph, source, needle)` using depth-first search and return the first path found. The graph is a weighted adjacency list, where each edge is `{ to, weight }`. Weights are finite and do not affect reachability. Visit neighbors in their listed order.

Vertices are array indices. Inputs contain at least one vertex and valid endpoint indices. Respect edge direction. Return the vertex path including both endpoints, [source] if source equals needle, or null if unreachable. Handle cycles and self-loops without revisiting vertices or modifying the graph. When multiple paths qualify, neighbor order determines which is returned.

Use O(V + E) time and O(V) auxiliary space plus the result.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `DFSGraphList`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
