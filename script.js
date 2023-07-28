'use strict';
const questions = [
  {
    question: 'Brass gets discoloured in air because of the presence of which of the following gases in air',
    options: [
      'Oxygen',
      'Hydrogen Sulphide',
      'Carbon dioxide',
      'Nitrogen'
    ],
    answer: 'Hydrogen Sulphide'
  },

  {
    question: ' Which of the following is a non metal that remains liquid at room temperature',
    options: [
      'Phosphorous',
      'Chlorine',
      'Bromine',
      'Helium'
    ],
    answer: 'Bromine'
  },

  {
    question: 'Chlorophyll is a naturally occurring chelate compound in which central metal is',
    options: [
      'Magnesium',
      'Copper',
      'Iron',
      'Calcium'
    ],
    answer: 'Magnesium'
  },

  {
    question: 'Which of the following is used in pencils',
    options: [
      'Graphite',
      'Silicon',
      'Charcoal',
      'Phosphorous'
    ],
    answer: 'Graphite'
  },

  {
    question: ' Which of the following metals forms an amalgam with other metals',
    options: [
      'Tin',
      'Mercury',
      'Lead',
      'Zinc'
    ],
    answer: 'Mercury'
  },
];


const questionElement = document.querySelector('.question');
const nextBtn = document.querySelector('.submit-next');
const formElement = document.querySelector('.quiz-form');

let index = 0;  // this is current question index
let score = 0;
let optionElement;
let radioButtons;
let currentQuestion;
let selectedOption;

// DISplay questions

const displayQuestions = function () {

  currentQuestion = questions[index];
  let currentQuestionNo = index + 1;
  
  // ADDING QUESTION TO THE APP
  questionElement.innerHTML = currentQuestionNo + '.' + currentQuestion.question +' '+ '?';
  questionElement.style.display = 'block';
  questionElement.style.fontSize ='1.3rem';

  // ADDING OPTIONS TO THE APP
  currentQuestion.options.forEach((option, i) => {


    const html = `
    <div class="options" >
    <div class="option-container">
    <input type="radio" id="option-${i + 1}" name="option" class="radio-btn" value="${option}">
    <label for="option-${i + 1}" class="option" >${option}</label> 
    </div>
    </div>
    `;
    formElement.insertAdjacentHTML('beforeend', html);

  });

  optionElement = document.querySelectorAll('.option-container');
  radioButtons = document.querySelectorAll('.radio-btn');
  // return currentQuestion;
};

const startQuiz = function () {
  index = 0;
  score = 0;
  nextBtn.innerHTML = 'Next&rarr;'
  displayQuestions();
};
startQuiz();


// Displaying Correct answer when user selects wrong option
const displayCorrectAnswer = function () {
  optionElement.forEach(option => {
    const childElement = option.querySelector('*');

    if (childElement.value === questions[index].answer)
      option.classList.add('right-input');

  });
};

// DISABLE RADIO BUTTONS
const disableRadioButtons = function () {
  radioButtons.forEach(btn => btn.disabled = true);
};


// Adding event listener to radio button
formElement.addEventListener('click', function (e) {
  e.preventDefault();
  const radioBtn = e.target.closest('.radio-btn');
  selectedOption = e.target.closest('.option-container');

  if (radioBtn) {
    if (radioBtn.value === currentQuestion.answer) {
      selectedOption.classList.add('right-input');
      score++;
    }
    else {
      selectedOption.classList.add('wrong-input');
      displayCorrectAnswer();
    }
    disableRadioButtons();
  }
});

const resetQuestions = function () {
  questionElement.style.display = 'none';
  document.querySelectorAll('.options').forEach(option => option.style.display = 'none');
};

const displayScore = function () {
  resetQuestions();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  questionElement.style.display = 'block';
  questionElement.style.fontSize ='3rem';
  nextBtn.innerHTML = 'Play Again';
  nextBtn.style.display = 'block';
};

const handleNextBtn = function () {
  index++;
  if (index < questions.length) {
    resetQuestions();
    displayQuestions();
  }
  else {
    displayScore();
  }
};

// Adding Event Listener to Next buttton
nextBtn.addEventListener('click', function (e) {

  if (index < questions.length) {
    handleNextBtn();
  }
  else {
    startQuiz();
  }
});
