import type { TreeNode } from "../../support";
export function maxDepth(root: TreeNode | null): number {
  return dfs(root);
}

function dfs(node: TreeNode | null): number {
  if (node == null) return 0;

  return 1 + Math.max(dfs(node.left), dfs(node.right));
}
