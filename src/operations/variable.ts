import { mongu, Operations, Value, Object } from '../index';

export const variable: Operations = {
  /**
   * Binds variables for use in the specified expression, and returns the result of the expression.
   * @param args The variables and the expression.
   * @param data The variables.
   * @returns The result of the expression.
   */
  $let(args: { vars: Object<Value>; in: Value }, data: Object<Value>): Value {
    const vars = Object.fromEntries(
      Object.entries(args.vars).map(([key, value]) => [
        `$${key}`,
        mongu(value, data),
      ])
    );
    return mongu(args.in, vars);
  },
};
