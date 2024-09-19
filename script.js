let currentQuestion = 0;
let correctAnswers = 0;
let audioSuccess = new Audio("./assets/success.wav");
let audioError = new Audio("./assets/error.wav");

function init() {
    document.getElementById("all-count").innerHTML = questions.length;
    getQuestion();
}

function getQuestion() {
    if (currentQuestion >= questions.length) {
        finishQuiz();
    } else {
        let percent = (currentQuestion / questions.length) * 100;
        document.getElementById("progress-bar").style.width = (percent + 20) + "%";
        document.getElementById("questiontext").innerHTML = questions[currentQuestion].question;
        document.getElementById("current-count").innerHTML = "0" + (currentQuestion + 1);
        for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
            document.getElementById(`answer_${i}`).innerHTML = questions[currentQuestion].answers[i].text;
        }
    }
}

function findCorrectAnswerIndex(question) {
    for (let i = 0; i < question.answers.length; i++) {
        if (question.answers[i].isCorrect) {
            return i;
        }
    }
}

function selectAnswer(selection) {
    let question = questions[currentQuestion];
    let checkCorrect = questions[currentQuestion].answers[selection].isCorrect;
    let correctAnswerIndex = findCorrectAnswerIndex(question);
    if (checkCorrect) {
        handleCorrectAnswer(selection);
    } else {
        handleIncorrectAnswer(selection, correctAnswerIndex);
    }
    document.getElementById("next-btn").disabled = false;
    disableAnswers();
}

function disableAnswers() {
    let answerButtons = document.querySelectorAll(".answer");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = true;
    }
}

function handleCorrectAnswer(selection) {
    audioSuccess.currentTime = 0;
    document.getElementById("answer_" + selection).classList.add("success");
    audioSuccess.play();
    correctAnswers++;
}

function handleIncorrectAnswer(selection, correctAnswerIndex) {
    audioError.currentTime = 0;
    document.getElementById("answer_" + selection).classList.add("error");
    document.getElementById("answer_" + correctAnswerIndex).classList.add("success");
    audioError.play();
}

function resetAnswers() {
    let answerButtons = document.querySelectorAll(".answer");
    for (let i = 0; i < 4; i++) {
        answerButtons[i].disabled = false;
        document.getElementById("answer_" + i).classList.remove("success", "error");
    }
}

function nextQuestion() {
    currentQuestion++;
    getQuestion();
    resetAnswers();
    document.getElementById("next-btn").disabled = true;
}

function finishQuiz() {
    document.getElementById("quiz-wrapper").classList.add("blur");
    document.getElementById("completion-message").style.display = "block";
    document.getElementById("all-qst").innerHTML = questions.length;
    document.getElementById("correct-qst").innerHTML = correctAnswers;
    setTimeout(() => {
        document.getElementById("completion-message").style.display = "none";
        document.getElementById("quiz-wrapper").classList.remove("blur");
        getQuestion();
        correctAnswers = 0;
        currentQuestion = 0;
    }, 1000);
}