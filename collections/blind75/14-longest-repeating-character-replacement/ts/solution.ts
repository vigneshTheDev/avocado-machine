export function characterReplacement(s: string, k: number): number {
  let l = 0;
  let r = 0;
  let maxf = 0;
  let maxLen = 0;
  const freqMap: Record<string, number> = {};

  while (r < s.length) {
    freqMap[s[r]] = freqMap[s[r]] || 0;
    freqMap[s[r]]++;

    maxf = Math.max(maxf, freqMap[s[r]]);
    let length = r - l + 1;
    while (maxf + k < length) {
      freqMap[s[l]]--;
      l++;
      length--;
    }
    maxLen = Math.max(maxLen, length);
    r++;
  }
  return maxLen;
}
