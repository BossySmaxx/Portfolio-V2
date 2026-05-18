function calculateDistance2({ x1, y1, x2, y2 }) {
    const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return dist;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
