export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const sFreq = new Map<string, number>();
  const tFreq = new Map<string, number>();

  for (let c of s) {
    const f = sFreq.get(c) || 0;
    sFreq.set(c, f + 1);
  }

  for (let c of t) {
    const f = tFreq.get(c) || 0;
    tFreq.set(c, f + 1);
  }

  for (let [key] of sFreq) {
    if (sFreq.get(key) !== tFreq.get(key)) return false;
  }
  return true;
}
