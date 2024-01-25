/*
Implement a function that converts the DOM, starting from the body, to nested arrays.

Each element in the DOM is represented as ["PARENT_TAG_NAME", [children]] where children are elements as well and as such follow the same format.

When an element has no children, it's represented as ["PARENT_TAG_NAME", []].

For instance, if the HTML doesn't have any elements inside the body, the result array would be: ["BODY", []].

Likewise, if the HTML only has a div element as its content, the result array would be: ["BODY", [["DIV", []]]].

ALGORITHM
1. Check if the parent element has children.
2. If the parent element has children, set the value of the children array to it
  ([parentElement, [children]]); otherwise, set it to an empty array ([parentElement, []).
3. Check if any of the children are parents.
4. If there are parents, repeat the process from step 1.
*/

function nodesToArr() {
  function nestedArrayRepresentation(node) {
    return [
      node.nodeName,
      [].slice.call(node.children)
        .map(node => nestedArrayRepresentation(node))
    ];
  }

  return nestedArrayRepresentation(document.body);
}
