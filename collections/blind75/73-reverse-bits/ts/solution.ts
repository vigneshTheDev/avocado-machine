export function reverseBits(n: number): number {
  let out = (n >>> 16) | (n << 16);

  out = ((out & 0xff00ff00) >>> 8) | ((out & 0x00ff00ff) << 8);
  out = ((out & 0xf0f0f0f0) >>> 4) | ((out & 0x0f0f0f0f) << 4);
  out = ((out & 0xcccccccc) >>> 2) | ((out & 0x33333333) << 2);
  out = ((out & 0xaaaaaaaa) >>> 1) | ((out & 0x55555555) << 1);

  return out >>> 0;
}
