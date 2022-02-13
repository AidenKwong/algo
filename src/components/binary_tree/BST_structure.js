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

  // helper method that calls the
  // removeNode with a given data
  remove(data) {
    // root is re-initialized with
    // root of a modified tree.
    this.root = this.removeNode(this.root, data);
  }

  // Method to remove node with a
  // given data
  // it recur over the tree to find the
  // data and removes it
  removeNode(node, key) {
    // if the root is null then tree is
    // empty
    if (node === null) return null;
    // if data to be delete is less than
    // roots data then move to children[0] subtree
    else if (key < node.data) {
      node.children[0] = this.removeNode(node.children[0], key);
      return node;
    }

    // if data to be delete is greater than
    // roots data then move to children[1] subtree
    else if (key > node.data) {
      node.children[1] = this.removeNode(node.children[1], key);
      return node;
    }

    // if data is similar to the root's data
    // then delete this node
    else {
      // deleting node with no children
      if (node.children[0] === 0 && node.children[1] === 0) {
        node = 0;
        return node;
      }

      // Deleting node with two children
      // minimum node of the children[1] subtree
      // is stored in aux
      var aux = this.findMinNode(node.children[1]);
      node.data = aux.data;

      node.children[1] = this.removeNode(node.children[1], aux.data);
      return node;
    }
  }

  // Helper function
  // finds the minimum node in tree
  // searching starts from given node
  findMinNode(node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.children[0] === 0) return node;
    else return this.findMinNode(node.left);
  }

  // getRootNode()
  // inorder(node)
  // preorder(node)
  // postorder(node)
  // search(node, data)
}
