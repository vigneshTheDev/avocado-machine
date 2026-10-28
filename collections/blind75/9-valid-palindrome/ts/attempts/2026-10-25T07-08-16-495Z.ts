export function isPalindrome(s: string): boolean {
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    while (l < r && !s[l].match(/[a-zA-Z0-9]/)) l++;
    while (l < r && !s[r].match(/[a-zA-Z0-9]/)) r--;

    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++;
    r--;
  }

  return true;
}
