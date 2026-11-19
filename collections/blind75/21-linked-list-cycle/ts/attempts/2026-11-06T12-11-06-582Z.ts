import type { ListNode } from "../../support";
export function hasCycle(head: ListNode | null): boolean {
  let slowPointer = head;
  let fastPointer = head;

  while (fastPointer) {
    fastPointer = fastPointer.next && fastPointer.next.next;
    slowPointer = slowPointer && slowPointer.next;
    if (slowPointer && slowPointer === fastPointer) return true;
  }
  return false;
}
