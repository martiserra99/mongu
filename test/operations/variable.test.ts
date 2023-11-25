import { mongu } from '../../src/index';

describe('$let', () => {
  it('binds variables for use in the specified expression, and returns the result of the expression', () => {
    expect(
      mongu({
        $let: {
          vars: { age: 24 },
          in: { isAdult: { $gte: ['$$age', 18] } },
        },
      })
    ).toEqual({ isAdult: true });
  });
});
