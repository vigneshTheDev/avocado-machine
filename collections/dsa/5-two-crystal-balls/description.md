# Two Crystal Balls

Implement `two_crystal_balls(breaks)`. The array is monotone: zero or more false values followed by zero or more true values. Return the first true index, or -1 if none exists (including empty input).

Model two breakable crystal balls: probe at roughly square-root-sized jumps until the first ball breaks, then scan the preceding block with the second ball. Use O(sqrt(n)) probes and O(1) extra space. Binary search is outside this exercise's two-ball constraint.

The tests define expected behavior. The algorithm, storage, and complexity requirements above also apply even where behavioral tests cannot enforce them.

Source exercise: `TwoCrystalBalls`.

[Algorithms course](https://master.dev/courses/algorithms/introduction/) · [kata-machine repository](https://github.com/ThePrimeagen/kata-machine)
