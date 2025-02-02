function setupControls(player) {
    let keys = {}; // Track which keys are currently pressed
    let activeKey = null; // Track the last pressed movement key

    document.addEventListener("keydown", (e) => {
        keys[e.code] = true; // Mark key as pressed

        if (e.code === "ArrowLeft") {
            activeKey = "left";
            player.moveLeft();
        }
        if (e.code === "ArrowRight") {
            activeKey = "right";
            player.moveRight();
        }
        if (e.code === "Space" && player.jumpKeyReleased) {
            player.jump();
        }
    });

    document.addEventListener("keyup", (e) => {
        keys[e.code] = false; // Mark key as released

        if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
            if (e.code === "ArrowLeft" && activeKey === "left") {
                activeKey = keys["ArrowRight"] ? "right" : null; // Switch to Right if held
                if (activeKey === "right") player.moveRight();
                else player.stop();
            }
            if (e.code === "ArrowRight" && activeKey === "right") {
                activeKey = keys["ArrowLeft"] ? "left" : null; // Switch to Left if held
                if (activeKey === "left") player.moveLeft();
                else player.stop();
            }
        }
        if (e.code === "Space") {
            player.jumpKeyReleased = true;
        }
    });

    // ✅ Touch Controls (Mobile Support)
    document.getElementById("leftBtn").addEventListener("touchstart", () => {
        activeKey = "left";
        player.moveLeft();
    });

    document.getElementById("rightBtn").addEventListener("touchstart", () => {
        activeKey = "right";
        player.moveRight();
    });

    document.getElementById("jumpBtn").addEventListener("touchstart", () => {
        if (player.jumpKeyReleased) {
            player.jump();
            player.jumpKeyReleased = false;
        }
    });

    document.getElementById("leftBtn").addEventListener("touchend", () => {
        if (activeKey === "left") {
            activeKey = keys["ArrowRight"] ? "right" : null;
            if (activeKey === "right") player.moveRight();
            else player.stop();
        }
    });

    document.getElementById("rightBtn").addEventListener("touchend", () => {
        if (activeKey === "right") {
            activeKey = keys["ArrowLeft"] ? "left" : null;
            if (activeKey === "left") player.moveLeft();
            else player.stop();
        }
    });

    document.getElementById("jumpBtn").addEventListener("touchend", () => {
        player.jumpKeyReleased = true;
    });
}
