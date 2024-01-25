// first solution
/*
function nodeSwap(a, b) {
  let nodeA = document.getElementById(a);
  let nodeB = document.getElementById(b);
  if (!(nodeA && nodeB)) return undefined;
  if (nodeA.contains(nodeB) || nodeB.contains(nodeA)) return undefined;

  let nodeBParent = nodeB.parentNode;
  let nodeBNextSibling = nodeB.nextSibling;
  nodeA.parentNode.insertBefore(nodeB, nodeA.nextSibling);
  nodeBParent.insertBefore(nodeA, nodeBNextSibling);
}
*/

// second solution; "further exploration"
function nodeSwap(a, b) {
  let nodeA = document.getElementById(a);
  let nodeB = document.getElementById(b);
  if (!(nodeA && nodeB) || nodeA.contains(nodeB) || nodeB.contains(nodeA)) {
    return;
  }

  let placeholderA = document.createElement('div');
  let placeholderB = document.createElement('div');
  nodeA.parentElement.insertBefore(placeholderA, nodeA);
  nodeB.parentElement.insertBefore(placeholderB, nodeB);

  placeholderA.insertAdjacentElement('afterend', nodeB);
  placeholderB.insertAdjacentElement('afterend', nodeA);

  placeholderA.remove();
  placeholderB.remove();
}

