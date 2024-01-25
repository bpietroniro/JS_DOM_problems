/*
Implement a function, sliceTree, that is "similar" to the Array.prototype.slice method, but this time for a DOM tree. The sliceTree function takes two arguments: the start index which is the parent node's id attribute and, the end index which is the innermost child node's id attribute. The function returns an array of tagNames. Take note of the following when implementing the sliceTree function:

- It's similar to slice but different in the sense that slice isn't inclusive on the right hand side.
- The end index doesn't have to be the id of the "innermost" child node as some of the examples suggest.
- Only consider element nodes.
- Only elements that have body as an ancestor (parent, grandparent, etc.) are sliceable.
- If the id attribute of the start or end index is not in the DOM, return undefined.
- If the slice is not feasible — there's no path connecting the element at the starting index to the ending index — return undefined.

APPROACH
- first, check whether the start and end nodes exist in the DOM; if either doesn't, return undefined
- (maybe we're not supposed to do this?) check that body contains start and start contains end; if not, return undefined
- start from the innermost node by finding the element with the "end" id attribute
- sequentially "shift" the current node's tag name to an output array
- set the current node to the current node's parent element
  - stop after the "start" id attribute has been found and that tag name has been added to the array
  - if we get to "body" without having found a node with the "start" id, return undefined
*/

function sliceTree(startId, endId) {
  let startNode = document.getElementById(startId);
  let endNode = document.getElementById(endId);
  if (!(startNode && endNode)) {
    return undefined;
  }
  if (!(document.body.contains(startNode) && document.body.contains(endNode))) {
    return undefined;
  }

  const result = [];
  let currentNode = endNode;
  while (currentNode !== document.body) {
    result.unshift(currentNode.tagName);
    if (currentNode.id === String(startId)) break;
    currentNode = currentNode.parentElement;
    if (currentNode === document.body) return undefined;
  }

  return result;
}

// second solution
function sliceTree(start, end) {
  let startEl = document.getElementById(start);
  let endEl = document.getElementById(end);
  
  if (!(startEl && endEl)) return;
  let slice = [];
  let currentEl = endEl;
  let pathFound = false;
  
  do {
    slice.push(currentEl.tagName);
    if (currentEl.id === String(start)) {
      pathFound = true;
      break;
    }
    currentEl = currentEl.parentElement;
  } while (currentEl.tagName !== 'BODY');
  
  return pathFound ? slice.reverse() : undefined;
}

console.log(sliceTree(1, 4));
console.log(sliceTree(1, 76));
console.log(sliceTree(2, 5));
console.log(sliceTree(5, 4));
console.log(sliceTree(1, 23));
console.log(sliceTree(1, 22));
console.log(sliceTree(11, 19));
