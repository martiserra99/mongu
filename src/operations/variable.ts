import { mongu } from '../index';

import { VariableOperations, Value } from '../types';

export const variable: VariableOperations = {
  /**
   * Binds variables for use in the specified expression, and returns the result of the expression.
   * @param {{ vars: { [key: string]: Value }; in: Value }} args The variables and the expression (expressions evaluating to any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The result of the expression.
   * @example $let({ vars: { age: 24 }, in: { isAdult: { $gte: ['$$age', 18] } } }) // { isAdult: true }
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
