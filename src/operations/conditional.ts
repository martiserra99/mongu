import { mongu } from '../index';

import { ConditionalOperations, Value } from '../types';

export const conditional: ConditionalOperations = {
  /**
   * Evaluates a boolean expression to return one of the two specified return expressions.
   * @param {{ if: Value; then: Value; else: Value }} args The condition, the value if true, and the value if false (expressions evaluating to a boolean, any type, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The 'then' value if the condition is true. Otherwise, the 'else' value.
   * @example $cond({ if: true, then: 'yes', else: 'no' }) // 'yes'
   * @example $cond({ if: false, then: 'yes', else: 'no' }) // 'no'
   */
  $cond(
    args: { if: Value; then: Value; else: Value },
    vars: { [key: string]: Value }
  ): Value {
    return mongu(args.if, vars)
      ? mongu(args.then, vars)
      : mongu(args.else, vars);
  },

  /**
   * Evaluates input expressions for null values and returns the first non-null expression's value. Otherwise, it returns the last expression's value.
   * @param {Value[]} args The expressions (expressions evaluating to any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The first non-null expression's value. Otherwise, the last expression's value.
   * @example $ifNull([null, 'hello', 'bye']) // 'hello'
   * @example $ifNull([null, null, 'bye']) // 'bye'
   * @example $ifNull([null, null, null]) // null
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
   * Evaluates a series of case expressions. When it finds an expression which evaluates to true, it returns the value of the corresponding expression. If no expression is true, it returns the value of the default expression.
   * @param {{ branches: { case: Value; then: Value }[]; default: Value }} args The branches and the default value (expressions evaluating to booleans and any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The value of the first true expression. Otherwise, the default value.
   * @example $switch({ branches: [{ case: false, then: 1 }, { case: true, then: 2 }], default: 3 } }) // 2
   * @example $switch({ branches: [{ case: false, then: 1 }, { case: false, then: 2 }], default: 3 } }) // 3
   */
  $switch(
    args: {
      branches: { case: Value; then: Value }[];
      default: Value;
    },
    vars: { [key: string]: Value }
  ): Value {
    for (const branch of args.branches) {
      if (mongu(branch.case, vars)) {
        return mongu(branch.then, vars);
      }
    }
    return mongu(args.default, vars);
  },
};
