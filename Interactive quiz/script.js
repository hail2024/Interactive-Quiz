const quizData = [
  {
    question: "1. Which language is used to style web pages?",
    a: "HTML",
    b: "JQuery",
    c: "CSS",
    d: "XML",
    correct: "c"
  },
  {
    question: "2. Inside which HTML element do we put JavaScript?",
    a: "<js>",
    b: "<script>",
    c: "<javascript>",
    d: "<code>",
    correct: "b"
  },
  {
    question: "3. Which of the following is a JavaScript data type?",
    a: "Number",
    b: "Boolean",
    c: "String",
    d: "All of the above",
    correct: "d"
  },
  {
    question: "4. What does DOM stand for?",
    a: "Document Object Model",
    b: "Data Object Mode",
    c: "Desktop Oriented Model",
    d: "Document Ordering Mode",
    correct: "a"
  },
  {
    question: "5. Which keyword is used to define a variable in JavaScript?",
    a: "var",
    b: "let",
    c: "const",
    d: "All of the above",
    correct: "d"
  }
];

const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const quizBox = document.querySelector('.sheet-style');

let currentQuiz = 0;
let userAnswers = [];

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentData = quizData[currentQuiz];
  questionEl.innerText = currentData.question;
  a_text.innerText = currentData.a;
  b_text.innerText = currentData.b;
  c_text.innerText = currentData.c;
  d_text.innerText = currentData.d;
}

function deselectAnswers() {
  answerEls.forEach((el) => el.checked = false);
}

function getSelected() {
  let selected;
  answerEls.forEach((el) => {
    if (el.checked) {
      selected = el.id;
    }
  });
  return selected;
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected();
  if (answer) {
    userAnswers.push({
      question: quizData[currentQuiz].question,
      selected: quizData[currentQuiz][answer]
    });

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showAnswers();
    }
  }
});

function showAnswers() {
  let resultHTML = `
    <h2>📝 Your Quiz Responses</h2>
    <div style="text-align: left; margin-top: 20px;">
  `;

  userAnswers.forEach((ans, index) => {
    resultHTML += `
      <div style="margin-bottom: 15px;">
        <p><strong>Q${index + 1}:</strong> ${ans.question}</p>
        <p>📝 Your Answer: <strong>${ans.selected}</strong></p>
        <hr>
      </div>
    `;
  });

  resultHTML += `
    </div>
    <p style="text-align: center; color: gray;">Thank you for submitting. You cannot retake the quiz.</p>
  `;

  quizBox.innerHTML = resultHTML;

  // Disable reload to prevent cheating
  window.onbeforeunload = () => "Quiz already submitted.";
}
