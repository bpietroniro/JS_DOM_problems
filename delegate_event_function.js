// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

// Possible callback for use with the scenarios
const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

function delegateEvent(parentElement, selector, eventType, callback) {
  if (!(parentElement && parentElement instanceof Element) {
    return undefined;
  }

  parentElement.addEventListener(eventType, function(event) {
    if (event.target.matches(selector) && event.target !== this) {
      callback(event);
    }
  });

  return true;
}

// delegateEvent(element1, 'p', 'click', callback);
// delegateEvent(element2, 'p', 'click', callback);
// delegateEvent(element2, 'h1', 'click', callback);
// delegateEvent(element3, 'h1', 'click', callback);
// delegateEvent(element3, 'aside p', 'click', callback);
// delegateEvent(element2, 'p', 'click', callback);

