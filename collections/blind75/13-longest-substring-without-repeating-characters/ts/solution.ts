export function lengthOfLongestSubstring(s: string): number {
  let l = 0;
  let r = 0;
  const freqMap: Record<string, number> = {};
  let max = 0;

  while (r < s.length) {
    freqMap[s[r]] = freqMap[s[r]] || 0;
    freqMap[s[r]]++;

    while (freqMap[s[r]] > 1) {
      freqMap[s[l]]--;
      l++;
    }
    max = Math.max(r - l + 1, max);
    console.log(l, r, max);
    r++;
  }
  return max;
}
