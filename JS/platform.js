class Platform {
    constructor(x, y, width, height, isMoving = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isMoving = isMoving;
        this.dx = isMoving ? 1.5 : 0; // Move speed for moving platforms
    }

    update() {
        if (this.isMoving) {
            this.x += this.dx; // Move platform left/right

            // Reverse direction if it hits the screen edges
            if (this.x <= 0 || this.x + this.width >= canvas.width) {
                this.dx *= -1; // Change direction
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = "blue"; // Make all platforms blue
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function generatePlatforms(count, canvasHeight) {
    let platforms = [];

    // ✅ Create a solid ground platform at the bottom
    let groundPlatform = new Platform(0, canvasHeight - 30, canvas.width, 30, false);
    platforms.push(groundPlatform); // ✅ Always add the ground first

    for (let i = 1; i < count; i++) {
        let width = getRandomInt(50, 100);
        let x = getRandomInt(0, canvas.width - width);
        let y = canvasHeight - (i * 100); // Space out platforms

        let isMoving = Math.random() < 0.5; // 50% chance to be a moving platform

        platforms.push(new Platform(x, y, width, 10, isMoving));
    }
    return platforms;
}