let containerEl = document.querySelector(".container");
let gameStartBtn = document.querySelector(".game-start");
let gameData = document.querySelector(".data");
let killsEl = document.querySelector(".kill");
let timeEl = document.querySelector(".time");
let gunShot = new Audio("./Assests/gunshot.mp3");

let countKill = 0;
let countdown = 59;
let gameTimer;
let finalScore;
let zombie = document.querySelector(".zombie");

// Create score element
function createScoreElement() {
  finalScore = document.createElement("h1");
  finalScore.textContent = `Total Kills: ${countKill}`;
  finalScore.classList.add("score");
  return finalScore;
}

// Move zombie to random position
function moveZombie() {
  if (!zombie) return;
  
  const containerRect = containerEl.getBoundingClientRect();
  const zombieRect = zombie.getBoundingClientRect();
  
  const maxX = containerRect.width - zombieRect.width;
  const maxY = containerRect.height - zombieRect.height;
  
  zombie.style.position = "absolute";
  zombie.style.left = `${Math.max(0, Math.random() * maxX)}px`;
  zombie.style.top = `${Math.max(0, Math.random() * maxY)}px`;
}

// Handle zombie click
function handleZombieClick() {
  countKill++;
  killsEl.textContent = `Kills: ${countKill}`;
  zombie.style.opacity = "0";
  gunShot.currentTime = 0; // Reset sound
  gunShot.play();
  
  setTimeout(() => {
    moveZombie();
    zombie.style.opacity = "1";
  }, 300);
}

// Start game function
function startGame() {
  // Reset game state
  countKill = 0;
  countdown = 59;
  killsEl.textContent = `Kills: 00`;
  timeEl.textContent = `time: ${countdown}`;
  
  if (finalScore && containerEl.contains(finalScore)) {
    containerEl.removeChild(finalScore);
  }

  // Setup UI
  gameStartBtn.classList.add("vanish");
  gameData.classList.remove("vanish");
  gameData.classList.add("visible");
  containerEl.classList.remove("extra");

  // Initialize zombie
  zombie.style.opacity = "1";
  moveZombie();
  zombie.addEventListener("click", handleZombieClick);

  // Start timer
  gameTimer = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      timeEl.textContent = `time: ${countdown}`;
    } else {
      endGame();
    }
  }, 1000);
}

// End game function
function endGame() {
  clearInterval(gameTimer);
  zombie.removeEventListener("click", handleZombieClick);
  zombie.style.opacity = "0";
  
  gameStartBtn.classList.remove("vanish");
  containerEl.classList.add("extra");
  gameData.classList.remove("visible");
  gameData.classList.add("vanish");
  gameStartBtn.textContent = "Click to Play Again";
  
  finalScore = createScoreElement();
  containerEl.appendChild(finalScore);
}

// Event listener
gameStartBtn.addEventListener("click", startGame);