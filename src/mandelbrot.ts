import { createCanvas } from 'canvas';
import * as fs from 'fs';

// ---- Complex Class ----
class Complex {
    constructor(public re: number, public im: number) {}

    add(other: Complex): Complex {
        return new Complex(this.re + other.re, this.im + other.im);
    }

    mul(other: Complex): Complex {
        const re = this.re * other.re - this.im * other.im;
        const im = this.re * other.im + this.im * other.re;
        return new Complex(re, im);
    }

    abs2(): number {
        return this.re * this.re + this.im * this.im;
    }
}

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

function julia(z: Complex, c: Complex, maxIter: number): number {
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
//const c = new Complex(-0.7, 0.27015); // typisches Beispiel (für Julia)

for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
        const x = xmin + (px / width) * (xmax - xmin);
        const y = ymin + (py / height) * (ymax - ymin);

        // MANDELBROT
        const c = new Complex(x, y);
        const iter = mandelbrot(c, maxIter);

        // JULIA
        //const z = new Complex(x, y); // <- hier ist z nun variabel, c bleibt fix
        //const iter = julia(z, c, maxIter);

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

