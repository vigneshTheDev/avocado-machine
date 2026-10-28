export function minWindow(s: string, t: string): string {
  const tFreq = new Map<string, number>();
  const sFreq = new Map<string, number>();

  let l = 0;
  let r = 0;

  let out = "";

  for (let c of t) {
    const f = tFreq.get(c) || 0;
    tFreq.set(c, f + 1);
  }

  let have = 0;
  const need = tFreq.size;

  while (r < s.length) {
    const f = sFreq.get(s[r]) || 0;
    sFreq.set(s[r], f + 1);

    if (f + 1 === tFreq.get(s[r])) have++;

    while ((sFreq.get(s[l]) || 0) > (tFreq.get(s[l]) || 0)) {
      const freq = sFreq.get(s[l])!;
      sFreq.set(s[l], freq - 1);
      l++;
    }

    if (need === have) {
      const length = r - l + 1;
      out = out.length === 0 || length < out.length ? s.slice(l, r + 1) : out;
    }
    r++;
  }
  return out;
}
