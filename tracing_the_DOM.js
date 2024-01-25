/*
- initialize an empty array
while the current node's id is greater than 1:
  - get the current node's parent
  - get a NodeList of the parent's child nodes
  - convert the NodeList to an array
  - push this array to the outer array
  - currentNode = parentNode
- return the outer array
*/

// first attempt
function domTreeTracer(id) {
  let currentNode = document.getElementById(id);
  let result = [];

  while (Number(currentNode.id) > 1) {
    let parentNode = currentNode.parentNode;
    let childrenOfParent = [].slice.call(parentNode.children);
    result.push(childrenOfParent.map(node => node.nodeName));

    currentNode = parentNode;
  }

  result.push(document.getElementById(1).nodeName);

  return result;
}

// second attempt
function domTreeTracer(id) {
  let treeArray = [];
  let element = document.getElementById(id);
  let parent;

  do {
    parent = element.parentElement;
    treeArray.push([...parent.children].map(childEl => childEl.nodeName));
    element = parent;
  } while (parent.nodeName !== 'BODY');
}

console.log(domTreeTracer(1));
console.log(domTreeTracer(2));
console.log(domTreeTracer(22));
