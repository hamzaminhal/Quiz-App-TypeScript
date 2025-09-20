//      Quiz Application

let questionElement = document.querySelector("#question") as HTMLElement;
let optionsElement = document.querySelector("#options") as HTMLElement;
let nextQuestionBtn = document.querySelector(
  "#next-question"
) as HTMLButtonElement;
let endQuizBtn = document.querySelector("#end-quiz") as HTMLButtonElement;
let quizPart = document.querySelector("#quiz-part") as HTMLElement;
let resultPart = document.querySelector("#result-part") as HTMLElement;
let restartQuizBtn = document.querySelector("#restart") as HTMLElement;
let scoreDiv = document.querySelector("#score") as HTMLElement;
let msgBox = document.querySelector("#msg") as HTMLElement;
let timeElement = document.querySelector("#timer") as HTMLElement;
let totalTime: number = 10;
let currentQuestion: number = 0;
let userAns: string | number | null = null;
let score: number = 0;

// QUESTIONS ARRAY
interface questionsI {
  question: string;
  options: string[] | number[];
  correctOption: string | number;
}

const questions: questionsI[] = [
  {
    question: "What is the capital of France?",
    options: ["Rome", "Paris", "Madrid", "Berlin"],
    correctOption: "Paris",
  },
  {
    question: "How many legs does a spider have?",
    options: [6, 8, 10, 4],
    correctOption: 8,
  },
  {
    question: "What planet do we live on?",
    options: ["Mars", "Earth", "Venus", "Jupitar"],
    correctOption: "Earth",
  },
  {
    question: "What color are bananas when they are ripe?",
    options: ["Orange", "Yellow", "Blue", "Red"],
    correctOption: "Yellow",
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Monkey", "Lion", "Girraf", "Cow"],
    correctOption: "Lion",
  },
];

// FUNCTION TO DISABLE BUTTONS

// const disableBtn = (btn) => {
//   btn.disable = true;
// };

// TIMER
function timer() {
  nextQuestionBtn.addEventListener("click", () => {
    clearInterval(time);
  });
  totalTime = 10;
  let time = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(time);
      if (currentQuestion == questions.length - 1) {
        endQuiz();
      } else {
        nextQuestion();
      }
    } else {
      timeElement.textContent = totalTime.toString();
      totalTime--;
    }
  }, 1000);
}

//   FUNCTION TO SHOW QUESTIONS

function showQuestion() {
  timer();
  let { question, options } = questions[currentQuestion] as questionsI;
  questionElement.textContent = currentQuestion + 1 + ". " + question;
  optionsElement.innerHTML = "";
  options.map((option) => {
    optionsElement.innerHTML += `<div class="option">${option}</div>`;
  });
  let displayOptions = document.querySelectorAll(".option") as NodeList;
  displayOptions.forEach((element) => {
    element.addEventListener("click", () => {
      nextQuestionBtn.disabled = false;
      endQuizBtn.disabled = false;
      userAns = element.textContent;
      if (element instanceof HTMLElement) {
        element.classList.add("active");
      }
      // element.classList.add("active");
      displayOptions.forEach((opt) => {
        if (opt.textContent != userAns) {
          if (opt instanceof HTMLElement) {
            opt.classList.remove("active");
          }
          // opt.classList.remove("active");
        }
      });
    });
  });
}

showQuestion();

// FUNCTION TO SAVE ANSWER

function saveAns() {
  let { correctOption } = questions[currentQuestion] as questionsI;
  if (userAns == correctOption) {
    score += 10;
  }
}

//   FUNCTION FOR NEXT QUESTION BUTTON

const nextQuestion = () => {
  if (currentQuestion < questions.length - 1) {
    nextQuestionBtn.disabled = true;
    saveAns();
    currentQuestion++;
    showQuestion();
  }
  if (currentQuestion == questions.length - 1) {
    endQuizBtn.classList.remove("display-none");
    endQuizBtn.disabled = true;
    nextQuestionBtn.classList.add("display-none");
  }
};

nextQuestionBtn.addEventListener("click", () => {
  nextQuestion();
});

// FUNCTION FOR END QUIZ BUTTON

const endQuiz = () => {
  saveAns();
  quizPart.classList.add("display-none");
  resultPart.classList.remove("display-none");
  scoreDiv.innerHTML = `
  <div>Your Total score is ${score}</div>`;
  let scorePercent = (score / (questions.length * 10)) * 100;

  if (scorePercent > 50) {
    msgBox.textContent = "You are Brilliant Student";
    msgBox.classList.add("green");
    msgBox.classList.remove("red");
  } else {
    msgBox.classList.remove("green");
    msgBox.classList.add("red");
    msgBox.textContent = "You need to improve! Retake Quiz ";
  }
};

endQuizBtn.addEventListener("click", () => {
  endQuiz();
});

// RESTART QUIZ FUNCTION

restartQuizBtn.addEventListener("click", () => {
  userAns = null;
  currentQuestion = 0;
  score = 0;
  quizPart.classList.remove("display-none");
  resultPart.classList.add("display-none");
  endQuizBtn.classList.add("display-none");
  nextQuestionBtn.classList.remove("display-none");
  nextQuestionBtn.disabled = true;
  showQuestion();
});
