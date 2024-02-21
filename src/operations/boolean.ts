import { mongu } from '../index';

import { BooleanOperations, Value } from '../types';

import { assert } from '../assert';

export const boolean: BooleanOperations = {
  /**
   * Evaluates one or more expressions and returns true if all of the expressions are true. Otherwise, it returns false.
   * @param {Value[]} args An array of booleans (expressions evaluating to booleans).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if all of the expressions are true. Otherwise, false.
   * @example $and([true, true, true]) // true
   * @example $and([true, false, true]) // false
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
   * @param {Value} args A boolean (expression evaluating to a boolean).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} The opposite boolean value.
   * @example $not(true) // false
   * @example $not(false) // true
   */
  $not(args: Value, vars: { [key: string]: Value }): boolean {
    const boolean = mongu(args, vars);
    assert<boolean>(boolean, ['boolean']);
    return !boolean;
  },

  /**
   * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, it returns false.
   * @param {Value[]} args An array of booleans (expressions evaluating to booleans).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if any of the expressions are true. Otherwise, false.
   * @example $or([true, false, true]) // true
   * @example $or([false, false, false]) // false
   */
  $or(args: Value[], vars: { [key: string]: Value }): boolean {
    return args.some(expr => {
      const boolean = mongu(expr, vars);
      assert<boolean>(boolean, ['boolean']);
      return boolean;
    });
  },
};
