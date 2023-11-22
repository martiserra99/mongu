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
export default function mongu(expr: Value, data: Object<Value>): Value {
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
  // Boolean Operators
  $and(args: Value[], data: Object<Value>): Value {
    return args.every(expr => {
      const boolean = mongu(expr, data);
      assertIsBoolean(boolean);
      return boolean;
    });
  },
  $or(args: Value[], data: Object<Value>): Value {
    return args.some(expr => {
      const boolean = mongu(expr, data);
      assertIsBoolean(boolean);
      return boolean;
    });
  },
  $not(args: Value, data: Object<Value>): Value {
    const boolean = mongu(args, data);
    assertIsBoolean(boolean);
    return !boolean;
  },
  // Comparison Operators
  $eq(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    return number1 === number2;
  },
  $ne(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    return number1 !== number2;
  },
  $gt(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertIsNumber(number1);
    assertIsNumber(number2);
    return number1 > number2;
  },
  $lt(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertIsNumber(number1);
    assertIsNumber(number2);
    return number1 < number2;
  },
  $gte(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertIsNumber(number1);
    assertIsNumber(number2);
    return number1 >= number2;
  },
  $lte(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertIsNumber(number1);
    assertIsNumber(number2);
    return number1 <= number2;
  },
  $cmp(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertIsNumber(number1);
    assertIsNumber(number2);
    const result = number1 - number2;
    return result === 0 ? 0 : result / Math.abs(result);
  },
  // Arithmetic Operators
  $add(args: Value[], data: Object<Value>): Value {
    return args.reduce((acc: number, expr: Value) => {
      const number = mongu(expr, data);
      assertIsNumber(number);
      return acc + number;
    }, 0);
  },
  $subtract(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertIsNumber(number1);
    assertIsNumber(number2);
    return number1 - number2;
  },
  $multiply(args: Value[], data: Object<Value>): Value {
    return args.reduce((acc: number, expr: Value) => {
      const number = mongu(expr, data);
      assertIsNumber(number);
      return acc * number;
    }, 1);
  },
  $divide(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertIsNumber(number1);
    assertIsNumber(number2);
    return number1 / number2;
  },
  $mod(args: [Value, Value], data: Object<Value>): Value {
    const number1 = mongu(args[0], data);
    const number2 = mongu(args[1], data);
    assertIsNumber(number1);
    assertIsNumber(number2);
    return number1 % number2;
  },
  // String Operators
  $concat(args: Value[], data: Object<Value>): Value {
    const array = args.map(expr => {
      const string = mongu(expr, data);
      assertIsString(string);
      return string;
    });
    return array.join('');
  },
  $toLower(args: string, data: Object<Value>): Value {
    const string = mongu(args, data);
    assertIsString(string);
    return string.toLowerCase();
  },
  $toUpper(args: string, data: Object<Value>): Value {
    const string = mongu(args, data);
    assertIsString(string);
    return string.toUpperCase();
  },
  // Array Operators
  $size(args: Value, data: Object<Value>): Value {
    const array = mongu(args, data);
    assertIsArray(array);
    return array.length;
  },
  $filter(
    args: { input: Value; as: string; cond: Value },
    data: Object<Value>
  ): Value {
    const array = mongu(args.input, data);
    assertIsArray(array);
    const as = args.as ? `$${args.as}` : '$this';
    return array.filter(item => {
      const boolean = mongu(args.cond, { ...data, ...{ [as]: item } });
      assertIsBoolean(boolean);
      return boolean;
    });
  },
  $map(
    args: { input: Value; as: string; in: Value },
    data: Object<Value>
  ): Value {
    const array = mongu(args.input, data);
    assertIsArray(array);
    const as = args.as ? `$${args.as}` : '$this';
    return array.map(item => {
      return mongu(args.in, { ...data, ...{ [as]: item } });
    });
  },
  $reduce(args: { input: Value; in: Value }, data: Object<Value>): Value {
    const array = mongu(args.input, data);
    assertIsArray(array);
    return array.reduce((acc, item) => {
      return mongu(args.in, { ...data, ...{ $value: acc, $this: item } });
    });
  },
  $in(args: [Value, Value], data: Object<Value>): Value {
    const array = mongu(args[1], data);
    assertIsArray(array);
    return array.includes(mongu(args[0], data));
  },
  $nin(args: [Value, Value], data: Object<Value>): Value {
    const array = mongu(args[1], data);
    assertIsArray(array);
    return !array.includes(mongu(args[0], data));
  },
  $push(args: [Value, Value], data: Object<Value>): Value {
    const array = mongu(args[0], data);
    assertIsArray(array);
    return [...array, mongu(args[1], data)];
  },
  // Conditional Operators
  $cond(
    args: { if: Value; then: Value; else: Value },
    data: Object<Value>
  ): Value {
    const boolean = mongu(args.if, data);
    assertIsBoolean(boolean);
    if (boolean) return mongu(args.then, data);
    else return mongu(args.else, data);
  },
  $ifNull(args: Value[], data: Object<Value>): Value {
    for (const arg of args.slice(0, -1)) {
      const value = mongu(arg, data);
      if (value !== null) {
        return value;
      }
    }
    return mongu(args[args.length - 1], data);
  },
  // Variable Operators
  $let(args: { vars: Object<Value>; in: Value }, data: Object<Value>): Value {
    const vars = Object.fromEntries(
      Object.entries(args.vars).map(([key, expr]) => {
        return [`$${key}`, mongu(expr, data)];
      })
    );
    return mongu(args.in, { ...data, ...vars });
  },
};

function assertIsArray(a: Value): asserts a is Value[] {
  if (!Array.isArray(a)) throw new Error('Value is not an array');
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
