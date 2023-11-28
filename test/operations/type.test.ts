import { mongu } from '../../src/index';

describe('$type', () => {
  it('converts a value to a specified type', () => {
    expect(mongu({ $convert: { input: '5', to: 'number' } })).toBe(5);
    expect(mongu({ $convert: { input: 3, to: 'string' } })).toBe('3');
    expect(mongu({ $convert: { input: 0, to: 'bool' } })).toBe(false);
  });
});

describe('$toBoolean', () => {
  it('converts a value to a boolean', () => {
    expect(mongu({ $toBoolean: 'hello' })).toBe(true);
    expect(mongu({ $toBoolean: '' })).toBe(false);
    expect(mongu({ $toBoolean: 5 })).toBe(true);
    expect(mongu({ $toBoolean: 0 })).toBe(false);
  });
});

describe('$toNumber', () => {
  it('converts a value to a number', () => {
    expect(mongu({ $toNumber: '7' })).toBe(7);
    expect(mongu({ $toNumber: 'hello' })).toBeNaN();
  });
});

describe('$toString', () => {
  it('converts a value to a string', () => {
    expect(mongu({ $toString: 7 })).toBe('7');
    expect(mongu({ $toString: true })).toBe('true');
  });
});