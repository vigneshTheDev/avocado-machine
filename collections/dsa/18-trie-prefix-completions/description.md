# Trie (Prefix Completions)

Implement a no-argument `Trie` with `insert(item)`, `delete(item)`, and `find(partial)`.

Strings contain lowercase ASCII letters a–z; the empty string is valid. Insertions have set semantics. Deletion removes only that complete word, preserving longer words and shorter prefixes; deleting an absent word is a no-op. `find` returns every complete stored word starting with the prefix, once each, in any order. An empty prefix returns all stored words; a missing prefix returns []. Include the prefix itself if it is stored.

Use a trie with terminal markers, not a flat list filtered on every query. Insert/delete take O(word length); find takes O(prefix length + nodes visited + output characters).

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `Trie`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
