const questions = [
    {
        question: "Question 1?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "A"
    },
    {
        question: "Question 2?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "B"
    },
    // Add more questions here...
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-button");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-button");

function loadQuestion() {
    const currentQ = questions[currentQuestion];
    questionElement.textContent = currentQ.question;
    optionsElement.innerHTML = "";
    currentQ.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<label><input type="radio" name="answer" value="${option}"> ${option}</label>`;
        optionsElement.appendChild(li);
    });
    submitButton.disabled = false;
    nextButton.style.display = "none";
    feedbackElement.textContent = "";
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        feedbackElement.textContent = "Please select an answer.";
        return;
    }

    if (selectedAnswer.value === questions[currentQuestion].correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct!";
    } else {
        feedbackElement.textContent = "Incorrect. The correct answer is " + questions[currentQuestion].correctAnswer;
    }

    submitButton.disabled = true;
    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = "";
    submitButton.style.display = "none";
    nextButton.style.display = "none";
    feedbackElement.textContent = `Your Score: ${score} out of ${questions.length}`;
    scoreElement.style.display = "block";
}

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);

loadQuestion();
