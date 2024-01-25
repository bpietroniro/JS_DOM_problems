/*
- consider "body" the root element
- set up a variable to track the generation we're at; start at 1
- while level is less than generation:
  - map the current "generation" array to an array containing all the children
    of each of its nodes
*/

function colorGeneration(generation) {
  if (generation === 0) return;

  let currentGeneration = [].slice.call(document.body.children);
  let level = 1;

  while (level < generation) {
    currentGeneration = currentGeneration.flatMap(node => {
      return [].slice.call(node.children);
    });
    level += 1;
  }

  currentGeneration.forEach(node => node.classList.add('generation-color'));
}

// version 2
function colorGeneration(level) {
  if (level < 1) return;

  let currentGen = [document.body];
  for (let i = 0; i < level; i += 1) {
    currentGen = currentGen.flatMap(currentGen => [...currentGen.children]);
  }
  currentGen.forEach(el => el.classList.add('generation-color'));
}
