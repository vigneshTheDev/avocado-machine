import { ListNode } from "../../support";
export function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  const out: ListNode = new ListNode(0);
  let curr = out;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }
  if (list1) curr.next = list1;
  if (list2) curr.next = list2;
  return out.next;
}
