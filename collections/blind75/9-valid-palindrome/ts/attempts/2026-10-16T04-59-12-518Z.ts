export function isPalindrome(s: string): boolean {
  const sNormalized = s.replace(/[^a-zA-Z0-9]/g, "");
  return (
    sNormalized.toLowerCase() === sNormalized.split("").reverse().join("").toLowerCase()
  );
}
