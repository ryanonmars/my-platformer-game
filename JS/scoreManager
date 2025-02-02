// ScoreManager handles high score retrieval and updates
const ScoreManager = {
    // Retrieve the high score from localStorage or default to 0
    getHighScore() {
        return parseInt(localStorage.getItem("highScore")) || 0;
    },

    // Update the high score in localStorage if the current score is higher
    updateHighScore(currentScore) {
        const highScore = this.getHighScore();
        if (currentScore > highScore) {
            localStorage.setItem("highScore", currentScore);
            console.log(`New high score: ${currentScore}`);
        }
    }
};

// Attach ScoreManager to the global window object
window.ScoreManager = ScoreManager;
