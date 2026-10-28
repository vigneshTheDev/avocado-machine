export function reverseBits(n: number): number {
  let out = 0;
  for (let i = 0; i < 32; i++) {
    const bit = n & 1;
    n >>>= 1;
    out <<= 1;
    out += bit;
  }
  return out >>> 0;
}
