// ✅ Declare canvas & context only once
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let score = 0;
let cameraY = 0; // Tracks how far the camera has moved upward
let highestWorldY = 0; // Stores the maximum progress reached so far

let player = new Player();
const initialY = player.y; // Record the starting position (baseline)

let platforms = generatePlatforms(10, canvas.height);
setupControls(player);

// ✅ High Score Management
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;

// Initialize the high score display
document.getElementById("highScoreDisplay").innerText = `High Score: ${highScore}`;

// Function to update the high score in localStorage if the current score is higher
function updateHighScore(currentScore) {
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("highScore", highScore);
        console.log(`New high score: ${highScore}`);

        // Update the high score display
        document.getElementById("highScoreDisplay").innerText = `High Score: ${highScore}`;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ✅ Camera Movement: If the player is above the mid-screen,
    // shift the world so the player stays roughly in the middle.
    if (player.y < canvas.height / 2) {
        let distanceMoved = Math.abs(player.dy);
        player.y += distanceMoved;
        platforms.forEach(platform => {
            platform.y += distanceMoved;
        });
        cameraY += distanceMoved;
    }

    // ✅ Score Calculation Based on Maximum Height Achieved
    let currentProgress;
    if (cameraY === 0) {
        currentProgress = initialY - player.y;
    } else {
        currentProgress = (initialY - canvas.height / 2) + cameraY;
    }

    if (currentProgress > highestWorldY) {
        highestWorldY = currentProgress;
    }

    score = Math.floor(highestWorldY);

    // Display the current score in real time
    document.getElementById("scoreDisplay").innerText = `Score: ${score}`;

    // Update the high score if needed
    updateHighScore(score);

    platforms = platforms.filter(platform => platform.y < canvas.height);
    while (platforms.length < 10) {
        let width = getRandomInt(50, 100);
        let x = getRandomInt(0, canvas.width - width);
        let y = platforms[platforms.length - 1].y - 100;

        let isMoving = Math.random() < 0.5; // 50% chance to be a moving platform
        let isDropping = Math.random() < 0.05; // 5% chance to be a dropping platform

        // Prevent new platforms from overwriting the ground platform
        if (y > canvas.height - 50) {
            continue;
        }

        platforms.push(new Platform(x, y, width, 10, isMoving, isDropping));
    }

    // ✅ Update and draw the player
    player.update(platforms);
    player.draw(ctx);

    // ✅ Update and draw the platforms
    platforms.forEach(platform => {
        platform.update(player); // Pass the player to check for interactions
        platform.draw(ctx);
    });

    // ✅ Game Over Check
    if (player.y > canvas.height) {
        alert("Game Over!");
        document.location.reload();
        return;
    }

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

gameLoop();
