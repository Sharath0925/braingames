let correctAnswer;
let questionCount = 0;
let correctCount = 0;
const maxQuestions = 5;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const ops = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let questionText = `${num1} ${op} ${num2} = ?`;

  switch(op) {
    case '+': correctAnswer = num1 + num2; break;
    case '-': correctAnswer = num1 - num2; break;
    case '*': correctAnswer = num1 * num2; break;
  }

  document.getElementById('question').textContent = questionText;
  document.getElementById('answer').value = '';
  document.getElementById('message').textContent = `Question ${questionCount + 1} of ${maxQuestions}`;
  document.getElementById('answer').disabled = false;
  document.querySelector('#quizArea button').disabled = false;
  document.getElementById('answer').focus();
}

function submitAnswer() {
  const userAnswer = Number(document.getElementById('answer').value);
  if (isNaN(userAnswer)) {
    document.getElementById('message').textContent = 'Please enter a valid number!';
    return;
  }

  if (userAnswer === correctAnswer) {
    correctCount++;
    document.getElementById('message').textContent = `Correct!`;
  } else {
    document.getElementById('message').textContent = `Wrong answer! The correct answer was ${correctAnswer}.`;
  }

  questionCount++;

  if (questionCount === maxQuestions) {
    const scoreData = {
      game: "Math Quiz",
      score: correctCount
    };
    localStorage.setItem('pending_score', JSON.stringify(scoreData));

    const userConfirmed = confirm("Quiz finished! Please login to view your scores.");

    if (userConfirmed) {
      window.location.href = "/signup/";
    } else {
      document.getElementById('message').textContent = 'You can try again or login anytime.';
      document.getElementById('answer').disabled = true;
      document.querySelector('#quizArea button').disabled = true;
    }
  } else {
    setTimeout(() => {
      generateQuestion();
    }, 1500);
  }
}

window.onload = generateQuestion;
