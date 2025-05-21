const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🥝', '🍍', '🍒'];
let cards = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;

function startGame() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  matchedCount = 0;
  moves = 0;
  flippedCards = [];
  document.getElementById('message').textContent = 'Moves: 0';

  cards = [...symbols, ...symbols];
  shuffle(cards);

  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.textContent = '';
    card.onclick = () => flipCard(card);
    gameBoard.appendChild(card);
  });
}

function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }

  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('message').textContent = `Moves: ${moves}`;

    if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
      flippedCards.forEach(c => {
        c.classList.add('matched');
        c.classList.remove('flipped');
      });
      matchedCount += 2;
      flippedCards = [];

      if (matchedCount === cards.length) {
        const userConfirmed = confirm(`Congratulations! You won in ${moves} moves!\nPlease login to view the game.`);
        const scoreData = {
          game: "Memory Game",
          score: moves
        };
        localStorage.setItem('pending_score', JSON.stringify(scoreData));
        if (userConfirmed) {
          window.location.href = "/signup/";
        } else {
          document.getElementById('message').textContent = 'You can restart the game or login anytime.';
        }
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(c => {
          c.classList.remove('flipped');
          c.textContent = '';
        });
        flippedCards = [];
      }, 1000);
    }
  }
}

window.onload = startGame;
