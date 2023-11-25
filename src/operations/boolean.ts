import { mongu, Operations, Value, Object } from '../index';

import { assertBoolean } from '../asserts';

export const boolean: Operations = {
  /**
   * Evaluates one or more expressions and returns true if all of the expressions are true. Otherwise, it returns false.
   * @param args An array of booleans.
   * @param data The variables.
   * @returns True if all of the expressions are true. Otherwise, false.
   */
  $and(args: Value[], data: Object<Value>): Value {
    return args.every(expr => {
      const bool = mongu(expr, data);
      assertBoolean(bool);
      return bool;
    });
  },
  /**
   * Evaluates a boolean and returns the opposite boolean value.
   * @param args A boolean.
   * @param data The variables.
   * @returns The opposite boolean value.
   */
  $not(args: Value, data: Object<Value>): Value {
    const bool = mongu(args, data);
    assertBoolean(bool);
    return !bool;
  },
  /**
   * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, it returns false.
   * @param args An array of booleans.
   * @param data The variables.
   * @returns True if any of the expressions are true. Otherwise, false.
   */
  $or(args: Value[], data: Object<Value>): Value {
    return args.some(expr => {
      const bool = mongu(expr, data);
      assertBoolean(bool);
      return bool;
    });
  },
};
