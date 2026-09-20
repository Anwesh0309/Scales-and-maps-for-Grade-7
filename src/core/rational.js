const gcd = (a, b) => (b === 0n ? (a < 0n ? -a : a) : gcd(b, a % b));

export class Q {
  constructor(n, d = 1n) {
    if (d === 0n) throw new RangeError('Denominator cannot be zero');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d) || 1n;
    this.n = n / g;
    this.d = d / g;
  }

  static of(x) {
    if (x instanceof Q) return x;
    if (typeof x === 'bigint') return new Q(x);
    if (typeof x === 'number') {
      // Convert to string to avoid float imprecision
      x = x.toString();
    }
    const s = String(x).trim();
    if (!s.includes('.')) {
      return new Q(BigInt(s));
    }
    const [intPart, fracPart = ''] = s.split('.');
    const power = 10n ** BigInt(fracPart.length);
    const num = BigInt(intPart) * power + (intPart.startsWith('-') ? -BigInt(fracPart) : BigInt(fracPart));
    return new Q(num, power);
  }

  add(o) {
    const other = Q.of(o);
    return new Q(this.n * other.d + other.n * this.d, this.d * other.d);
  }

  sub(o) {
    const other = Q.of(o);
    return new Q(this.n * other.d - other.n * this.d, this.d * other.d);
  }

  mul(o) {
    const other = Q.of(o);
    return new Q(this.n * other.n, this.d * other.d);
  }

  div(o) {
    const other = Q.of(o);
    if (other.n === 0n) throw new RangeError('Division by zero');
    return new Q(this.n * other.d, this.d * other.n);
  }

  eq(o) {
    const other = Q.of(o);
    return this.n === other.n && this.d === other.d;
  }

  toNumber() {
    return Number(this.n) / Number(this.d);
  }

  toString() {
    if (this.d === 1n) return this.n.toString();
    // Try clean decimal if denominator is power of 10 or divides nicely
    const val = this.toNumber();
    return Number.isInteger(val) ? val.toString() : parseFloat(val.toFixed(3)).toString();
  }

  toFixed(dp = 2) {
    const num = this.toNumber();
    return parseFloat(num.toFixed(dp)).toString();
  }
}
