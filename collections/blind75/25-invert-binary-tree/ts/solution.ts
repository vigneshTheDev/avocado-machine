import type { TreeNode } from "../../support";
export function invertTree(root: TreeNode | null): TreeNode | null {
  return dfs(root);
}

function dfs(node: TreeNode | null): TreeNode | null {
  if (node == null) return null;

  dfs(node.right);
  dfs(node.left);
  const right = node.right;
  const left = node.left;
  node.right = left;
  node.left = right;

  return node;
}
