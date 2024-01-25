/*
Implement a function that converts a nested array of nodeNames to nodes.

- if no `parent` argument has been supplied, assign `parent` to the node
  of type <html>.
- the first element in the input array is the name of the element
  to be created.
  Call document.createElement with this name as an argument, and append
  the new element to `parent`.
- the second argument represents the child nodes.
  Loop through these, recursively calling `arrayToNodes` on each,
  supplying the recently create argument as `parent`.

*/

function arrayToNodes(nodeArray, parent) {
  let newElement;
  if (nodeArray[0] === 'BODY') {
    newElement = document.body;
  } else {
    newElement = document.createElement(nodeArray[0]);
    parent.appendChild(newElement);
  }
  const children = nodeArray[1];

  for (let idx = 0; idx < children.length; idx += 1) {
    arrayToNodes(children[idx], newElement);
  }
}

// const nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];
const nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];
arrayToNodes(nodes);
