import type { TreeNode } from "../../support";
export function isSubtree(
  root: TreeNode | null,
  subRoot: TreeNode | null,
): boolean {
  if (root == null && subRoot == null) return true;
  if (root == null || subRoot == null) return false;

  if (root.val === subRoot.val)
    return (
      (dfs(root.right, subRoot.right) && dfs(root.left, subRoot.left)) ||
      isSubtree(root.left, subRoot) ||
      isSubtree(root.right, subRoot)
    );
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function dfs(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;
  return p.val === q.val && dfs(p.left, q.left) && dfs(p.right, q.right);
}
