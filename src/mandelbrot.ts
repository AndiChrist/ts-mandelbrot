import { createCanvas } from 'canvas';
import * as fs from 'fs';
import { Complex } from './Complex';

// ---- Mandelbrot Function ----
function mandelbrot(c: Complex, maxIter: number): number {
    let z = new Complex(0, 0);
    let iter = 0;
    while (z.abs2() <= 4 && iter < maxIter) {
        z = z.mul(z).add(c);
        iter++;
    }
    return iter;
}

// ---- Drawing ----
const width = 800;
const height = 800;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

const maxIter = 100;
const aspectRatio = width / height;
const zoom = 1.5;
const centerX = -0.5;
const centerY = 0;

// Dynamischer Viewport (zentriert und passend)
const xmin = centerX - zoom * aspectRatio;
const xmax = centerX + zoom * aspectRatio;
const ymin = centerY - zoom;
const ymax = centerY + zoom;

// Zeichnen
for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
        const x = xmin + (px / width) * (xmax - xmin);
        const y = ymin + (py / height) * (ymax - ymin);

        const c = new Complex(x, y);
        const iter = mandelbrot(c, maxIter);

        // Farbgebung: HSL
        if (iter === maxIter) {
            ctx.fillStyle = 'black';
        } else {
            const hue = Math.floor(360 * iter / maxIter);
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        }

        ctx.fillRect(px, py, 1, 1);
    }
}

// Speichern
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('mandelbrot.png', buffer);
console.log('✅ mandelbrot.png gespeichert');
