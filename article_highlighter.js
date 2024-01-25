const navLinks = document.querySelector('ul');
const main = document.querySelector('main');

function highlightElement(selectedElement) {
  let currentHighlightedElement = document.getElementsByClassName('highlight')[0];

  if (currentHighlightedElement !== selectedElement) {
    if (currentHighlightedElement) {
      currentHighlightedElement.classList.remove('highlight');
    }
    selectedElement.classList.add('highlight');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', event => {
    event.stopPropagation();

    let selectedElement;
    switch (event.target.nodeName) {
      case ('A'):
        selectedElement = document.querySelector(event.target.getAttribute('href'));
        break;
      case ('ARTICLE'):
        selectedElement = event.target;
        break;
      case ('H2'):
      case ('P'):
        selectedElement = event.target.parentElement;
        break;
      default:
        selectedElement = main;
    }

    highlightElement(selectedElement);
  });
});
