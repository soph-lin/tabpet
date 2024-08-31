getBiteRadius(numBites) {
    const startMinRad = 5;
    const startMaxRad = 10;
    const incrementEveryNBites = 3;
    const incrementBy = 10; // How much to increment every n bites
    let totalIncrement = 0;

    if (numBites % incrementEveryNBites == 0) totalIncrement = numBites / incrementEveryNBites * incrementBy;
    const minRad = startMinRad + totalIncrement;
    const maxRad = startMaxRad + totalIncrement;

    return Math.random() * (minRad + maxRad) + minRad; // Radius between minRad and maxRad
}

createBite(radius, canvas, ctx) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
}

canEat(startingPixels, canvas, ctx) {
    const pixelsLeft = this.#countPixelsLeft(canvas, ctx);
    const minPixelPercentage = 0.1;
    const canEat = pixelsLeft > startingPixels * minPixelPercentage;

    console.log('pixels left', pixelsLeft);

    if (!canEat && pixelsLeft > 0) this.#clearCanvas(canvas, ctx); // Clear remaining canvas if there are still pixels
    return canEat;
}

countPixelsLeft(canvas, ctx) { // Counts non-transparent pixels
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const buffer = new Uint32Array(imgData.data.buffer); // Use 32-bit buffer
    let c = 0;

    for(let i = 0; i < buffer.length; i++) {
        if (buffer[i] !== 0) c++;
    }

    return c;
}

clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}