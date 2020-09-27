const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timer = document.getElementById("timer")
const score = document.getElementById("score")
const initials = document.getElementById("initials")

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

let shuffledQuestions, currentQuestionIndex

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'In what year did the Cavaliers beat the Warriors in the Finals?',
    answers: [
      { text: '2016', correct: true },
      { text: '2015', correct: false },
      { text: '2017', correct: false },
      { text: '2018', correct: false }
    ]
  },
  
  {
    question: 'Who was the first pick in the 2009 NBA Draft?',
    answers: [
      { text: 'Blake Griffin', correct: true },
      { text: 'James Harden', correct: false },
      { text: 'Stephen Curry', correct: false },
      { text: 'Kyrie Irving', correct: false }
    ]
  },

  {
    question: 'Who won Most Improved Player in 2018?',
    answers: [
      { text: 'Victor Oladipo', correct: true },
      { text: 'Pascal Siakam', correct: false },
      { text: 'Giannis Antetokounmpo', correct: false },
      { text: 'Jimmy Butler', correct: false }
    ]
  },

  {
    question: 'What position did Steve Nash play in the NBA?',
    answers: [
      { text: 'Point Guard', correct: true },
      { text: 'Center', correct: false },
      { text: 'Shooting Guard', correct: false },
      { text: 'Small Foward', correct: false }
    ]
  }
]