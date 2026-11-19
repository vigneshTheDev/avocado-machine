import type { ListNode } from "../../support";
export function hasCycle(head: ListNode | null): boolean {
  const seen = new Map<ListNode, boolean>();
  let curr = head;
  while (curr) {
    if (seen.has(curr)) return true;
    seen.set(curr, true);
    curr = curr.next
  }
  return false;
}
