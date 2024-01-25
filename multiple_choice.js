const questions = [
  {
    id: 1,
    description: "What do deets do first thing in the morning?",
    options: ['Take a shower', 'Get dressed', 'CCB', 'Do 20 push ups'],
  },
  {
    id: 2,
    description: "What place is number one deet favorite in the summer?",
    options: ['Santa Fe', 'The library', 'The beach', 'From the Ground'],
  },
  {
    id: 3,
    description: 'What is the etymology of the word "deet"?',
    options: [
      'It comes from insect repellent (long story)',
      'Dearest and Tenderest Love',
      "It's the sound car horns make when deets pass by"
    ],
  },
  {
    id: 4,
    description: 'When deets have a difficult decision to make, they schedule a:',
    options: ['Meeting', 'Brainstorm sesh', 'Conference'],
  },
  {
    id: 5,
    description: 'The adjective form of "deet" is:',
    options: ['Deetish', 'Deetly', 'Deety', 'Deetlike'],
  }
];

const answerKey = {
  1: 'CCB',
  2: 'From the Ground',
  3: 'Dearest and Tenderest Love',
  4: 'Conference',
  5: 'Deetly',
};

function Quiz() {
  this.questionTemplate = Handlebars.compile(document.getElementById('question_template').innerHTML);
  this.renderQuestions();
  this.bindEvents();
  this.questions = document.getElementsByClassName('question');
}

Quiz.prototype = {
  renderQuestions() {
    questions.forEach(question => {
      document.querySelector('fieldset')
        .insertAdjacentHTML('beforeend', this.questionTemplate(question));
    });
  },

  handleSubmit(e) {
    e.preventDefault();
    document.getElementById('submit').disabled = true;
    document.getElementById('reset').disabled = false;
    this.checkAnswers();
  },

  handleReset(e) {
    let results = document.getElementsByClassName('result');
    [...results].forEach(res => {
      res.setAttribute('class', 'result');
      res.textContent = '';
    });
    document.getElementById('submit').disabled = false;
    document.getElementById('reset').disabled = true;
  },

  checkAnswers() {
    [...this.questions].forEach(question => {
      let status;
      let id = question.dataset.id;
      let answer = question.querySelector('input:checked');
      if (!answer) {
        status = 'unanswered';
      } else if (answer.value === answerKey[id]) {
        status = 'correct';
      } else {
        status = 'incorrect';
      }

      question.querySelector('.result').classList.add(status);
    });

    this.renderResults();
  },

  renderResults() {
    [...this.questions].forEach(question => {
      let result = question.querySelector('.result');
      let id = question.dataset.id;
      let message;
      if (result.classList.contains('unanswered')) {
        message = `The correct answer is: "${answerKey[id]}"`;
      } else if (result.classList.contains('correct')) {
        message = "Good job, that's correct!";
      } else if (result.classList.contains('incorrect')) {
        message = `Wrong answer. Correct answer is: "${answerKey[id]}"`;
      }

      result.textContent = message;
    });
  },

  bindEvents() {
    let form = document.querySelector('form');
    form.addEventListener('submit', this.handleSubmit.bind(this));
    form.addEventListener('reset', this.handleReset.bind(this));
  },
};

new Quiz();
