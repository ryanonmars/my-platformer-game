const canvas = document.getElementById("gameCanvas");

// Prevent the long-press contextual menu on the canvas
canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

// Optionally: Prevent the context menu on the entire document
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
