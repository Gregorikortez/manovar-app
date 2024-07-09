let score = 0;
let gameInterval;
let currentBoatImage = 'boat1.png';

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('game-area').addEventListener('click', collectCoin);

function startGame() {
    score = 0;
    currentBoatImage = 'boat1.png';
    document.getElementById('score').textContent = score;
    clearGameArea();  // Clear any remaining boats from previous game
    gameInterval = setInterval(createBoat, 1000);
    setTimeout(stopGame, 30000); // Game lasts 30 seconds
}

function createBoat() {
    const gameArea = document.getElementById('game-area');
    const boat = document.createElement('div');
    boat.classList.add('boat');
    boat.style.top = `${Math.random() * (gameArea.clientHeight - 50)}px`; // Adjusted for boat height
    boat.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`; // Adjusted for boat width
    boat.style.backgroundImage = `url(${currentBoatImage})`;
    gameArea.appendChild(boat);

    setTimeout(() => {
        if (boat) boat.remove();
    }, 3000); // Boat disappears after 3 seconds
}

function collectCoin(event) {
    if (event.target.id === 'game-area' || event.target.classList.contains('boat')) {
        score++;
        document.getElementById('score').textContent = score;
        if (event.target.classList.contains('boat')) {
            event.target.remove();
        }
        createSparkle(event.clientX, event.clientY);
        updateBoatImage();
    }
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${x - 10}px`;
    sparkle.style.top = `${y - 10}px`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 500); // Sparkle disappears after 0.5 seconds
}

function updateBoatImage() {
    if (score >= 100) {
        currentBoatImage = 'boat3.png';
    } else if (score >= 50) {
        currentBoatImage = 'boat2.png';
    } else {
        currentBoatImage = 'boat1.png';
    }
}

function stopGame() {
    clearInterval(gameInterval);
    alert(`Game Over! You collected ${score} coins.`);
    clearGameArea();
}

function clearGameArea() {
    const gameArea = document.getElementById('game-area');
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startGame,
        createBoat,
        collectCoin,
        stopGame,
        clearGameArea,
        updateBoatImage,
        createSparkle
    };
}
``
