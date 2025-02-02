// ✅ Declare canvas & context only once
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let score = 0;
let cameraY = 0;           // Tracks how far the camera has moved upward
let highestWorldY = 0;     // Stores the maximum progress reached so far

let player = new Player();
const initialY = player.y; // Record the starting position (baseline)
// In this approach, we won’t update any "initialOffset" repeatedly.
// Instead, we calculate progress based on the starting position.

let platforms = generatePlatforms(10, canvas.height);
setupControls(player);

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
    // Determine the player's current "world progress":
    // - Before the camera moves, use: progress = initialY - player.y
    // - Once scrolling starts, the player's y is kept at canvas.height/2,
    //   so progress = (initialY - canvas.height/2) + cameraY
    let currentProgress;
    if (cameraY === 0) {
        // No scrolling yet – use the player's actual position
        currentProgress = initialY - player.y;
    } else {
        // Scrolling has started – player's y is locked at canvas.height/2
        currentProgress = (initialY - canvas.height / 2) + cameraY;
    }

    // Update the record if the player has reached a new maximum
    if (currentProgress > highestWorldY) {
        highestWorldY = currentProgress;
    }

    // Use the highest record as the score
    score = Math.floor(highestWorldY);
    document.getElementById("scoreDisplay").innerText = "Score: " + score;

    // ✅ Platform management: Remove off-screen platforms and spawn new ones.
    platforms = platforms.filter(platform => platform.y < canvas.height);
    while (platforms.length < 10) {
        let width = getRandomInt(50, 100);
        let x = getRandomInt(0, canvas.width - width);
        let y = platforms[platforms.length - 1].y - 100;

        let isMoving = Math.random() < 0.5;

        // Prevent new platforms from overwriting the ground platform
        if (y > canvas.height - 50) {
            continue;
        }

        platforms.push(new Platform(x, y, width, 10, isMoving));
    }

    // ✅ Update and draw the player
    player.update(platforms);
    player.draw(ctx);

    // ✅ Update and draw the platforms
    platforms.forEach(platform => {
        platform.update();
        platform.draw(ctx);
    });

    // ✅ Game Over Check: If the player falls off the bottom of the screen
    if (player.y > canvas.height) {
        alert("Game Over!");
        document.location.reload();
        return;
    }

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

gameLoop();