import { mongu } from '../index';

import { TypeOperations, Value } from '../types';

export const type: TypeOperations = {
  /**
   * Converts a value to a specified type.
   * @param {{ input: Value; to: Value }} args The value and the type (expressions evaluating to any type and a string that has to be 'bool', 'number', or 'string').
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean | number | string} The converted value.
   * @example $convert({ input: '5', to: 'number' }) // 5
   * @example $convert({ input: 5, to: 'string' }) // '5'
   * @example $convert({ input: 5, to: 'bool' }) // true
   */
  $convert(
    args: { input: Value; to: Value },
    vars: { [key: string]: Value }
  ): boolean | number | string {
    const input = mongu(args.input, vars);
    const to = mongu(args.to, vars);
    if (to === 'bool') return Boolean(input);
    if (to === 'number') return Number(input);
    if (to === 'string') return String(input);
    throw new Error(`Invalid type: ${to}`);
  },

  /**
   * Returns true if the value is a boolean. Otherwise, it returns false.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the value is a boolean. Otherwise, false.
   * @example $isBoolean(false) // true
   * @example $isBoolean(5) // false
   * @example $isBoolean('hello') // false
   */
  $isBoolean(args: Value, vars: { [key: string]: Value }): boolean {
    const input = mongu(args, vars);
    return typeof input === 'boolean';
  },

  /**
   * Returns true if the value is a number. Otherwise, it returns false.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the value is a number. Otherwise, false.
   * @example $isNumber(5) // true
   * @example $isNumber(true) // false
   * @example $isNumber('hello') // false
   */
  $isNumber(args: Value, vars: { [key: string]: Value }): boolean {
    const input = mongu(args, vars);
    return typeof input === 'number';
  },

  /**
   * Returns true if the value is a string. Otherwise, it returns false.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the value is a string. Otherwise, false.
   * @example $isString('hello') // true
   * @example $isString(5) // false
   * @example $isString(true) // false
   */
  $isString(args: Value, vars: { [key: string]: Value }): boolean {
    const input = mongu(args, vars);
    return typeof input === 'string';
  },

  /**
   * Converts a value to a boolean.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} The converted value.
   * @example $toBoolean('hello') // true
   * @example $toBoolean('') // false
   * @example $toBoolean(5) // true
   * @example $toBoolean(0) // false
   */
  $toBoolean(args: Value, vars: { [key: string]: Value }): boolean {
    const input = mongu(args, vars);
    return Boolean(input);
  },

  /**
   * Converts a value to a number. If the value cannot be converted, it returns null.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number | null} The converted value.
   * @example $toNumber('5') // 5
   * @example $toNumber('hello') // null
   */
  $toNumber(args: Value, vars: { [key: string]: Value }): number | null {
    const input = mongu(args, vars);
    return isNaN(Number(input)) ? null : Number(input);
  },

  /**
   * Converts a value to a string.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The converted value.
   * @example $toString(5) // '5'
   * @example $toString(true) // 'true'
   */
  $toString(args: Value, vars: { [key: string]: Value }): string {
    const input = mongu(args, vars);
    return String(input);
  },
};
