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
      explanation: "The <title> HTML element defines the document's title that is shown in a browser's title bar or a page's tab.",
    },
    {
      text: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", isCorrect: true },
        { text: "Colorful Style Sheets", isCorrect: false },
        { text: "Creative Style Systems", isCorrect: false },
        { text: "Computer Style Sheets", isCorrect: false },
      ],
      explanation: "CSS is the acronym of “Cascading Style Sheets”. CSS is a computer language for laying out and structuring web pages (HTML or XML).",
    },
    {
      text: "How do you create a function in JavaScript?",
      answers: [
        { text: "function myFunction() {}", isCorrect: true },
        { text: "def myFunction() {}", isCorrect: false },
        { text: "function:myFunction() {}", isCorrect: false },
        { text: "create myFunction() {}", isCorrect: false },
      ],
      explanation: "To create a function, we must first declare it and give it a name, the same way we'd create any variable, and then we follow it by a function definition: var sayHello = function() { };",
    },
    {
      text: "Which of these is NOT a valid HTML5 input type?",
      answers: [
        { text: "date", isCorrect: false },
        { text: "email", isCorrect: false },
        { text: "number", isCorrect: false },
        { text: "string", isCorrect: true },
      ],
      explanation: " This is that case when it's hard to remember all the input types, you can always have a look on it here: https://www.w3schools.com/html/html_form_input_types.asp",
    },
    {
      text: "Which of the following is not a reserved word in JavaScript?",
      answers: [
        { text: "interface", isCorrect: false },
        { text: "program", isCorrect: true },
        { text: "throws", isCorrect: false },
        { text: "short", isCorrect: false },
      ],
      explanation: "In JavaScript you cannot use certain words as variables, labels, or function names. You can have a look on them here: https://www.w3schools.com/js/js_reserved.asp",
    },
  ];

let shuffledQuestions, currentQuestionIndex;

startQuiz();

function startQuiz() {
  // Shuffle the questions randomly
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
// Additional functions for handling the user's answer selection and providing feedback
  function showQuestion(question) {
    questionElement.innerText = question.text;
    answerOptionsElement.innerText = "";
  
    shuffleArray(question.answers);
  
    question.answers.forEach((answer) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("answer");
      button.addEventListener("click", () => selectAnswer(button));
      li.appendChild(button);
      answerOptionsElement.appendChild(li);
    });

    if (!document.getElementById("nextQuestionButton")) {
        // Create and add the next question button
        const nextQuestionButton = document.createElement("button");
        nextQuestionButton.innerText = "Next Question";
        nextQuestionButton.classList.add("control_button");
        nextQuestionButton.id = "nextQuestionButton";
        nextQuestionButton.disabled = true;
        quizContainer.appendChild(nextQuestionButton);
    }

    if (!document.getElementById("submitAnswerButton")) {
        // Create and add the submit button
        const submitButton = document.createElement("button");
        submitButton.innerText = "Submit";
        submitButton.id = "submitAnswerButton";
        submitButton.classList.add("control_button")
        submitButton.disabled = true;
        submitButton.addEventListener("click", submitAnswer);
        quizContainer.insertBefore(submitButton, quizContainer.lastElementChild);
    }
  
    nextQuestionButton.disabled = true;
  }

function selectAnswer(button) {
    const answerButtons = document.querySelectorAll(".answer");
    answerButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    document.getElementById("submitAnswerButton").disabled = false;
}

function submitAnswer() {
    const answerButtons = document.querySelectorAll(".answer");
    const selectedButton = document.querySelector(".selected");
    selectedButton.classList.remove("selected");
    const selectedIndex = Array.from(answerButtons).indexOf(selectedButton);
    const selectedAnswer = questions[currentQuestionIndex].answers[selectedIndex];

    answerButtons.forEach((button, index) => {
        const answer = questions[currentQuestionIndex].answers[index];
        button.classList.add(answer.isCorrect ? "correct" : "wrong");
        button.disabled = true;
    });

    shuffledQuestions[currentQuestionIndex].userAnswer = selectedAnswer.isCorrect;
    document.getElementById("submitAnswerButton").disabled = true;
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

    quizContainer.innerText = "";
    quizContainer.appendChild(scoreMessage);
}