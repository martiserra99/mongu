import { mongu } from '../index';

import { TypeOperations, Value } from '../types';

export const type: TypeOperations = {
  /**
   * Converts a value to a specified type.
   * @param args The value and the type.
   * @param vars The variables.
   * @returns The converted value.
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
   * @param args The value.
   * @param vars The variables.
   * @returns The result.
   */
  $isBoolean(args: Value, vars: { [key: string]: Value }): boolean {
    const input = mongu(args, vars);
    return typeof input === 'boolean';
  },
  /**
   * Returns true if the value is a number. Otherwise, it returns false.
   * @param args The value.
   * @param vars The variables.
   * @returns The result.
   */
  $isNumber(args: Value, vars: { [key: string]: Value }): boolean {
    const input = mongu(args, vars);
    return typeof input === 'number';
  },
  /**
   * Returns true if the value is a string. Otherwise, it returns false.
   * @param args The value.
   * @param vars The variables.
   * @returns The result.
   */
  $isString(args: Value, vars: { [key: string]: Value }): boolean {
    const input = mongu(args, vars);
    return typeof input === 'string';
  },
  /**
   * Converts a value to a boolean.
   * @param args The value.
   * @param vars The variables.
   * @returns The converted value.
   */
  $toBoolean(args: Value, vars: { [key: string]: Value }): boolean {
    const input = mongu(args, vars);
    return Boolean(input);
  },
  /**
   * Converts a value to a number.
   * @param args The value.
   * @param vars The variables.
   * @returns The converted value.
   */
  $toNumber(args: Value, vars: { [key: string]: Value }): number | null {
    const input = mongu(args, vars);
    return isNaN(Number(input)) ? null : Number(input);
  },
  /**
   * Converts a value to a string.
   * @param args The value.
   * @param vars The variables.
   * @returns The converted value.
   */
  $toString(args: Value, vars: { [key: string]: Value }): string {
    const input = mongu(args, vars);
    return String(input);
  },
};
