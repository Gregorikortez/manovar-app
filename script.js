let score = 0;
let currentBoatImage = 'boat1.png';
let nickname = '';

document.getElementById('play-button').addEventListener('click', startGame);
document.getElementById('start-button').addEventListener('click', startGameSession);
document.getElementById('game-area').addEventListener('click', collectCoin);

function startGame() {
    nickname = document.getElementById('nickname-input').value;
    if (nickname) {
        document.getElementById('nickname-display').textContent = `Nickname: ${nickname}`;
        document.getElementById('start-screen').classList.remove('active');
        document.getElementById('game-container').classList.add('active');
        score = 0;
        currentBoatImage = 'boat1.png';
        document.getElementById('score').textContent = score;
        clearGameArea();
        createBoat();
    } else {
        alert('Please enter a nickname.');
    }
}

function startGameSession() {
    score = 0;
    currentBoatImage = 'boat1.png';
    document.getElementById('score').textContent = score;
    clearGameArea();
    createBoat();
}

function createBoat() {
    const gameArea = document.getElementById('game-area');
    const boat = document.createElement('div');
    boat.classList.add('boat');
    boat.style.backgroundImage = `url(${currentBoatImage})`;
    boat.id = 'boat';
    gameArea.appendChild(boat);
}

function collectCoin(event) {
    if (event.target.id === 'game-area' || event.target.id === 'boat') {
        score++;
        document.getElementById('score').textContent = score;
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

    const boat = document.getElementById('boat');
    if (boat) {
        boat.style.backgroundImage = `url(${currentBoatImage})`;
    }
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
        clearGameArea,
        updateBoatImage,
        createSparkle
    };
}
