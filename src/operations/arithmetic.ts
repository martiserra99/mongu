import { mongu, Operations, Value, Object } from '../index';

export const arithmetic: Operations = {
  /**
   * Returns the absolute value of a number.
   * @param args A number.
   * @param data The variables.
   * @returns The absolute value of the number.
   */
  $abs(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.abs(number);
  },
  /**
   * Adds numbers together.
   * @param args An array of numbers.
   * @param data The variables.
   * @returns The sum of the numbers.
   */
  $add(args: Value[], data: Object<Value>): Value {
    return args.reduce((acc: number, expr: Value) => {
      const number = mongu(expr, data);
      assertNumber(number);
      return acc + number;
    }, 0);
  },
  /**
   * Returns the smallest integer greater than or equal to the specified number.
   * @param args A number.
   * @param data The variables.
   * @returns The smallest integer greater than or equal to the number.
   */
  $ceil(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.ceil(number);
  },
  /**
   * Divides one number by another.
   * @param args An array of numbers.
   * @param data The variables.
   * @returns The result of dividing the first number by the second.
   */
  $divide(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertNumber(number1);
    assertNumber(number2);
    return number1 / number2;
  },
  /**
   * Raises Euler's number to the specified exponent.
   * @param args A number.
   * @param data The variables.
   * @returns The Euler's number raised to the specified power.
   */
  $exp(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.exp(number);
  },
  /**
   * Returns the largest integer less than or equal to the specified number.
   * @param args A number.
   * @param data The variables.
   * @returns The largest integer less than or equal to the number.
   */
  $floor(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.floor(number);
  },
  /**
   * Calculates the natural logarithm of a number.
   * @param args A number.
   * @param data The variables.
   * @returns The natural logarithm of the number.
   */
  $ln(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.log(number);
  },
  /**
   * Calculates the log of a number in the specified base.
   * @param args An array of numbers.
   * @param data The variables.
   * @returns The log of the first number to the base specified by the second number.
   */
  $log(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertNumber(number1);
    assertNumber(number2);
    return Math.log(number1) / Math.log(number2);
  },
  /**
   * Calculates the log base 10 of a number.
   * @param args A number.
   * @param data The variables.
   * @returns The base 10 logarithm of the number.
   */
  $log10(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.log10(number);
  },
  /**
   * Divides one number by another and returns the remainder.
   * @param args An array of numbers.
   * @param data The variables.
   * @returns The remainder of the first number divided by the second.
   */
  $mod(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertNumber(number1);
    assertNumber(number2);
    return number1 % number2;
  },
  /**
   * Multiplies numbers together.
   * @param args An array of numbers.
   * @param data The variables.
   * @returns The product of the numbers.
   */
  $multiply(args: Value[], data: Object<Value>): Value {
    return args.reduce((acc: number, expr: Value) => {
      const number = mongu(expr, data);
      assertNumber(number);
      return acc * number;
    }, 1);
  },
  /**
   * Raises a number to the specified exponent.
   * @param args A number.
   * @param data The variables.
   * @returns The value of the number raised to the specified exponent.
   */
  $pow(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertNumber(number1);
    assertNumber(number2);
    return Math.pow(number1, number2);
  },
  /**
   * Rounds a number to a specified decimal place.
   * @param args A number.
   * @param data The variables.
   * @returns The rounded number.
   */
  $round(args: [Value, Value], data: Object<Value>): Value {
    const number = mongu(args[0], data);
    const places = mongu(args[1], data);
    assertNumber(number);
    assertNumber(places);
    const factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
  },
  /**
   * Calculates the square root of a positive number.
   * @param args A number.
   * @param data The variables.
   * @returns The square root of the number.
   */
  $sqrt(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.sqrt(number);
  },
  /**
   * Subtracts two numbers to return the difference.
   * @param args An array of numbers.
   * @param data The variables.
   * @returns The difference of the numbers.
   */
  $subtract(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertNumber(number1);
    assertNumber(number2);
    return number1 - number2;
  },
  /**
   * Truncates a number to a specified decimal place.
   * @param args An array of numbers.
   * @param data The variables.
   * @returns The truncated number.
   */
  $trunc(args: [Value, Value], data: Object<Value>): Value {
    const number = mongu(args[0], data);
    const places = mongu(args[1], data);
    assertNumber(number);
    assertNumber(places);
    const factor = Math.pow(10, places);
    return Math.trunc(number * factor) / factor;
  },
};

function assertNumber(a: Value): asserts a is number {
  if (typeof a !== 'number') throw new Error('Value is not a number');
}
