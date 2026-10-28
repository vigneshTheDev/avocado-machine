export function hammingWeight(n: number): number {
  let count = 0;
  while (n) {
    const lastBit = n & 1;
    if (lastBit) count++;
    n >>>= 1;
  }
  return count;
}
