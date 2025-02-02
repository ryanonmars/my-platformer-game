class Player {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 30 - this.height; // Position in the canvas
        this.worldY = this.y; // ✅ Track actual height in the game world
        this.dy = 0;
        this.dx = 0;
        this.gravity = 0.1;
        this.jumpPower = -5;
        this.speed = 3;
        this.onGround = false;
        this.canDoubleJump = false;
        this.jumpKeyReleased = true;
    }

    update(platforms) {
        this.dy += this.gravity;
        this.y += this.dy;
        this.worldY += this.dy; // ✅ Now updates every frame
        this.x += this.dx;

        let onPlatform = false;
        let platformSpeed = 0;

        platforms.forEach(platform => {
            // ✅ LANDING ON A PLATFORM (Prevents falling through)
            if (
                this.dy >= 0 &&
                this.y + this.height >= platform.y &&
                this.y + this.height - this.dy <= platform.y &&
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width
            ) {
                this.dy = 0;
                this.y = platform.y - this.height; // ✅ Correctly place player on top
                this.worldY = this.y; // ✅ Update worldY when landing
                onPlatform = true;
                this.canDoubleJump = true;

                // ✅ IF PLATFORM IS MOVING, MOVE PLAYER WITH IT
                if (platform.isMoving) {
                    platformSpeed = platform.dx;
                }
            }

            // ❌ PREVENT JUMPING THROUGH PLATFORMS FROM BELOW
            if (
                this.dy < 0 &&
                this.y < platform.y + platform.height &&
                this.y - this.dy >= platform.y + platform.height &&
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width
            ) {
                this.dy = 0; // ✅ Stop upward movement
                this.y = platform.y + platform.height; // ✅ Push player back down
            }
        });

        this.onGround = onPlatform;

        // ✅ MOVE PLAYER WITH PLATFORM IF STANDING ON IT
        if (onPlatform) {
            this.x += platformSpeed;
        }

        // Keep player within screen bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    }

    jump() {
        if (this.onGround) {
            this.dy = this.jumpPower;
            this.onGround = false;
            this.doubleJumpUsed = false; // Reset double jump when landing
        } else if (!this.doubleJumpUsed && this.jumpKeyReleased) {
            this.dy = this.jumpPower; // Allow second jump only when key is pressed again
            this.doubleJumpUsed = true; // Prevent more jumps until landing
        }
        this.jumpKeyReleased = false; // Prevent holding space from triggering another jump
    }

    moveLeft() {
        this.dx = -this.speed;
    }

    moveRight() {
        this.dx = this.speed;
    }

    stop() {
        this.dx = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}