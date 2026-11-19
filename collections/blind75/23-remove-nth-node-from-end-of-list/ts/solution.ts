import { ListNode } from "../../support";
export function removeNthFromEnd(
  head: ListNode | null,
  n: number,
): ListNode | null {
  const dummyHead = new ListNode(0);
  dummyHead.next = head;

  let curr = head;
  for (let i = 0; i < n; i++) {
    if (!curr) return head;

    curr = curr.next || null;
  }

  let l: ListNode | null = dummyHead;
  let r: ListNode | null = curr;

  while (r) {
    l = l.next!;
    r = r.next;
  }

  const next = l.next;
  l.next = next?.next || null;
  return dummyHead.next;
}
