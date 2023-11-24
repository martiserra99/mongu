import { mongu } from '../../src/index';

describe('$abs', () => {
  it('returns the absolute value of a number', () => {
    expect(mongu({ $abs: 2 })).toBe(2);
    expect(mongu({ $abs: -2 })).toBe(2);
  });
});

describe('$add', () => {
  it('returns the addition of numbers', () => {
    expect(mongu({ $add: [2, 3] })).toBe(5);
    expect(mongu({ $add: [2, 3, 4] })).toBe(9);
  });
});

describe('$ceil', () => {
  it('returns the smallest integer greater than or equal to a number', () => {
    expect(mongu({ $ceil: 2.4 })).toBe(3);
    expect(mongu({ $ceil: -2.4 })).toBe(-2);
  });
});

describe('$divide', () => {
  it('returns the division of two numbers', () => {
    expect(mongu({ $divide: [10, 2] })).toBe(5);
    expect(mongu({ $divide: [10, 0] })).toBe(Infinity);
  });
});

describe('$exp', () => {
  it('returns the exponential of a number (e^x where x is the number argument)', () => {
    expect(mongu({ $exp: 2 })).toBe(Math.exp(2));
  });
});

describe('$floor', () => {
  it('returns the largest integer less than or equal to a number', () => {
    expect(mongu({ $floor: 2.4 })).toBe(2);
    expect(mongu({ $floor: -2.4 })).toBe(-3);
  });
});

describe('$ln', () => {
  it('returns the natural logarithm (base e) of a number', () => {
    expect(mongu({ $ln: 2 })).toBe(Math.log(2));
  });
});

describe('$log', () => {
  it('returns the logarithm of a number in a specified base', () => {
    expect(mongu({ $log: [10, 2] })).toBe(Math.log(10) / Math.log(2));
  });
});

describe('$log10', () => {
  it('returns the base 10 logarithm of a number', () => {
    expect(mongu({ $log10: 2 })).toBe(Math.log10(2));
  });
});

describe('$mod', () => {
  it('returns the remainder of the division of the first number by the second number', () => {
    expect(mongu({ $mod: [10, 3] })).toBe(1);
  });
});

describe('$multiply', () => {
  it('returns the multiplication of numbers', () => {
    expect(mongu({ $multiply: [2, 3] })).toBe(6);
    expect(mongu({ $multiply: [2, 3, 4] })).toBe(24);
  });
});

describe('$pow', () => {
  it('returns the value of a number raised to the specified exponent', () => {
    expect(mongu({ $pow: [2, 3] })).toBe(8);
  });
});

describe('$round', () => {
  it('returns the rounded value of a number', () => {
    expect(mongu({ $round: 2.4 })).toBe(2);
    expect(mongu({ $round: 2.5 })).toBe(3);
    expect(mongu({ $round: -2.4 })).toBe(-2);
    expect(mongu({ $round: -2.5 })).toBe(-2);
  });
});

describe('$sqrt', () => {
  it('returns the square root of a number', () => {
    expect(mongu({ $sqrt: 9 })).toBe(3);
  });
});

describe('$subtract', () => {
  it('returns the subtraction of numbers', () => {
    expect(mongu({ $subtract: [5, 3] })).toBe(2);
    expect(mongu({ $subtract: [2, 3] })).toBe(-1);
  });
});

describe('$trunc', () => {
  it('returns the truncated value of a number', () => {
    expect(mongu({ $trunc: 2.4 })).toBe(2);
    expect(mongu({ $trunc: 2.5 })).toBe(2);
    expect(mongu({ $trunc: -2.4 })).toBe(-2);
    expect(mongu({ $trunc: -2.5 })).toBe(-2);
  });
});
