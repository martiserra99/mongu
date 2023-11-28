import { mongu, Operations, Value, Object } from '../index';

export const type: Operations = {
  /**
   * Converts a value to a specified type.
   * @param args The value and the type.
   * @param data The variables.
   * @returns The converted value.
   */
  $convert(args: { input: Value; to: Value }, data: Object<Value>): Value {
    const input = mongu(args.input, data);
    const to = mongu(args.to, data);
    if (to === 'bool') return Boolean(input);
    if (to === 'number') return Number(input);
    if (to === 'string') return String(input);
    throw new Error(`Invalid type: ${to}`);
  },
  /**
   * Returns true if the value is a boolean. Otherwise, it returns false.
   * @param args The value.
   * @param data The variables.
   * @returns The result.
   */
  $isBoolean(args: Value, data: Object<Value>): Value {
    const input = mongu(args, data);
    return typeof input === 'boolean';
  },
  /**
   * Returns true if the value is a number. Otherwise, it returns false.
   * @param args The value.
   * @param data The variables.
   * @returns The result.
   */
  $isNumber(args: Value, data: Object<Value>): Value {
    const input = mongu(args, data);
    return typeof input === 'number';
  },
  /**
   * Returns true if the value is a string. Otherwise, it returns false.
   * @param args The value.
   * @param data The variables.
   * @returns The result.
   */
  $isString(args: Value, data: Object<Value>): Value {
    const input = mongu(args, data);
    return typeof input === 'string';
  },
  /**
   * Converts a value to a boolean.
   * @param args The value.
   * @param data The variables.
   * @returns The converted value.
   */
  $toBoolean(args: Value, data: Object<Value>): Value {
    const input = mongu(args, data);
    return Boolean(input);
  },
  /**
   * Converts a value to a number.
   * @param args The value.
   * @param data The variables.
   * @returns The converted value.
   */
  $toNumber(args: Value, data: Object<Value>): Value {
    const input = mongu(args, data);
    return Number(input);
  },
  /**
   * Converts a value to a string.
   * @param args The value.
   * @param data The variables.
   * @returns The converted value.
   */
  $toString(args: Value, data: Object<Value>): Value {
    const input = mongu(args, data);
    return String(input);
  },
};
