interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

interface BinaryTree<T> {
  root: TreeNode<T> | null;
}

function createTreeNode<T>(value: T): TreeNode<T> {
  return { value, left: null, right: null };
}

function insertNode<T>(tree: BinaryTree<T>, value: T): BinaryTree<T> {
  if (tree.root === null) {
    tree.root = createTreeNode(value);
  } else {
    const newNode = createTreeNode(value);
    const insertNodeRecursive = (node: TreeNode<T> | null): TreeNode<T> | null => {
      if (node === null) {
        return newNode;
      } else if (value < node.value) {
        node.left = insertNodeRecursive(node.left);
      } else {
        node.right = insertNodeRecursive(node.right);
      }
      return node;
    };
    tree.root = insertNodeRecursive(tree.root);
  }
  return tree;
}

function inOrderTraversal<T>(tree: BinaryTree<T>): T[] {
  const result: T[] = [];
  const traverseNode = (node: TreeNode<T> | null): void => {
    if (node !== null) {
      traverseNode(node.left);
      result.push(node.value);
      traverseNode(node.right);
    }
  };
  traverseNode(tree.root);
  return result;
}

function preOrderTraversal<T>(tree: BinaryTree<T>): T[] {
  const result: T[] = [];
  const traverseNode = (node: TreeNode<T> | null): void => {
    if (node !== null) {
      result.push(node.value);
      traverseNode(node.left);
      traverseNode(node.right);
    }
  };
  traverseNode(tree.root);
  return result;
}

function postOrderTraversal<T>(tree: BinaryTree<T>): T[] {
  const result: T[] = [];
  const traverseNode = (node: TreeNode<T> | null): void => {
    if (node !== null) {
      traverseNode(node.left);
      traverseNode(node.right);
      result.push(node.value);
    }
  };
  traverseNode(tree.root);
  return result;
}

const tree: BinaryTree<number> = { root: null };
insertNode(tree, 5);
insertNode(tree, 2);
insertNode(tree, 8);
insertNode(tree, 3);
insertNode(tree, 9);
console.log(inOrderTraversal(tree));
console.log(preOrderTraversal(tree));
console.log(postOrderTraversal(tree));
