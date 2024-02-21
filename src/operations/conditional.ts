import { mongu } from '../index';

import { ConditionalOperations, Value } from '../types';

import { assert } from '../assert';

export const conditional: ConditionalOperations = {
  /**
   * Evaluates a boolean expression to return one of the two specified return expressions.
   * @param args The condition, the value if true, and the value if false.
   * @param vars The variables.
   * @returns The value if true, or the value if false.
   */
  $cond(
    args: { if: Value; then: Value; else: Value },
    vars: { [key: string]: Value }
  ): Value {
    const boolean = mongu(args.if, vars);
    assert<boolean>(boolean, ['boolean']);
    return boolean ? mongu(args.then, vars) : mongu(args.else, vars);
  },
  /**
   * Evaluates input expressions for null values and returns the first non-null expression's value.
   * @param args The expressions.
   * @param vars The variables.
   * @returns The first non-null expression's value.
   */
  $ifNull(args: Value[], vars: { [key: string]: Value }): Value {
    for (const arg of args.slice(0, -1)) {
      const value = mongu(arg, vars);
      if (value !== null) {
        return value;
      }
    }
    return mongu(args[args.length - 1], vars);
  },
  /**
   * Evaluates a series of case expressions. When it finds an expression which evaluates to true, it executes a specified expression and breaks out of the control flow.
   * @param args The branches and the default value.
   * @param vars The variables.
   * @returns The value of the executed expression.
   */
  $switch(
    args: {
      branches: { case: Value; then: Value }[];
      default: Value;
    },
    vars: { [key: string]: Value }
  ): Value {
    for (const branch of args.branches) {
      const boolean = mongu(branch.case, vars);
      assert<boolean>(boolean, ['boolean']);
      if (boolean) {
        return mongu(branch.then, vars);
      }
    }
    return mongu(args.default, vars);
  },
};
