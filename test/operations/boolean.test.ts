import { mongu } from '../../src/index';

describe('$and', () => {
  it('evaluates one or more expressions and returns true if any of the expressions are true', () => {
    expect(mongu({ $and: [true, true] })).toBe(true);
    expect(mongu({ $and: [true, false, true] })).toBe(false);
  });
});

describe('$not', () => {
  it('evaluates a boolean and returns the opposite boolean value', () => {
    expect(mongu({ $not: true })).toBe(false);
    expect(mongu({ $not: false })).toBe(true);
  });
});

describe('$or', () => {
  it('evaluates one or more expressions and returns true if any of the expressions are true', () => {
    expect(mongu({ $or: [true, false] })).toBe(true);
    expect(mongu({ $or: [false, false] })).toBe(false);
  });
});
