import { mongu, Operations, Value } from '../index';

export const variable: Operations = {
  /**
   * Binds variables for use in the specified expression, and returns the result of the expression.
   * @param args The variables and the expression.
   * @param vars The variables.
   * @returns The result of the expression.
   */
  $let(
    args: { vars: { [key: string]: Value }; in: Value },
    vars: { [key: string]: Value }
  ): Value {
    const variables = Object.fromEntries(
      Object.entries(args.vars).map(([key, value]) => [
        `$${key}`,
        mongu(value, vars),
      ])
    );
    return mongu(args.in, variables);
  },
};
