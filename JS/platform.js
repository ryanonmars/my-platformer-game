class Platform {
    constructor(x, y, width, height, isMoving = false, isDropping = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isMoving = isMoving; // Horizontal movement
        this.isDropping = isDropping; // Vertical movement when jumped on
        this.color = isDropping ? "red" : "blue"; // Red for dropping platforms, blue for others
        this.speed = isMoving ? 1 : 0; // Speed for moving platforms
        this.direction = 1; // Direction for moving platforms (1 = right, -1 = left)
    }

    update(player) {
        // Check if the player is standing on this platform
        const playerOnPlatform = (
            player.x + player.width > this.x &&
            player.x < this.x + this.width &&
            player.y + player.height === this.y
        );

        // Handle dropping platforms
        if (this.isDropping && playerOnPlatform) {
            this.y += 1; // Move down slowly when the player is on it
        }

        // Handle horizontal movement for moving platforms
        if (this.isMoving) {
            this.x += this.speed * this.direction;

            // Reverse direction when hitting canvas edges
            if (this.x <= 0 || this.x + this.width >= canvas.width) {
                this.direction *= -1; // Reverse direction
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function generatePlatforms(count, canvasHeight) {
    let platforms = [];

    // Create a solid ground platform at the bottom
    let groundPlatform = new Platform(0, canvasHeight - 30, canvas.width, 30, false, false);
    platforms.push(groundPlatform);

    for (let i = 1; i < count; i++) {
        let width = getRandomInt(50, 100);
        let x = getRandomInt(0, canvas.width - width);
        let y = canvasHeight - (i * 100); // Space out platforms

        // Make isDropping and isMoving mutually exclusive
        let isDropping = Math.random() < 0.2; // 5% chance to be a dropping platform
        let isMoving = !isDropping && Math.random() < 0.5; // 50% chance to be a moving platform, only if not dropping

        platforms.push(new Platform(x, y, width, 10, isMoving, isDropping));
    }
    return platforms;
}
