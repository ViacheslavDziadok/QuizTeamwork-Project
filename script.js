const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerOptionsElement = document.getElementById("answer-options");
const nextQuestionButton = document.getElementById("next-question");

const questions = [
    {
      text: "Which HTML element is used to specify a title for a document?",
      answers: [
        { text: "<title>", isCorrect: true },
        { text: "<head>", isCorrect: false },
        { text: "<meta>", isCorrect: false },
        { text: "<header>", isCorrect: false },
      ],
    },
    {
      text: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", isCorrect: true },
        { text: "Colorful Style Sheets", isCorrect: false },
        { text: "Creative Style Systems", isCorrect: false },
        { text: "Computer Style Sheets", isCorrect: false },
      ],
    },
    {
      text: "How do you create a function in JavaScript?",
      answers: [
        { text: "function myFunction()", isCorrect: true },
        { text: "def myFunction()", isCorrect: false },
        { text: "function:myFunction()", isCorrect: false },
        { text: "create myFunction()", isCorrect: false },
      ],
    },
    {
      text: "Which of these is NOT a valid HTML5 input type?",
      answers: [
        { text: "date", isCorrect: false },
        { text: "email", isCorrect: false },
        { text: "number", isCorrect: false },
        { text: "url", isCorrect: false },
      ],
    },
    {
      text: "Which of the following is not a reserved word in JavaScript?",
      answers: [
        { text: "interface", isCorrect: false },
        { text: "program", isCorrect: true },
        { text: "throws", isCorrect: false },
        { text: "short", isCorrect: false },
      ],
    },
  ];

let shuffledQuestions, currentQuestionIndex;

startQuiz();

function startQuiz() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  showNextQuestion();
}

function showNextQuestion() {
  if (currentQuestionIndex === shuffledQuestions.length) {
    showFinalScore();
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

nextQuestionButton.addEventListener("click", () => {
currentQuestionIndex++;
showNextQuestion();
});

// Additional functions for handling the user's answer selection and providing feedback
function showQuestion(question) {
    questionElement.innerText = question.text;
    answerOptionsElement.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer");
        button.addEventListener("click", () => selectAnswer(button, answer, index));
        li.appendChild(button);
        answerOptionsElement.appendChild(li);
    });
    nextQuestionButton.disabled = true;
}

function selectAnswer(button, answer, index) {
    const answerButtons = document.querySelectorAll(".answer");
        answerButtons.forEach((btn) => {
        btn.disabled = true;
        if (btn === button) {
            btn.classList.add(answer.isCorrect ? "correct" : "wrong");
        }
    });
    nextQuestionButton.disabled = false;
}

function showFinalScore() {
    const correctAnswers = shuffledQuestions.filter(
    (question) => question.userAnswer === true
    ).length;
    const score = (correctAnswers / shuffledQuestions.length) * 100;

    const scoreMessage = document.createElement("p");
    if (score >= 80) {
        scoreMessage.innerText = `You are a genius! Your score is ${score}%`;
    } else if (score >= 50) {
        scoreMessage.innerText = `Good job! Your score is ${score}%`;
    } else {
        scoreMessage.innerText = `You seem to have a bad day. Your score is ${score}%`;
    }

    quizContainer.innerHTML = "";
    quizContainer.appendChild(scoreMessage);
}