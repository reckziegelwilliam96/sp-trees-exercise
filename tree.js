class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) {
      return 0;
    }

    let sum = 0;

    function dfs(node) {
      sum += node.val;
      for (let child of node.children) {
        dfs(child);
      }
    }

    dfs(this.root);

    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) {
      return 0;
    }

    let count = 0;

    function dfs(node) {
      if (node.val % 2 === 0) {
        count++;
      }
      for (let child of node.children) {
        dfs(child);
      }
    }

    dfs(this.root);

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) {
      return 0;
    }

    let count = 0;

    function dfs(node) {
      if (node.val > lowerBound) {
        count++;
      }
      for (let child of node.children) {
        dfs(child);
      }
    }

    dfs(this.root);

    return count;
  }
}

module.exports = { Tree, TreeNode };
