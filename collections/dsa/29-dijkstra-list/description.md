# Dijkstra's Shortest Path

Implement `dijkstra_list(source, sink, arr)` on a weighted adjacency list of `{ to, weight }` edges. Vertices are array indices, endpoints are valid, and there is at least one vertex. Edge weights are finite and nonnegative, including zero. Respect edge direction.

Return a minimum-total-weight path including both endpoints, [source] when source equals sink, or [] when sink is unreachable. Any minimum-weight path is accepted on ties. Do not modify the graph; handle cycles and repeated relaxations correctly.

Use Dijkstra's algorithm, settling the smallest unsettled distance rather than using hop count. An O(V² + E) scan implementation is sufficient; a min-priority queue is also allowed. Use O(V + E) auxiliary space or better.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `DijkstraList`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
