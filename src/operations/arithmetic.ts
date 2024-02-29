import { mongu } from '../index';

import { ArithmeticOperations, Value } from '../types';

export const arithmetic: ArithmeticOperations = {
  /**
   * Returns the absolute value of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The absolute value of the input value.
   * @example $abs(-5) // 5
   * @example $abs(5) // 5
   */
  $abs(args: Value, vars: { [key: string]: Value }): number {
    const number = Number(mongu(args, vars));
    return Math.abs(number);
  },

  /**
   * Adds numbers together.
   * @param {Value[]} args The input values (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The sum of the input values.
   * @example $add([1, 2, 3]) // 6
   * @example $add([1, 2, 3, 4]) // 10
   */
  $add(args: Value[], vars: { [key: string]: Value }): number {
    return args.reduce((acc: number, expr: Value) => {
      const number = Number(mongu(expr, vars));
      return acc + number;
    }, 0);
  },

  /**
   * Returns the smallest integer greater than or equal to the specified number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The smallest integer greater than or equal to the input value.
   * @example $ceil(5.5) // 6
   * @example $ceil(5.1) // 6
   */
  $ceil(args: Value, vars: { [key: string]: Value }): number {
    const number = Number(mongu(args, vars));
    return Math.ceil(number);
  },

  /**
   * Divides one number by another.
   * @param {[Value, Value]} args The dividend and divisor (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The result of dividing the dividend by the divisor.
   * @example $divide([10, 2]) // 5
   * @example $divide([10, 3]) // 3.3333333333333335
   */
  $divide(args: [Value, Value], vars: { [key: string]: Value }): number {
    const number1 = Number(mongu(args[0], vars));
    const number2 = Number(mongu(args[1], vars));
    return number1 / number2;
  },

  /**
   * Raises Euler's number to the specified exponent.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} Euler's number raised to the specified power.
   * @example $exp(1) // 2.718281828459045
   * @example $exp(2) // 7.3890560989306495
   */
  $exp(args: Value, vars: { [key: string]: Value }): number {
    const number = Number(mongu(args, vars));
    return Math.exp(number);
  },

  /**
   * Returns the largest integer less than or equal to the specified number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The largest integer less than or equal to the input value.
   * @example $floor(5.5) // 5
   * @example $floor(5.1) // 5
   */
  $floor(args: Value, vars: { [key: string]: Value }): number {
    const number = Number(mongu(args, vars));
    return Math.floor(number);
  },

  /**
   * Returns the natural logarithm of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The natural logarithm of the input value.
   * @example $ln(1) // 0
   * @example $ln(2.718281828459045) // 1
   */
  $ln(args: Value, vars: { [key: string]: Value }): number {
    const number = Number(mongu(args, vars));
    return Math.log(number);
  },

  /**
   * Returns the logarithm of a number in a specified base.
   * @param {[Value, Value]} args The number and base (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The logarithm of the number in the specified base.
   * @example $log([10, 10]) // 1
   * @example $log([100, 10]) // 2
   */
  $log(args: [Value, Value], vars: { [key: string]: Value }): number {
    const number1 = Number(mongu(args[0], vars));
    const number2 = Number(mongu(args[1], vars));
    return Math.log(number1) / Math.log(number2);
  },

  /**
   * Returns the base 10 logarithm of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The base 10 logarithm of the input value.
   * @example $log10(1) // 0
   * @example $log10(10) // 1
   */
  $log10(args: Value, vars: { [key: string]: Value }): number {
    const number = Number(mongu(args, vars));
    return Math.log10(number);
  },

  /**
   * Returns the remainder of dividing one number by another.
   * @param {[Value, Value]} args The dividend and divisor (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The remainder of dividing the dividend by the divisor.
   * @example $mod([10, 3]) // 1
   * @example $mod([10, 2]) // 0
   */
  $mod(args: [Value, Value], vars: { [key: string]: Value }): number {
    const number1 = Number(mongu(args[0], vars));
    const number2 = Number(mongu(args[1], vars));
    return number1 % number2;
  },

  /**
   * Multiplies numbers together.
   * @param {Value[]} args The input values (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The product of the input values.
   * @example $multiply([1, 2, 3]) // 6
   */
  $multiply(args: Value[], vars: { [key: string]: Value }): number {
    return args.reduce((acc: number, expr: Value) => {
      const number = Number(mongu(expr, vars));
      return acc * number;
    }, 1);
  },

  /**
   * Raises a number to the specified exponent.
   * @param {[Value, Value]} args The base and exponent (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The base raised to the specified power.
   * @example $pow([2, 3]) // 8
   * @example $pow([3, 2]) // 9
   */
  $pow(args: [Value, Value], vars: { [key: string]: Value }): number {
    const number1 = Number(mongu(args[0], vars));
    const number2 = Number(mongu(args[1], vars));
    return Math.pow(number1, number2);
  },

  /**
   * Rounds a number to the nearest integer.
   * @param {[Value, Value]} args The input value and the number of decimal places (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The input value rounded to the nearest value with the specified number of decimal places.
   * @example $round([5.5, 0]) // 6
   * @example $round([5.5, 1]) // 5.5
   */
  $round(args: [Value, Value], vars: { [key: string]: Value }): number {
    const number = Number(mongu(args[0], vars));
    const places = Number(mongu(args[1], vars));
    const factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
  },

  /**
   * Returns the square root of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The square root of the input value.
   * @example $sqrt(4) // 2
   * @example $sqrt(9) // 3
   */
  $sqrt(args: Value, vars: { [key: string]: Value }): number {
    const number = Number(mongu(args, vars));
    return Math.sqrt(number);
  },

  /**
   * Subtracts one number from another.
   * @param {[Value, Value]} args The minuend and subtrahend (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The result of subtracting the subtrahend from the minuend.
   * @example $subtract([5, 3]) // 2
   * @example $subtract([3, 5]) // -2
   */
  $subtract(args: [Value, Value], vars: { [key: string]: Value }): number {
    const number1 = Number(mongu(args[0], vars));
    const number2 = Number(mongu(args[1], vars));
    return number1 - number2;
  },

  /**
   * Truncates a number to the specified number of decimal places.
   * @param {[Value, Value]} args The input value and the number of decimal places (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The input value truncated to the specified number of decimal places.
   * @example $trunc(5.5) // 5
   * @example $trunc(5.5, 1) // 5.5
   */
  $trunc(args: [Value, Value], vars: { [key: string]: Value }): number {
    const number = Number(mongu(args[0], vars));
    const places = Number(mongu(args[1], vars));
    const factor = Math.pow(10, places);
    return Math.trunc(number * factor) / factor;
  },
};
