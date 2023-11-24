import { mongu } from '../../src/index';

describe('$cond', () => {
  it('evaluates a boolean expression to return one of the two specified return expressions', () => {
    expect(
      mongu({
        $cond: { if: true, then: 'hello', else: 'bye' },
      })
    ).toBe('hello');
    expect(
      mongu({
        $cond: { if: false, then: 'hello', else: 'bye' },
      })
    ).toBe('bye');
  });
});

describe('$ifNull', () => {
  it("evaluates input expressions for null values and returns the first non-null expression's value", () => {
    expect(mongu({ $ifNull: [null, 'hello', 'bye'] })).toBe('hello');
    expect(mongu({ $ifNull: [null, null, 'bye'] })).toBe('bye');
    expect(mongu({ $ifNull: [null, null, null] })).toBe(null);
  });
});

describe('$switch', () => {
  it('evaluates a series of case expressions. When it finds an expression which evaluates to true, it executes a specified expression and breaks out of the control flow.', () => {
    expect(
      mongu({
        $switch: {
          branches: [
            { case: false, then: 1 },
            { case: true, then: 2 },
          ],
          default: 3,
        },
      })
    ).toBe(2);
    expect(
      mongu({
        $switch: {
          branches: [
            { case: false, then: 1 },
            { case: false, then: 2 },
          ],
          default: 3,
        },
      })
    ).toBe(3);
  });
});
