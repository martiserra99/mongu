import { mongu } from '../index';

import { BooleanOperations, Value } from '../types';

import { assert } from '../assert';

export const boolean: BooleanOperations = {
  /**
   * Evaluates one or more expressions and returns true if all of the expressions are true. Otherwise, it returns false.
   * @param args An array of booleans.
   * @param vars The variables.
   * @returns True if all of the expressions are true. Otherwise, false.
   */
  $and(args: Value[], vars: { [key: string]: Value }): boolean {
    return args.every(expr => {
      const boolean = mongu(expr, vars);
      assert<boolean>(boolean, ['boolean']);
      return boolean;
    });
  },
  /**
   * Evaluates a boolean and returns the opposite boolean value.
   * @param args A boolean.
   * @param vars The variables.
   * @returns The opposite boolean value.
   */
  $not(args: Value, vars: { [key: string]: Value }): boolean {
    const boolean = mongu(args, vars);
    assert<boolean>(boolean, ['boolean']);
    return !boolean;
  },
  /**
   * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, it returns false.
   * @param args An array of booleans.
   * @param vars The variables.
   * @returns True if any of the expressions are true. Otherwise, false.
   */
  $or(args: Value[], vars: { [key: string]: Value }): boolean {
    return args.some(expr => {
      const boolean = mongu(expr, vars);
      assert<boolean>(boolean, ['boolean']);
      return boolean;
    });
  },
};
