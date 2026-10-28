export function isValid(s: string): boolean {
  const openToClose: Record<string, string> = {
    "[": "]",
    "(": ")",
    "{": "}",
  };

  const stack: string[] = [];
  for (let c of s) {
    if (c in openToClose) stack.push(c);
    else {
      const tos = stack.pop();
      if (tos == null || c !== openToClose[tos]) return false;
    }
  }
  return stack.length === 0;
}
