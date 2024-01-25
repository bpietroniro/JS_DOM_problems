const classificationOptions = {
  All: ['Bear',  'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  Vertebrate: ['Bear',  'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  Mammal: ['Bear', 'Whale'],
  Bird: ['Ostrich'],
};

const animalOptions = {
  All: ['Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
  Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Turtle: ['Vertebrate', 'Cold-blooded'],
  Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Salmon: ['Vertebrate', 'Cold-blooded'],
  Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
};

const classificationMenu = document.getElementById('animal-classifications');
const animalMenu = document.getElementById('animals');
const clearButton = document.getElementById('clear');

function generateOptions(linkedMenu, optionList) {
  linkedMenu.length = 0;
  for (let idx = 0; idx < optionList.length; idx += 1) {
    linkedMenu[idx] = new Option(optionList[idx]);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  classificationMenu.addEventListener('change', e => {
    let selection = e.target.value;
    let classifications;
    if (selection !== 'Classifications') {
      classifications = classificationOptions[selection];
    } else {
      classifications = classificationOptions['All'];
    }
    generateOptions(animalMenu, classifications);
  });

  animalMenu.addEventListener('change', e => {
    let selection = e.target.value;
    let animals;
    if (selection !== 'Animals') {
      animals = animalOptions[selection];
    } else {
      animals = animalOptions['All'];
    }
    generateOptions(classificationMenu, animals);
  });
});
