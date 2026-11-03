export function isValid(s: string): boolean {
  const openToClose: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const stack = [];
  for (let c of s) {
    if (c in openToClose) {
      stack.push(c);
      continue;
    }

    const tos = stack.pop();
    if (tos == null || openToClose[tos] !== c) return false;
  }
  return stack.length === 0;
}
