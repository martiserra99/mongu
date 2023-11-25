import { mongu, Operations, Value, Object } from '../index';

import { assertBoolean } from '../asserts';

export const conditional: Operations = {
  /**
   * Evaluates a boolean expression to return one of the two specified return expressions.
   * @param args The condition, the value if true, and the value if false.
   * @param data The variables.
   * @returns The value if true, or the value if false.
   */
  $cond(
    args: { if: Value; then: Value; else: Value },
    data: Object<Value>
  ): Value {
    const bool = mongu(args.if, data);
    assertBoolean(bool);
    return bool ? mongu(args.then, data) : mongu(args.else, data);
  },
  /**
   * Evaluates input expressions for null values and returns the first non-null expression's value.
   * @param args The expressions.
   * @param data The variables.
   * @returns The first non-null expression's value.
   */
  $ifNull(args: Value[], data: Object<Value>): Value {
    for (const arg of args.slice(0, -1)) {
      const value = mongu(arg, data);
      if (value !== null) {
        return value;
      }
    }
    return mongu(args[args.length - 1], data);
  },
  /**
   * Evaluates a series of case expressions. When it finds an expression which evaluates to true, it executes a specified expression and breaks out of the control flow.
   * @param args The branches and the default value.
   * @param data The variables.
   * @returns The value of the executed expression.
   */
  $switch(
    args: { branches: { case: Value; then: Value }[]; default: Value },
    data: Object<Value>
  ): Value {
    for (const branch of args.branches) {
      const bool = mongu(branch.case, data);
      assertBoolean(bool);
      if (bool) {
        return mongu(branch.then, data);
      }
    }
    return mongu(args.default, data);
  },
};
