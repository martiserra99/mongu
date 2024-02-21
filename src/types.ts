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
  /**
   * Returns the element at the specified index in an array.
   * @param {[Value, Value]} args The array and the index (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The element at the specified index in the array.
   */
  $arrayElemAt: Operation<[Value, Value], Value>;

  /**
   * Returns the concatenation of arrays.
   * @param {Value[]} args The input arrays (expressions evaluating to arrays).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The concatenation of the input arrays.
   */
  $concatArrays: Operation<Value[], Value[]>;

  /**
   * Returns a subset of an array based on the specified condition.
   * @param {{ input: Value; cond: Value; as: Value }} args The array, the condition, and the variable name (expressions evaluating to an array, a boolean, and a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The subset of the array.
   */
  $filter: Operation<{ input: Value; cond: Value; as: Value }, Value[]>;

  /**
   * Returns a specified number of elements from the beginning of an array.
   * @param {{ input: Value; n: Value }} args The array and the number of elements (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The specified number of elements from the beginning of the array.
   */
  $firstN: Operation<{ input: Value; n: Value }, Value[]>;

  /**
   * Returns a boolean indicating whether a value is in an array.
   * @param {[Value, Value]} args The value and the array (expressions evaluating to any type and an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} A boolean indicating whether the value is in the array.
   */
  $in: Operation<[Value, Value], boolean>;

  /**
   * Returns the index of the first occurrence of a value in an array.
   * @param {[Value, Value]} args The value and the array (expressions evaluating to any type and an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The index of the first occurrence of the value in the array.
   */
  $indexOfArray: Operation<[Value, Value], number>;

  /**
   * Returns a specified number of elements from the end of an array.
   * @param {{ input: Value; n: Value }} args The array and the number of elements (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The specified number of elements from the end of the array.
   */
  $lastN: Operation<{ input: Value; n: Value }, Value[]>;

  /**
   * Applies a specified expression to each element of an array and returns the result.
   * @param {{ input: Value; as: Value; in: Value }} args The array, the variable name, and the expression (expressions evaluating to an array, a string, and any type).
   */
  $map: Operation<{ input: Value; as: Value; in: Value }, Value[]>;

  /**
   * Returns the largest values in an array.
   * @param {{ input: Value; n: Value }} args The array and the number of values (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The largest values in the array.
   */
  $maxN: Operation<{ input: Value; n: Value }, Value[]>;

  /**
   * Returns the smallest values in an array.
   * @param {{ input: Value; n: Value }} args The array and the number of values (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The smallest values in the array.
   */
  $minN: Operation<{ input: Value; n: Value }, Value[]>;

  /**
   * Accumulates the elements of an array using an expression and returns the result.
   * @param {{ input: Value; initialValue: Value; in: Value }} args The array, the initial value, and the expression (expressions evaluating to an array, any type, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The result of accumulating the elements of the array.
   */
  $reduce: Operation<{ input: Value; initialValue: Value; in: Value }, Value>;

  /**
   * Reverses the elements of an array.
   * @param {Value} args The input array (expression evaluating to an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The reversed array.
   */
  $reverseArray: Operation<Value, Value[]>;

  /**
   * Returns the number of elements in an array.
   * @param {Value} args The input array (expression evaluating to an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The number of elements in the array.
   */
  $size: Operation<Value, number>;

  /**
   * Returns a subset of an array.
   * @param {[Value, Value, Value]} args The array, the starting index, and the number of elements (expressions evaluating to an array, a number, and a number).
   */
  $slice: Operation<[Value, Value, Value], Value[]>;

  /**
   * Sorts the elements of an array.
   * @param {{ input: Value; sortBy: Value }} args The array and the expression to sort by (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The sorted array.
   */
  $sortArray: Operation<{ input: Value; sortBy: Value }, Value[]>;
};

/**
 * It represents all the boolean operations that can be used in an expression.
 */
export type BooleanOperations = {
  /**
   * Evaluates one or more expressions and returns true if all of the expressions are true. Otherwise, it returns false.
   * @param {Value[]} args An array of booleans (expressions evaluating to booleans).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if all of the expressions are true. Otherwise, false.
   */
  $and: Operation<Value[], boolean>;

  /**
   * Evaluates a boolean and returns the opposite boolean value.
   * @param {Value} args A boolean (expression evaluating to a boolean).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} The opposite boolean value.
   */
  $not: Operation<Value, boolean>;

  /**
   * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, it returns false.
   * @param {Value[]} args An array of booleans (expressions evaluating to booleans).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if any of the expressions are true. Otherwise, false.
   */
  $or: Operation<Value[], boolean>;
};

/**
 * It represents all the comparison operations that can be used in an expression.
 */
export type ComparisonOperations = {
  /**
   * Compares two values and returns -1 if the first is less than the second, 1 if the first is greater than the second, and 0 if the two values are equal.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to strings or numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The result of comparing the two values.
   */
  $cmp: Operation<[Value, Value], number>;

  /**
   * Compares two values and returns true if they are equal. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the two values are equal. Otherwise, false.
   */
  $eq: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if the first is greater than the second. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to strings or numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the first value is greater than the second. Otherwise, false.
   */
  $gt: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if the first is greater than or equal to the second. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to strings or numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the first value is greater than or equal to the second. Otherwise, false.
   */
  $gte: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if the first is less than the second. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to strings or numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the first value is less than the second. Otherwise, false.
   */
  $lt: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if the first is less than or equal to the second. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to strings or numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the first value is less than or equal to the second. Otherwise, false.
   */
  $lte: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if they are not equal. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the two values are not equal. Otherwise, false.
   */
  $ne: Operation<[Value, Value], boolean>;
};

/**
 * It represents all the conditional operations that can be used in an expression.
 */
export type ConditionalOperations = {
  /**
   * Evaluates a boolean expression to return one of the two specified return expressions.
   * @param {{ if: Value; then: Value; else: Value }} args The condition, the value if true, and the value if false (expressions evaluating to a boolean, any type, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The 'then' value if the condition is true. Otherwise, the 'else' value.
   */
  $cond: Operation<{ if: Value; then: Value; else: Value }, Value>;

  /**
   * Evaluates input expressions for null values and returns the first non-null expression's value. Otherwise, it returns the last expression's value.
   * @param {Value[]} args The expressions (expressions evaluating to any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The first non-null expression's value. Otherwise, the last expression's value.
   */
  $ifNull: Operation<Value[], Value>;

  /**
   * Evaluates a series of case expressions. When it finds an expression which evaluates to true, it executes a specified expression and breaks out of the control flow. Otherwise, it returns the default value.
   * @param {{ branches: { case: Value; then: Value }[]; default: Value }} args The branches and the default value (expressions evaluating to booleans and any types).
   */
  $switch: Operation<
    { branches: { case: Value; then: Value }[]; default: Value },
    Value
  >;
};

/**
 * It represents all the object operations that can be used in an expression.
 */
export type ObjectOperations = {
  /**
   * Gets the value of a field in an object. If the field does not exist, it returns null.
   * @param {{ field: Value; input: Value }} args The field and the input object (expressions evaluating to a string and an object).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The value of the field.
   */
  $getField: Operation<{ field: Value; input: Value }, Value>;

  /**
   * Merges objects into a single object.
   * @param {Value[]} args The objects (expressions evaluating to objects).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {{ [key: string]: Value }} The merged object.
   */
  $mergeObjects: Operation<Value[], { [key: string]: Value }>;

  /**
   * Sets a field in an object to a specified value.
   * @param {{ field: Value; input: Value; value: Value }} args The field, the input object, and the value (expressions evaluating to a string, an object, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {{ [key: string]: Value }} The object with the field set to the value.
   */
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
