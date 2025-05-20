export class Complex {
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

    toString(): string {
        return `${this.re} + ${this.im}i`;
    }
}
