// Prevent the long-press contextual menu on the canvas
canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

// Prevent pinch-zoom and multi-touch gestures globally
document.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) {
        e.preventDefault(); // Prevent multi-touch gestures like pinch-zoom
    }
}, { passive: false });

// Prevent gesture events (e.g., pinch-zoom, rotate) globally
document.addEventListener("gesturestart", (e) => {
    e.preventDefault();
});

// Optionally: Prevent the context menu on the entire document
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
