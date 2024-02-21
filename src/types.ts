/**
 * It represents a primitive value that can be a string, number, boolean, or null.
 */
export type Primitive = string | number | boolean | null;

/**
 * It represents a value that can be a primitive, an object, or an array.
 */
export type Value = { [key: string]: Value } | Value[] | Primitive;

/**
 * Represents an operation that takes input arguments and variables, and returns a result.
 * @template T - The type of input arguments.
 * @template U - The type of the result.
 * @param {T} args - The input arguments for the operation.
 * @param {Object.<string, Value>} vars - An object representing variables used by the operation.
 * @returns {U} - The result of the operation.
 */
export type Operation<T extends Value, U extends Value> = (
  args: T,
  vars: { [key: string]: Value }
) => U;

/**
 * It represents all the operations that can be used in an expression.
 */
export type Operations = ArithmeticOperations &
  ArrayOperations &
  BooleanOperations &
  ComparisonOperations &
  ConditionalOperations &
  ObjectOperations &
  StringOperations &
  TypeOperations &
  VariableOperations;

/**
 * It represents all the arithmetic operations that can be used in an expression.
 */
export type ArithmeticOperations = {
  /**
   * Returns the absolute value of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The absolute value of the input value.
   */
  $abs: Operation<Value, number>;

  /**
   * Adds numbers together.
   * @param {Value[]} args The input values (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The sum of the input values.
   */
  $add: Operation<Value[], number>;

  /**
   * Returns the smallest integer greater than or equal to the specified number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The smallest integer greater than or equal to the input value.
   */
  $ceil: Operation<Value, number>;

  /**
   * Divides one number by another.
   * @param {[Value, Value]} args The dividend and divisor (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The result of dividing the dividend by the divisor.
   */
  $divide: Operation<[Value, Value], number>;

  /**
   * Raises Euler's number to the specified exponent.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} Euler's number raised to the specified power.
   */
  $exp: Operation<Value, number>;

  /**
   * Returns the largest integer less than or equal to the specified number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The largest integer less than or equal to the input value.
   */
  $floor: Operation<Value, number>;

  /**
   * Returns the natural logarithm of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The natural logarithm of the input value.
   */
  $ln: Operation<Value, number>;

  /**
   * Returns the logarithm of a number in a specified base.
   * @param {[Value, Value]} args The number and base (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The logarithm of the number in the specified base.
   */
  $log: Operation<[Value, Value], number>;

  /**
   * Returns the base 10 logarithm of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The base 10 logarithm of the input value.
   */
  $log10: Operation<Value, number>;

  /**
   * Returns the remainder of dividing one number by another.
   * @param {[Value, Value]} args The dividend and divisor (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The remainder of dividing the dividend by the divisor.
   */
  $mod: Operation<[Value, Value], number>;

  /**
   * Multiplies numbers together.
   * @param {Value[]} args The input values (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The product of the input values.
   */
  $multiply: Operation<Value[], number>;

  /**
   * Raises a number to the specified exponent.
   * @param {[Value, Value]} args The base and exponent (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The base raised to the specified power.
   */
  $pow: Operation<[Value, Value], number>;

  /**
   * Rounds a number to the nearest integer.
   * @param {[Value, Value]} args The input value and the number of decimal places (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The input value rounded to the nearest value with the specified number of decimal places.
   */
  $round: Operation<[Value, Value], number>;

  /**
   * Returns the square root of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The square root of the input value.
   */
  $sqrt: Operation<Value, number>;

  /**
   * Subtracts one number from another.
   * @param {[Value, Value]} args The minuend and subtrahend (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The result of subtracting the subtrahend from the minuend.
   */
  $subtract: Operation<[Value, Value], number>;

  /**
   * Truncates a number to the specified number of decimal places.
   * @param {[Value, Value]} args The input value and the number of decimal places (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The input value truncated to the specified number of decimal places.
   */
  $trunc: Operation<[Value, Value], number>;
};

/**
 * It represents all the array operations that can be used in an expression.
 */
export type ArrayOperations = {
  $arrayElemAt: Operation<[Value, Value], Value>;
  $concatArrays: Operation<Value[], Value[]>;
  $filter: Operation<{ input: Value; cond: Value; as: Value }, Value[]>;
  $firstN: Operation<{ input: Value; n: Value }, Value[]>;
  $in: Operation<[Value, Value], boolean>;
  $indexOfArray: Operation<[Value, Value], number>;
  $lastN: Operation<{ input: Value; n: Value }, Value[]>;
  $map: Operation<{ input: Value; as: Value; in: Value }, Value[]>;
  $maxN: Operation<{ input: Value; n: Value }, Value[]>;
  $minN: Operation<{ input: Value; n: Value }, Value[]>;
  $reduce: Operation<{ input: Value; initialValue: Value; in: Value }, Value>;
  $reverseArray: Operation<Value, Value[]>;
  $size: Operation<Value, number>;
  $slice: Operation<[Value, Value, Value], Value[]>;
  $sortArray: Operation<{ input: Value; sortBy: Value }, Value[]>;
};

/**
 * It represents all the boolean operations that can be used in an expression.
 */
export type BooleanOperations = {
  $and: Operation<Value[], boolean>;
  $not: Operation<Value, boolean>;
  $or: Operation<Value[], boolean>;
};

/**
 * It represents all the comparison operations that can be used in an expression.
 */
export type ComparisonOperations = {
  $cmp: Operation<[Value, Value], number>;
  $eq: Operation<[Value, Value], boolean>;
  $gt: Operation<[Value, Value], boolean>;
  $gte: Operation<[Value, Value], boolean>;
  $lt: Operation<[Value, Value], boolean>;
  $lte: Operation<[Value, Value], boolean>;
  $ne: Operation<[Value, Value], boolean>;
};

/**
 * It represents all the conditional operations that can be used in an expression.
 */
export type ConditionalOperations = {
  $cond: Operation<{ if: Value; then: Value; else: Value }, Value>;
  $ifNull: Operation<Value[], Value>;
  $switch: Operation<
    { branches: { case: Value; then: Value }[]; default: Value },
    Value
  >;
};

/**
 * It represents all the object operations that can be used in an expression.
 */
export type ObjectOperations = {
  $getField: Operation<{ field: Value; input: Value }, Value>;
  $mergeObjects: Operation<Value[], { [key: string]: Value }>;
  $setField: Operation<
    { field: Value; input: Value; value: Value },
    { [key: string]: Value }
  >;
};

/**
 * It represents all the string operations that can be used in an expression.
 */
export type StringOperations = {
  $concat: Operation<Value[], string>;
  $ltrim: Operation<Value, string>;
  $regexMatch: Operation<[Value, Value], boolean>;
  $rtrim: Operation<Value, string>;
  $split: Operation<[Value, Value], string[]>;
  $strLen: Operation<Value, number>;
  $substr: Operation<[Value, Value, Value], string>;
  $toLower: Operation<Value, string>;
  $trim: Operation<Value, string>;
  $toUpper: Operation<Value, string>;
};

/**
 * It represents all the type operations that can be used in an expression.
 */
export type TypeOperations = {
  $convert: Operation<{ input: Value; to: Value }, boolean | number | string>;
  $isBoolean: Operation<Value, boolean>;
  $isNumber: Operation<Value, boolean>;
  $isString: Operation<Value, boolean>;
  $toBoolean: Operation<Value, boolean>;
  $toNumber: Operation<Value, number | null>;
  $toString: Operation<Value, string>;
};

/**
 * It represents all the variable operations that can be used in an expression.
 */
export type VariableOperations = {
  $let: Operation<{ vars: { [key: string]: Value }; in: Value }, Value>;
};
