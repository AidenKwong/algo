export class Node {
  constructor(data) {
    this.data = data;
    this.children = [0, 0];
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    var newNode = new Node(data);

    if (this.root === null) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.children[0] === 0) node.children[0] = newNode;
      else this.insertNode(node.children[0], newNode);
    } else {
      if (node.children[1] === 0) node.children[1] = newNode;
      else this.insertNode(node.children[1], newNode);
    }
  }

  // remove(data)

  // Helper function
  // findMinNode()
  // getRootNode()
  // inorder(node)
  // preorder(node)
  // postorder(node)
  // search(node, data)
}
