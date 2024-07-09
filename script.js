let score = 0;
let currentBoatImage = 'images/boat1.png'; // Ensure this path is correct
let currentLevel = 1;
let clicksNeededForNextLevel = 100;
const backgroundMusic = document.getElementById('background-music');
const clickSound = document.getElementById('click-sound');
const musicToggleButton = document.getElementById('music-toggle-button');
const progressBar = document.getElementById('progress-bar');
const energyBar = document.getElementById('energy-bar');
const boostButton = document.getElementById('boost-button');
let energy = 1000;
const maxEnergy = 1000;
const energyRegenerationRate = 5 * 1000; // 5 seconds
const boostCooldownTime = 10 * 60 * 1000; // 10 minutes
let boostAvailable = true;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('nickname-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        startGame();
        this.blur(); // Hide the keyboard on mobile devices
    }
});
document.getElementById('game-area').addEventListener('touchstart', collectCoin); // Use touchstart for better mobile performance
document.getElementById('game-area').addEventListener('click', collectCoin);
musicToggleButton.addEventListener('click', toggleMusic);
boostButton.addEventListener('click', useBoost);

function startGame() {
    console.log("Start game button clicked");
    const nicknameInput = document.getElementById('nickname-input');
    const nicknameDisplay = document.getElementById('nickname-display');
    const startButton = document.getElementById('start-button');
    const nickname = nicknameInput.value.trim();
    if (nickname === "") {
        alert("Please enter your nickname.");
        return;
    }
    nicknameDisplay.textContent = `Player: ${nickname}`; // Display the nickname
    nicknameInput.disabled = true; // Disable input after starting the game
    nicknameInput.style.display = 'none'; // Hide input after starting the game
    startButton.style.display = 'none'; // Hide the start button after starting the game
    musicToggleButton.style.display = 'block'; // Show the music toggle button
    boostButton.style.display = 'block'; // Show the boost button
    score = 0;
    currentLevel = 1;
    clicksNeededForNextLevel = 100;
    energy = maxEnergy; // Reset energy
    boostAvailable = true; // Reset boost availability
    updateScoreDisplay();
    updateEnergyDisplay();
    createBoat();
    startEnergyRegeneration();
    resetTasks();
}

function createBoat() {
    console.log("Creating boat");
    const gameArea = document.getElementById('game-area');
    const existingBoat = document.getElementById('boat');
    if (existingBoat) {
        gameArea.removeChild(existingBoat);
    }
    const boatContainer = document.createElement('div');
    boatContainer.style.position = 'relative';
    boatContainer.style.width = '100%';
    boatContainer.style.height = '100%';
    boatContainer.style.display = 'flex';
    boatContainer.style.justifyContent = 'center';
    boatContainer.style.alignItems = 'center';
    gameArea.appendChild(boatContainer);

    const boat = document.createElement('div');
    boat.classList.add('boat');
    boat.style.backgroundImage = `url(${currentBoatImage})`;
    boat.style.width = `${200 + (currentLevel - 1) * 10}px`; // Increase boat size with level
    boat.style.height = `${200 + (currentLevel - 1) * 10}px`; // Increase boat size with level
    boat.id = 'boat';
    boat.addEventListener('click', collectCoin); // Add event listener directly to the boat
    boatContainer.appendChild(boat);
    console.log("Boat created and added to game area", boat);
    console.log("Boat styles:", window.getComputedStyle(boat).backgroundImage);
    console.log("Game area innerHTML:", gameArea.innerHTML);
}

function collectCoin(event) {
    console.log("Collect coin event triggered");
    if (event.target.id === 'boat') {
        if (energy > 0) {
            score++;
            energy--;
            updateScoreDisplay();
            updateEnergyDisplay();
            createSparkle(event.clientX, event.clientY);
            updateBoatImage();
            updateProgressBar();
            clickSound.play(); // Play the click sound
            checkTasks();
            checkLevelUp();
            console.log("Score updated to", score);
            console.log("Energy updated to", energy);
        } else {
            alert("Not enough energy!");
        }
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

function createLevelUpEffect() {
    console.log("Creating level up effect");
    const levelUpEffect = document.createElement('div');
    levelUpEffect.classList.add('level-up');
    document.getElementById('game-area').appendChild(levelUpEffect);

    setTimeout(() => {
        levelUpEffect.remove();
    }, 1000); // Level up effect disappears after 1 second
}

function updateBoatImage() {
    if (score >= clicksNeededForNextLevel) {
        markTaskComplete(2); // Complete the upgrade boat task
    }

    const boat = document.getElementById('boat');
    if (boat) {
        boat.style.backgroundImage = `url(${currentBoatImage})`;
    }
    console.log("Updated boat image to", currentBoatImage);
}

function checkLevelUp() {
    if (score >= clicksNeededForNextLevel) {
        currentLevel++;
        clicksNeededForNextLevel *= 2;
        createLevelUpEffect();
        createBoat();
        updateProgressBar();
        console.log("Leveled up to", currentLevel);
    }
}

function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggleButton.textContent = 'Pause Music';
    } else {
        backgroundMusic.pause();
        musicToggleButton.textContent = 'Play Music';
    }
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = `${score} 💰`;
}

function updateEnergyDisplay() {
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
}

function updateProgressBar() {
    let levelProgress;
    if (score >= clicksNeededForNextLevel) {
        levelProgress = 100; // Max level progress for level 20
    } else if (score >= 50) {
        levelProgress = ((score - (clicksNeededForNextLevel / 2)) / (clicksNeededForNextLevel / 2)) * 100; // Current level progress
    } else {
        levelProgress = (score / (clicksNeededForNextLevel / 2)) * 100; // Level 1 progress
    }
    progressBar.style.width = `${levelProgress}%`;
}

function startEnergyRegeneration() {
    setInterval(() => {
        if (energy < maxEnergy) {
            energy++;
            updateEnergyDisplay();
            console.log("Energy regenerated to", energy);
        }
    }, energyRegenerationRate);
}

function useBoost() {
    if (boostAvailable) {
        energy = maxEnergy;
        updateEnergyDisplay();
        boostAvailable = false;
        boostButton.disabled = true;
        startBoostCooldown();
    }
}

function startBoostCooldown() {
    let remainingCooldown = boostCooldownTime / 1000;
    const countdownInterval = setInterval(() => {
        remainingCooldown--;
        boostButton.textContent = `Boost (${remainingCooldown}s)`;
        if (remainingCooldown <= 0) {
            clearInterval(countdownInterval);
            boostAvailable = true;
            boostButton.disabled = false;
            boostButton.textContent = "Boost";
        }
    }, 1000);
}

function checkTasks() {
    if (score >= 10) {
        markTaskComplete(1); // Complete the 10 clicks task
    }
}

function markTaskComplete(taskNumber) {
    const task = document.getElementById(`task-${taskNumber}`);
    if (task && !task.classList.contains('complete')) {
        task.classList.add('complete');
        console.log(`Task ${taskNumber} completed`);
    }
}

function resetTasks() {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => task.classList.remove('complete'));
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startGame,
        createBoat,
        collectCoin,
        updateBoatImage,
        createSparkle,
        toggleMusic,
        updateScoreDisplay,
        updateEnergyDisplay,
        updateProgressBar,
        startEnergyRegeneration,
        useBoost,
        startBoostCooldown,
        checkTasks,
        markTaskComplete,
        resetTasks
    };
}
