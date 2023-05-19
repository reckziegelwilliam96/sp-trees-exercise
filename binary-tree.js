class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) {
      return 0;
    }

    function dfs(node) {
      if (!node) {
        return Infinity;
      }
      if (!node.left && !node.right) {
        return 1;
      }
      return Math.min(dfs(node.left), dfs(node.right)) + 1;
    }

    return dfs(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) {
      return 0;
    }

    function dfs(node) {
      if (!node) {
        return 0;
      }
      const leftDepth = dfs(node.left);
      const rightDepth = dfs(node.right);
      return Math.max(leftDepth, rightDepth) + 1;
    }

    return dfs(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) {
      return 0;
    }

    let maxSum = -Infinity;

    function dfs(node) {
      if (!node) {
        return 0;
      }
      const leftSum = Math.max(0, dfs(node.left));
      const rightSum = Math.max(0, dfs(node.right));
      const currentSum = node.val + leftSum + rightSum;
      maxSum = Math.max(maxSum, currentSum);
      return node.val + Math.max(leftSum, rightSum);
    }

    dfs(this.root);

    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) {
      return null;
    }

    let nextLargerValue = Infinity;

    function dfs(node) {
      if (!node) {
        return;
      }
      if (node.val > lowerBound && node.val < nextLargerValue) {
        nextLargerValue = node.val;
      }
      dfs(node.left);
      dfs(node.right);
    }

    dfs(this.root);

    return nextLargerValue === Infinity ? null : nextLargerValue;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e., are at the same level but have different parents). */

  areCousins(node1, node2) {
    if (!this.root) {
      return false;
    }

    function dfs(node, parent, level, target) {
      if (!node) {
        return;
      }
      if (node === target) {
        return { parent, level };
      }
      const result = dfs(node.left, node, level + 1, target);
      if (result) {
        return result;
      }
      return dfs(node.right, node, level + 1, target);
    }

    const node1Info = dfs(this.root, null, 0, node1);
    const node2Info = dfs(this.root, null, 0, node2);

    return node1Info && node2Info && node1Info.level === node2Info.level && node1Info.parent !== node2Info.parent;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    if (!tree.root) {
      return '';
    }

    function dfs(node) {
      if (!node) {
        return 'null';
      }
      const leftSerialized = dfs(node.left);
      const rightSerialized = dfs(node.right);
      return `${node.val},${leftSerialized},${rightSerialized}`;
    }

    return dfs(tree.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree || stringTree === 'null') {
      return new BinaryTree();
    }

    const values = stringTree.split(',');

    function buildTree() {
      const value = values.shift();
      if (value === 'null') {
        return null;
      }
      const node = new BinaryTreeNode(parseInt(value));
      node.left = buildTree();
      node.right = buildTree();
      return node;
    }

    const root = buildTree();

    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    if (!this.root || !this.isInTree(this.root, node1) || !this.isInTree(this.root, node2)) {
      return null;
    }

    function dfs(node, node1, node2) {
      if (!node || node === node1 || node === node2) {
        return node;
      }
      const left = dfs(node.left, node1, node2);
      const right = dfs(node.right, node1, node2);
      if (left && right) {
        return node;
      }
      return left || right;
    }

    return dfs(this.root, node1, node2);
  }

  /** Helper method to check if a node is in the binary tree. */

  isInTree(node, target) {
    if (!node) {
      return false;
    }
    if (node === target) {
      return true;
    }
    return this.isInTree(node.left, target) || this.isInTree(node.right, target);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
