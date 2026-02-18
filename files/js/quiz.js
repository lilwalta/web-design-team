function initQuiz() {

  const questions = [
    "Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?",
    "How often have you felt down, depressed, or hopeless?",
    "How often have you felt nervous, anxious, or on edge?",
    "How often have you had trouble relaxing?",
    "How often have you felt overwhelmed by daily responsibilities?"
  ];

  let currentQuestion = 0;
  let totalScore = 0;

  const questionEl = document.getElementById("quizQuestion");
  const options = document.querySelectorAll(".quiz-option");
  const progressBar = document.getElementById("quizProgressBar");
  const resultBox = document.getElementById("quizResult");
  const summary = document.getElementById("quizSummary");
  const optionsContainer = document.querySelector(".quiz-options");

  if (!questionEl) return;

  function loadQuestion() {
    questionEl.textContent = questions[currentQuestion];
    progressBar.style.width =
      (currentQuestion / questions.length) * 100 + "%";
  }

  function showResults() {
    optionsContainer.style.display = "none";
    questionEl.style.display = "none";
    progressBar.style.width = "100%";

    resultBox.classList.remove("hidden");

    if (totalScore <= 4) {
      summary.textContent =
        "Your responses suggest you're doing fairly well overall. Keep maintaining healthy habits and checking in with yourself.";
    } else if (totalScore <= 8) {
      summary.textContent =
        "You may be experiencing moderate stress or mood changes. Exploring coping tools or speaking with someone could help.";
    } else {
      summary.textContent =
        "Your responses suggest higher levels of distress. Consider reaching out to a mental health professional or trusted support system.";
    }
  }

  options.forEach(button => {
    button.addEventListener("click", function () {
      totalScore += parseInt(this.dataset.value);
      currentQuestion++;

      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResults();
      }
    });
  });

  window.restartQuiz = function () {
    currentQuestion = 0;
    totalScore = 0;

    resultBox.classList.add("hidden");
    optionsContainer.style.display = "block";
    questionEl.style.display = "block";
    progressBar.style.width = "0%";

    loadQuestion();
  };

  loadQuestion();
}


document.addEventListener("DOMContentLoaded", function () {
  initQuiz();
});
