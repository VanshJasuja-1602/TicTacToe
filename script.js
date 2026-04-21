const cells = Array.from(document.querySelectorAll("[data-cell]"));
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");
const winnerModal = document.getElementById("winnerModal");
const winnerText = document.getElementById("winnerText");
const closeModal = document.getElementById("closeModal");

let currentPlayer = "X";
let gameActive = true;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function setMark(cell, player) {
  cell.classList.add(player.toLowerCase());
  cell.setAttribute("data-mark", player);
  cell.classList.add("placed","taken");
}

function checkWin(player) {
  const marks = cells.map(c => c.getAttribute("data-mark"));
  return wins.find(combo => combo.every(i => marks[i] === player));
}

function checkDraw() {
  return cells.every(c => c.classList.contains("taken"));
}

function showWinner(player) {
  winnerText.textContent = `Player ${player} Wins! 🎉`;
  winnerModal.style.display = "flex";
}

function handleClick(e) {
  const cell = e.currentTarget;
  if (!gameActive || cell.classList.contains("taken")) return;

  setMark(cell, currentPlayer);

  const winCombo = checkWin(currentPlayer);
  if (winCombo) {
    gameActive = false;
    statusText.textContent = `Player ${currentPlayer} wins!`;
    winCombo.forEach(i => cells[i].classList.add("win"));
    showWinner(currentPlayer);
    return;
  }

  if (checkDraw()) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
    winnerText.textContent = "It's a Draw!";
    winnerModal.style.display = "flex";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restart() {
  cells.forEach(c => {
    c.className = "cell";
    c.removeAttribute("data-mark");
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  winnerModal.style.display = "none";
}

cells.forEach(c => c.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restart);
closeModal.addEventListener("click", () => winnerModal.style.display = "none");

