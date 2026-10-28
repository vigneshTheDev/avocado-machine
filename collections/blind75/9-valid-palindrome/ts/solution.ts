export function isPalindrome(s: string): boolean {
  s = s.toLowerCase();

  let l = 0;
  let r = s.length - 1;

  const a = 97;
  const z = 122;
  const zero = 48;
  const nine = 57;

  const isAlphaNumeric = (c: number) =>
    (a <= c && c <= z) || (zero <= c && c <= nine);

  while (l < r) {
    if (!isAlphaNumeric(s[l].charCodeAt(0))) l++;
    else if (!isAlphaNumeric(s[r].charCodeAt(0))) r--;
    else if (s[l] !== s[r]) return false;
    else {
      l++;
      r--;
    }
  }
  return true;
}
