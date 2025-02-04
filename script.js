const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Jupiter"
    },
    // Add more questions as needed
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;  // Timer for each question (30 seconds)

function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    const current = questions[currentQuestion];
    questionContainer.textContent = current.question;

    optionsContainer.innerHTML = ''; // Clear previous options
    current.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    startTimer(); // Start the timer when the question appears
}

function startTimer() {
    timeLeft = 30;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

    clearInterval(timer);
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selected) {
    const current = questions[currentQuestion];
    const feedbackContainer = document.getElementById("feedback-container");

    if (selected === current.correct) {
        score++;
        feedbackContainer.textContent = "Correct!";
    } else {
        feedbackContainer.textContent = `Incorrect! The correct answer is: ${current.correct}`;
    }

    document.getElementById("next-button").style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
        document.getElementById("next-button").style.display = 'none';
        document.getElementById("feedback-container").textContent = '';
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("result-container").classList.remove("hidden");
    document.getElementById("score").textContent = score;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result-container").classList.add("hidden");
    showQuestion();
}

showQuestion();  // Initial call to display the first question
