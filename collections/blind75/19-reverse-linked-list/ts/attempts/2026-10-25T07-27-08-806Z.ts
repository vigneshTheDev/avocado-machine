import type { ListNode } from "../../support";
export function reverseList(head: ListNode | null): ListNode | null {
  if (head == null) return null;

  let curr: ListNode | null = head;
  let prev: ListNode | null = null;
  while (curr != null) {
    const next: ListNode | null = curr.next;
    curr.next = prev;

    prev = curr;
    curr = next;
  }
  return prev;
}
