import { createCanvas } from 'canvas';
import * as fs from 'fs';

const width = 1200;
const height = 800;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Bereich der komplexen Zahlen
const aspectRatio = width / height;
const zoom = 1.5; // Zoomfaktor (je kleiner, desto näher dran)

const centerX = -0.5; // neg.: nach rechts, pos.: nach links
const centerY = 0;

const xmin = centerX - zoom * aspectRatio;
const xmax = centerX + zoom * aspectRatio;
const ymin = centerY - zoom;
const ymax = centerY + zoom;

const maxIter = 100;

function mandelbrot(cx: number, cy: number): number {
    let x = 0, y = 0;
    let iter = 0;
    while (x*x + y*y <= 4 && iter < maxIter) {
        const xTemp = x*x - y*y + cx;
        y = 2*x*y + cy;
        x = xTemp;
        iter++;
    }
    return iter;
}

function julia(zx: number, zy: number, cx: number, cy: number): number {
    let iter = 0;
    while (zx*zx + zy*zy <= 4 && iter < maxIter) {
        const xTemp = zx*zx - zy*zy + cx;
        zy = 2*zx*zy + cy;
        zx = xTemp;
        iter++;
    }
    return iter;
}

// Zeichnen
for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
        const x0 = xmin + (px / width) * (xmax - xmin);
        const y0 = ymin + (py / height) * (ymax - ymin);
        const iter = mandelbrot(x0, y0);
        //const iter = julia(x0, y0, -0.7, 0.27015);
        if (iter === maxIter) {
            ctx.fillStyle = 'black'; // Punkte in der Menge
        } else {
            const hue = Math.floor(360 * iter / maxIter);
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        }
        ctx.fillRect(px, py, 1, 1);
    }
}

// Als PNG speichern
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('mandelbrot.png', buffer);
