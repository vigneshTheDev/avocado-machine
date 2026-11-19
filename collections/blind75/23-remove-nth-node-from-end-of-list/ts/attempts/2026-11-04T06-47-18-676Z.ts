import type { ListNode } from "../../support";
export function removeNthFromEnd(
  head: ListNode | null,
  n: number,
): ListNode | null {
  let len = 0;
  let curr = head;
  while (curr) {
    len++;
    curr = curr.next;
  }

  const pos = len - n;
  curr = head;
  let prev: ListNode | null = null;
  let i = 0;
  while (curr) {
    if (i !== pos) {
      prev = curr;
      curr = curr.next;
      i++;
      continue;
    }
    if (prev) prev.next = curr.next;
    if (head === curr) head = curr.next;
    return head
  }
}
