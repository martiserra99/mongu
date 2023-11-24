import { mongu, Operations, Value, Object } from '../index';

export const arithmetic: Operations = {
  /**
   * It receives an expression that evaluates to a number and returns the absolute value of the number.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The absolute value of the number.
   */
  $abs(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.abs(number);
  },
  /**
   * It receives an array of expressions that evaluate to numbers and returns the sum of the numbers.
   * @param args An array of expressions that evaluate to numbers.
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
   * It receives an expression that evaluates to a number and returns the smallest integer greater than or equal to the number.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The smallest integer greater than or equal to the number.
   */
  $ceil(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.ceil(number);
  },
  /**
   * It receives an array of expressions that evaluate to numbers and returns the result of dividing the first number by the second.
   * @param args An array of expressions that evaluate to numbers.
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
   * It receives an expression that evaluates to a number and returns Euler's number e raised to the specified power.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The Euler's number e raised to the specified power.
   */
  $exp(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.exp(number);
  },
  /**
   * It receives an expression that evaluates to a number and returns the largest integer less than or equal to the number.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The largest integer less than or equal to the number.
   */
  $floor(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.floor(number);
  },
  /**
   * It receives an expression that evaluates to a number and returns the natural logarithm of the number.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The natural logarithm of the number.
   */
  $ln(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.log(number);
  },
  /**
   * It receives an array of expressions that evaluate to numbers and returns the log of the first number to the base specified by the second number.
   * @param args An array of expressions that evaluate to numbers.
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
   * It receives an expression that evaluates to a number and returns the base 10 logarithm of the number.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The base 10 logarithm of the number.
   */
  $log10(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.log10(number);
  },
  /**
   * It receives an array of expressions that evaluate to numbers and returns the remainder of the first number divided by the second.
   * @param args An array of expressions that evaluate to numbers.
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
   * It receives an array of expressions that evaluate to numbers and returns the product of the numbers.
   * @param args An array of expressions that evaluate to numbers.
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
   * It receives an expression that evaluates to a number and returns the value of the number raised to the specified exponent.
   * @param args An expression that evaluates to a number.
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
   * It receives an expression that evaluates to a number and returns the rounded number.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The rounded number.
   */
  $round(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.round(number);
  },
  /**
   * It receives an expression that evaluates to a number and returns the square root of the number.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The square root of the number.
   */
  $sqrt(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.sqrt(number);
  },
  /**
   * It receives an array of expressions that evaluate to numbers and returns the difference of the numbers.
   * @param args An array of expressions that evaluate to numbers.
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
   * It receives an expression that evaluates to a number and returns the truncated number.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The truncated number.
   */
  $trunc(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertNumber(number);
    return Math.trunc(number);
  },
};

function assertNumber(a: Value): asserts a is number {
  if (typeof a !== 'number') throw new Error('Value is not a number');
}
