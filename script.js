
let score = 0;
let gameInterval;

document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    gameInterval = setInterval(createBoat, 1000);
    setTimeout(stopGame, 30000); // Game lasts 30 seconds
}

function createBoat() {
    const gameArea = document.getElementById('game-area');
    const boat = document.createElement('div');
    boat.classList.add('boat');
    boat.style.top = `${Math.random() * 350}px`;
    boat.style.left = `${Math.random() * 750}px`;
    boat.addEventListener('click', collectCoin);
    gameArea.appendChild(boat);

    setTimeout(() => {
        boat.remove();
    }, 3000); // Boat disappears after 3 seconds
}

function collectCoin(event) {
    score++;
    document.getElementById('score').textContent = score;
    event.target.remove();
}

function stopGame() {
    clearInterval(gameInterval);
    alert(`Game Over! You collected ${score} coins.`);
}
