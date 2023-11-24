import { mongu } from '../../src/index';

describe('$cmp', () => {
  it('compares two values and returns -1, 1 or 0', () => {
    expect(mongu({ $cmp: [3, 5] })).toBe(-1);
    expect(mongu({ $cmp: [5, 3] })).toBe(1);
    expect(mongu({ $cmp: [5, 5] })).toBe(0);
  });
});

describe('$eq', () => {
  it('compares two values and returns true if they are equal', () => {
    expect(mongu({ $eq: [5, 5] })).toBe(true);
    expect(mongu({ $eq: ['hello', 'bye'] })).toBe(false);
  });
});

describe('$gt', () => {
  it('compares two values and returns true if the first is greater than the second', () => {
    expect(mongu({ $gt: [5, 2] })).toBe(true);
    expect(mongu({ $gt: [5, 7] })).toBe(false);
  });
});

describe('$gte', () => {
  it('compares two values and returns true if the first is greater than or equal to the second', () => {
    expect(mongu({ $gte: [5, 2] })).toBe(true);
    expect(mongu({ $gte: [5, 5] })).toBe(true);
    expect(mongu({ $gte: [5, 7] })).toBe(false);
  });
});

describe('$lt', () => {
  it('compares two values and returns true if the first is less than the second', () => {
    expect(mongu({ $lt: [5, 7] })).toBe(true);
    expect(mongu({ $lt: [5, 2] })).toBe(false);
  });
});

describe('$lte', () => {
  it('compares two values and returns true if the first is less than or equal to the second', () => {
    expect(mongu({ $lte: [5, 7] })).toBe(true);
    expect(mongu({ $lte: [5, 5] })).toBe(true);
    expect(mongu({ $lte: [5, 2] })).toBe(false);
  });
});

describe('$ne', () => {
  it('compares two values and returns true if they are not equal', () => {
    expect(mongu({ $ne: ['hello', 'bye'] })).toBe(true);
    expect(mongu({ $ne: [5, 5] })).toBe(false);
  });
});
