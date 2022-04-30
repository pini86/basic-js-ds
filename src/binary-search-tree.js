const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    function adder (node, value) {
      if (!node) {
        return new Node( value );
      } else if ( value < node.data ) {
        node.left = adder( node.left, value );
      } else {
        node.right = adder( node.right, value );
      } 
      return node
    }
    this.tree = adder( this.tree, data );
  }

  has(data) {
    return this.find( data ) != null;
  }

  find(data) {
    let node = this.tree;
    while ( node ) {
      if ( data < node.data ) {//влево
        node = node.left;
      } else if ( data > node.data ) {//вправо
        node = node.right;
      } else {
        return node;//приехали
      }
    }
    return null;
  }
 
  remove(data) {
    this.tree = delNode(this.tree, data);
    function delNode(node, value) {
      if (!node) {
        return null;
      }
      if (value < node.data) {
        node.left = delNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = delNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {//лист
           return null;
        }
        if (!node.left) {//нет левого
          node = node.right; 
          return node; 
        }
        if (!node.right) {//нет праввого
          node = node.left;
          return node;
        }
        let maxiLeft = node.left; //наибольший слева
        while (maxiLeft.right) {
           maxiLeft = maxiLeft.right;
        }
        node.data = maxiLeft.data; 
        node.left = delNode(node.left, maxiLeft.data); 
        return node;
      }
    }
  }

  min() {
    if (!this.tree) {
      return;
    }
    let node = this.tree;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.tree) {
      return;
    }
    let node = this.tree;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};