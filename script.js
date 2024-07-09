let score = 0;
let currentBoatImage = 'images/boat1.png'; // Ensure this path is correct

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('game-area').addEventListener('touchstart', collectCoin); // Use touchstart for better mobile performance
document.getElementById('game-area').addEventListener('click', collectCoin);

function startGame() {
    console.log("Start game button clicked");
    const nicknameInput = document.getElementById('nickname-input');
    const nicknameDisplay = document.getElementById('nickname-display');
    const nickname = nicknameInput.value.trim();
    if (nickname === "") {
        alert("Please enter your nickname.");
        return;
    }
    nicknameDisplay.textContent = `Player: ${nickname}`; // Display the nickname
    nicknameInput.disabled = true; // Disable input after starting the game
    nicknameInput.style.display = 'none'; // Hide input after starting the game
    score = 0;
    currentBoatImage = 'images/boat1.png'; // Ensure this path is correct
    document.getElementById('score').textContent = score;
    createBoat();
}

function createBoat() {
    console.log("Creating boat");
    const gameArea = document.getElementById('game-area');
    const existingBoat = document.getElementById('boat');
    if (existingBoat) {
        gameArea.removeChild(existingBoat);
    }
    const boat = document.createElement('div');
    boat.classList.add('boat');
    boat.style.backgroundImage = `url(${currentBoatImage})`;
    boat.id = 'boat';
    boat.addEventListener('click', collectCoin); // Add event listener directly to the boat
    gameArea.appendChild(boat);
    console.log("Boat created and added to game area", boat);
    console.log("Boat styles:", window.getComputedStyle(boat).backgroundImage);
    console.log("Game area innerHTML:", gameArea.innerHTML);
}

function collectCoin(event) {
    console.log("Collect coin event triggered");
    if (event.target.id === 'boat') {
        score++;
        document.getElementById('score').textContent = score;
        createSparkle(event.clientX, event.clientY);
        updateBoatImage();
        console.log("Score updated to", score);
    } else {
        console.log("Click not on boat, but on", event.target);
    }
}

function createSparkle(x, y) {
    console.log("Creating sparkle at", x, y);
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
        currentBoatImage = 'images/boat3.png'; // Ensure this path is correct
    } else if (score >= 50) {
        currentBoatImage = 'images/boat2.png'; // Ensure this path is correct
    } else {
        currentBoatImage = 'images/boat1.png'; // Ensure this path is correct
    }

    const boat = document.getElementById('boat');
    if (boat) {
        boat.style.backgroundImage = `url(${currentBoatImage})`;
    }
    console.log("Updated boat image to", currentBoatImage);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startGame,
        createBoat,
        collectCoin,
        updateBoatImage,
        createSparkle
    };
}
