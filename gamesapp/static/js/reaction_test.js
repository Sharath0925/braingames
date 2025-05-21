let startTime, timeout;

function startTest() {
  const box = document.getElementById("testBox");
  box.style.backgroundColor = "#007bff";
  box.style.display = "block";
  box.onclick = tooSoon;
  document.getElementById("message").textContent = "Wait for green...";

  const delay = Math.random() * 3000 + 2000;
  timeout = setTimeout(() => {
    startTime = Date.now();
    box.style.backgroundColor = "#28a745";
    box.onclick = boxClicked;
    document.getElementById("message").textContent = "Click now!";
  }, delay);
}

function tooSoon() {
  clearTimeout(timeout);
  document.getElementById("message").textContent = "Too soon! Try again.";
  document.getElementById("testBox").style.display = "none";
}

function boxClicked() {
  const reaction = Date.now() - startTime;
  document.getElementById("testBox").style.display = "none";
  document.getElementById("message").textContent = `Your Reaction Time: ${reaction} ms`;

  const scoreData = {
    game: "Reaction Test",
    score: reaction
  };

  localStorage.setItem('pending_score', JSON.stringify(scoreData));

  const confirmed = confirm("Game finished! Please login to view your score.");

  if (confirmed) {
    window.location.href = "/signup/";
  } else {
    document.getElementById("message").textContent += " You can login anytime to save your score.";
  }
}
