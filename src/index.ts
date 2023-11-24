export type Primitive = string | number | boolean | null;
export type Object<T> = { [key: string]: T };
export type Value = Value[] | { [key: string]: Value } | Primitive;
export type Operation = (args: any, data: Object<Value>) => Value;
export type Operations = { [key: string]: Operation };

/**
 * It evaluates the mongo-like expression with the given data.
 *
 * @param expr The mongo-like expression.
 * @param data The data to evaluate the expression.
 * @returns The evaluated expression.
 */
export function mongu(expr: Value, data: Object<Value> = {}): Value {
  if (isArray(expr)) return monguArray(expr, data);
  if (isObject(expr)) return monguObject(expr, data);
  if (isString(expr)) return monguString(expr, data);
  return expr;
}

function isArray(expr: Value): expr is Value[] {
  return Array.isArray(expr);
}

function monguArray(expr: Value[], data: Object<Value>): Value {
  return expr.map(expr => mongu(expr, data));
}

function isObject(expr: Value): expr is Object<Value> {
  return typeof expr === 'object' && !Array.isArray(expr) && expr !== null;
}

function monguObject(expr: Object<Value>, data: Object<Value>): Value {
  if (isObjectOperation(expr)) return monguObjectOperation(expr, data);
  return monguObjectNotOperation(expr, data);
}

function isObjectOperation(expr: Object<Value>): boolean {
  return Object.keys(expr).length === 1 && Object.keys(expr)[0].startsWith('$');
}

function monguObjectOperation(expr: Object<Value>, data: Object<Value>): Value {
  const operator = Object.keys(expr)[0];
  const operation = operations[operator];
  return operation(expr[operator], data);
}

function monguObjectNotOperation(
  expr: Object<Value>,
  data: Object<Value>
): Value {
  return Object.fromEntries(
    Object.entries(expr).map(([key, expr]) => {
      return [evaluateStringNotVariable(key), mongu(expr, data)];
    })
  );
}

function isString(expr: Value): expr is string {
  return typeof expr === 'string';
}

function monguString(expr: string, data: Object<Value>): Value {
  if (isStringVariable(expr)) return monguStringVariable(expr, data);
  return evaluateStringNotVariable(expr);
}

function isStringVariable(expr: Value): boolean {
  return typeof expr === 'string' && expr.startsWith('$');
}

function monguStringVariable(expr: string, data: Object<Value>): Value {
  const parts = expr.slice(1).split('.');
  const value = parts.reduce((acc: Value, key: string): Value => {
    if (isObject(acc) && key in acc) return acc[key];
    throw new Error(`Variable ${key} not found`);
  }, data);
  return mongu(value, data);
}

function evaluateStringNotVariable(expr: string): Value {
  if (expr.startsWith('_')) return expr.slice(1);
  return expr;
}

const operations: Operations = {
  // ---- Arithmetic Operators ----
  /**
   * It receives an expression that evaluates to a number and returns the absolute value of the number.
   * @param args An expression that evaluates to a number.
   * @param data The variables.
   * @returns The absolute value of the number.
   */
  $abs(args: Value, data: Object<Value>): Value {
    const number = mongu(args, data);
    assertIsNumber(number);
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
      assertIsNumber(number);
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
    assertIsNumber(number);
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
    assertIsNumber(number1);
    assertIsNumber(number2);
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
    assertIsNumber(number);
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
    assertIsNumber(number);
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
    assertIsNumber(number);
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
    assertIsNumber(number1);
    assertIsNumber(number2);
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
    assertIsNumber(number);
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
    assertIsNumber(number1);
    assertIsNumber(number2);
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
      assertIsNumber(number);
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
    assertIsNumber(number1);
    assertIsNumber(number2);
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
    assertIsNumber(number);
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
    assertIsNumber(number);
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
    assertIsNumber(number1);
    assertIsNumber(number2);
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
    assertIsNumber(number);
    return Math.trunc(number);
  },
  // // Array
  // $arrayElemAt(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[0], data);
  //   assertIsArray(array);
  //   const index = mongu(args[1], data);
  //   assertIsNumber(index);
  //   return array[index];
  // },
  // $arrayToObject(args: Value[], data: Object<Value>): Value {
  //   const array = mongu(args, data);
  //   assertIsArray(array);
  //   return Object.fromEntries(array as any);
  // },
  // $concatArrays(args: Value[], data: Object<Value>): Value {
  //   const array = args.map(expr => {
  //     const array = mongu(expr, data);
  //     assertIsArray(array);
  //     return array;
  //   });
  //   return array.flat();
  // },
  // $filter(
  //   args: { input: Value; as?: string; cond: Value },
  //   data: Object<Value>
  // ): Value {
  //   const array = mongu(args.input, data);
  //   assertIsArray(array);
  //   const as = args.as ? `$${args.as}` : '$this';
  //   return array.filter(item => {
  //     const boolean = mongu(args.cond, { ...data, ...{ [as]: item } });
  //     assertIsBoolean(boolean);
  //     return boolean;
  //   });
  // },
  // $firstN(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[0], data);
  //   assertIsArray(array);
  //   const number = mongu(args[1], data);
  //   assertIsNumber(number);
  //   return array.slice(0, number);
  // },
  // $in(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[1], data);
  //   assertIsArray(array);
  //   return array.includes(mongu(args[0], data));
  // },
  // $indexOfArray(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[1], data);
  //   assertIsArray(array);
  //   return array.indexOf(mongu(args[0], data));
  // },
  // $isArray(args: Value, data: Object<Value>): Value {
  //   const array = mongu(args, data);
  //   return Array.isArray(array);
  // },
  // $lastN(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[0], data);
  //   assertIsArray(array);
  //   const number = mongu(args[1], data);
  //   assertIsNumber(number);
  //   return array.slice(-number);
  // },
  // $map(
  //   args: { input: Value; as?: string; in: Value },
  //   data: Object<Value>
  // ): Value {
  //   const array = mongu(args.input, data);
  //   assertIsArray(array);
  //   const as = args.as ? `$${args.as}` : '$this';
  //   return array.map(item => {
  //     return mongu(args.in, { ...data, ...{ [as]: item } });
  //   });
  // },
  // $maxN(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[0], data);
  //   assertIsArray(array);
  //   const number = mongu(args[1], data);
  //   assertIsNumber(number);
  //   return array
  //     .sort((a, b) => {
  //       assertIsNumber(a);
  //       assertIsNumber(b);
  //       return b - a;
  //     })
  //     .slice(0, number);
  // },
  // $minN(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[0], data);
  //   assertIsArray(array);
  //   const number = mongu(args[1], data);
  //   assertIsNumber(number);
  //   return array
  //     .sort((a, b) => {
  //       assertIsNumber(a);
  //       assertIsNumber(b);
  //       return a - b;
  //     })
  //     .slice(0, number);
  // },
  // $objectToArray(args: Value, data: Object<Value>): Value {
  //   const object = mongu(args, data);
  //   assertIsObject(object);
  //   return Object.entries(object).map(([k, v]) => ({ k, v }));
  // },
  // $range(args: [Value, Value, Value], data: Object<Value>): Value {
  //   const start = mongu(args[0], data);
  //   assertIsNumber(start);
  //   const end = mongu(args[1], data);
  //   assertIsNumber(end);
  //   const step = mongu(args[2], data);
  //   assertIsNumber(step);
  //   const array = [];
  //   for (let i = start; i < end; i += step) {
  //     array.push(i);
  //   }
  //   return array;
  // },
  // $reduce(
  //   args: { input: Value; initialValue: Value; in: Value },
  //   data: Object<Value>
  // ): Value {
  //   const array = mongu(args.input, data);
  //   assertIsArray(array);
  //   return array.reduce((acc, item) => {
  //     return mongu(args.in, { ...data, ...{ $value: acc, $this: item } });
  //   }, args.initialValue);
  // },
  // $reverseArray(args: Value, data: Object<Value>): Value {
  //   const array = mongu(args, data);
  //   assertIsArray(array);
  //   return array.reverse();
  // },
  // $size(args: Value, data: Object<Value>): Value {
  //   const array = mongu(args, data);
  //   assertIsArray(array);
  //   return array.length;
  // },
  // $slice(args: [Value, Value, Value?], data: Object<Value>): Value {
  //   const array = mongu(args[0], data);
  //   assertIsArray(array);
  //   const start = mongu(args[1], data);
  //   assertIsNumber(start);
  //   if (args[2]) {
  //     const end = mongu(args[2], data);
  //     assertIsNumber(end);
  //     return array.slice(start, end);
  //   }
  //   return array.slice(start);
  // },
  // $sortArray(
  //   args: { input: Value; sortBy?: Value },
  //   data: Object<Value>
  // ): Value {
  //   const array = mongu(args.input, data);
  //   assertIsArray(array);
  //   return array.sort((a, b) => {
  //     if (args.sortBy) {
  //       const number = mongu(args.sortBy, data);
  //       assertIsNumber(number);
  //       return number;
  //     }
  //     assertIsNumber(a);
  //     assertIsNumber(b);
  //     return a - b;
  //   });
  // },
  // Boolean Operators
  // $and(args: Value[], data: Object<Value>): Value {
  //   return args.every(expr => {
  //     const boolean = mongu(expr, data);
  //     assertIsBoolean(boolean);
  //     return boolean;
  //   });
  // },
  // $or(args: Value[], data: Object<Value>): Value {
  //   return args.some(expr => {
  //     const boolean = mongu(expr, data);
  //     assertIsBoolean(boolean);
  //     return boolean;
  //   });
  // },
  // $not(args: Value, data: Object<Value>): Value {
  //   const boolean = mongu(args, data);
  //   assertIsBoolean(boolean);
  //   return !boolean;
  // },
  // // Comparison Operators
  // $eq(args: [Value, Value], data: Object<Value>): Value {
  //   const number1 = mongu(args[0], data);
  //   const number2 = mongu(args[1], data);
  //   return number1 === number2;
  // },
  // $ne(args: [Value, Value], data: Object<Value>): Value {
  //   const number1 = mongu(args[0], data);
  //   const number2 = mongu(args[1], data);
  //   return number1 !== number2;
  // },
  // $gt(args: [Value, Value], data: Object<Value>): Value {
  //   const number1 = mongu(args[0], data);
  //   const number2 = mongu(args[1], data);
  //   assertIsNumber(number1);
  //   assertIsNumber(number2);
  //   return number1 > number2;
  // },
  // $lt(args: [Value, Value], data: Object<Value>): Value {
  //   const number1 = mongu(args[0], data);
  //   const number2 = mongu(args[1], data);
  //   assertIsNumber(number1);
  //   assertIsNumber(number2);
  //   return number1 < number2;
  // },
  // $gte(args: [Value, Value], data: Object<Value>): Value {
  //   const number1 = mongu(args[0], data);
  //   const number2 = mongu(args[1], data);
  //   assertIsNumber(number1);
  //   assertIsNumber(number2);
  //   return number1 >= number2;
  // },
  // $lte(args: [Value, Value], data: Object<Value>): Value {
  //   const number1 = mongu(args[0], data);
  //   const number2 = mongu(args[1], data);
  //   assertIsNumber(number1);
  //   assertIsNumber(number2);
  //   return number1 <= number2;
  // },
  // $cmp(args: [Value, Value], data: Object<Value>): Value {
  //   const number1 = mongu(args[0], data);
  //   const number2 = mongu(args[1], data);
  //   assertIsNumber(number1);
  //   assertIsNumber(number2);
  //   const result = number1 - number2;
  //   return result === 0 ? 0 : result / Math.abs(result);
  // },
  // // String Operators
  // $concat(args: Value[], data: Object<Value>): Value {
  //   const array = args.map(expr => {
  //     const string = mongu(expr, data);
  //     assertIsString(string);
  //     return string;
  //   });
  //   return array.join('');
  // },
  // $toLower(args: string, data: Object<Value>): Value {
  //   const string = mongu(args, data);
  //   assertIsString(string);
  //   return string.toLowerCase();
  // },
  // $toUpper(args: string, data: Object<Value>): Value {
  //   const string = mongu(args, data);
  //   assertIsString(string);
  //   return string.toUpperCase();
  // },
  // Array Operators
  // $size(args: Value, data: Object<Value>): Value {
  //   const array = mongu(args, data);
  //   assertIsArray(array);
  //   return array.length;
  // },
  // $filter(
  //   args: { input: Value; as: string; cond: Value },
  //   data: Object<Value>
  // ): Value {
  //   const array = mongu(args.input, data);
  //   assertIsArray(array);
  //   const as = args.as ? `$${args.as}` : '$this';
  //   return array.filter(item => {
  //     const boolean = mongu(args.cond, { ...data, ...{ [as]: item } });
  //     assertIsBoolean(boolean);
  //     return boolean;
  //   });
  // },
  // $map(
  //   args: { input: Value; as: string; in: Value },
  //   data: Object<Value>
  // ): Value {
  //   const array = mongu(args.input, data);
  //   assertIsArray(array);
  //   const as = args.as ? `$${args.as}` : '$this';
  //   return array.map(item => {
  //     return mongu(args.in, { ...data, ...{ [as]: item } });
  //   });
  // },
  // $reduce(args: { input: Value; in: Value }, data: Object<Value>): Value {
  //   const array = mongu(args.input, data);
  //   assertIsArray(array);
  //   return array.reduce((acc, item) => {
  //     return mongu(args.in, { ...data, ...{ $value: acc, $this: item } });
  //   });
  // },
  // $in(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[1], data);
  //   assertIsArray(array);
  //   return array.includes(mongu(args[0], data));
  // },
  // $nin(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[1], data);
  //   assertIsArray(array);
  //   return !array.includes(mongu(args[0], data));
  // },
  // $push(args: [Value, Value], data: Object<Value>): Value {
  //   const array = mongu(args[0], data);
  //   assertIsArray(array);
  //   return [...array, mongu(args[1], data)];
  // },
  // Conditional Operators
  // $cond(
  //   args: { if: Value; then: Value; else: Value },
  //   data: Object<Value>
  // ): Value {
  //   const boolean = mongu(args.if, data);
  //   assertIsBoolean(boolean);
  //   if (boolean) return mongu(args.then, data);
  //   else return mongu(args.else, data);
  // },
  // $ifNull(args: Value[], data: Object<Value>): Value {
  //   for (const arg of args.slice(0, -1)) {
  //     const value = mongu(arg, data);
  //     if (value !== null) {
  //       return value;
  //     }
  //   }
  //   return mongu(args[args.length - 1], data);
  // },
  // // Variable Operators
  // $let(args: { vars: Object<Value>; in: Value }, data: Object<Value>): Value {
  //   const vars = Object.fromEntries(
  //     Object.entries(args.vars).map(([key, expr]) => {
  //       return [`$${key}`, mongu(expr, data)];
  //     })
  //   );
  //   return mongu(args.in, { ...data, ...vars });
  // },
};

function assertIsArray(a: Value): asserts a is Value[] {
  if (!Array.isArray(a)) throw new Error('Value is not an array');
}

function assertIsObject(a: Value): asserts a is Object<Value> {
  if (typeof a !== 'object' || Array.isArray(a) || a === null)
    throw new Error('Value is not an object');
}

function assertIsString(a: Value): asserts a is string {
  if (typeof a !== 'string') throw new Error('Value is not a string');
}

function assertIsNumber(a: Value): asserts a is number {
  if (typeof a !== 'number') throw new Error('Value is not a number');
}

function assertIsBoolean(a: Value): asserts a is boolean {
  if (typeof a !== 'boolean') throw new Error('Value is not a boolean');
}
