export function isAnagram(s: string, t: string): boolean {
  const sFreq: Record<string, number> = {};
  const tFreq: Record<string, number> = {};

  if (s.length !== t.length) return false;

  for (let c of s) {
    sFreq[c] = sFreq[c] || 0;
    sFreq[c]++;
  }

  for (let c of t) {
    tFreq[c] = tFreq[c] || 0;
    tFreq[c]++;
  }

  for (let key in sFreq) {
    if (sFreq[key] !== tFreq[key]) return false;
  }
  return true;
}
