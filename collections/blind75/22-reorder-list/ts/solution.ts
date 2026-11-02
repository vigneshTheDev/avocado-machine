import type { ListNode } from "../../support";
export function reorderList(head: ListNode | null): void {
  if (!head) return;

  let slow: ListNode | null = head;
  let fast = head.next;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  let curr = slow!.next;
  let prev: ListNode | null = null;
  slow!.next = null;

  while (curr) {
    const next = curr.next;
    curr.next = prev;

    prev = curr;
    curr = next;
  }

  let list1: ListNode | null = head;
  let list2 = prev;
  while (list1 && list2) {
    const next1: ListNode | null = list1.next;
    const next2: ListNode | null = list2.next;

    list1.next = list2;
    list2.next = next1;

    list1 = next1;
    list2 = next2;
  }
}
