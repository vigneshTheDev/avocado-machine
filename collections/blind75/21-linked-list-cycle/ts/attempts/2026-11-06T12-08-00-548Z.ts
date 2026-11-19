import type { ListNode } from "../../support";
export function hasCycle(head: ListNode | null): boolean {
  if (head == null) return false;

  let fastPointer: ListNode | null = head;
  let slowPointer: ListNode | null = head;

  while (slowPointer && fastPointer) {
    fastPointer = fastPointer.next?.next ?? null;
    slowPointer = slowPointer.next;
    if (slowPointer === fastPointer && slowPointer != null) return true;
  }
  return false;
}
