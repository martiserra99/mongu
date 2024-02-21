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
   * @example $abs(-5) // 5
   * @example $abs(5) // 5
   */
  $abs: Operation<Value, number>;

  /**
   * Adds numbers together.
   * @param {Value[]} args The input values (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The sum of the input values.
   * @example $add([1, 2, 3]) // 6
   * @example $add([1, 2, 3, 4]) // 10
   */
  $add: Operation<Value[], number>;

  /**
   * Returns the smallest integer greater than or equal to the specified number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The smallest integer greater than or equal to the input value.
   * @example $ceil(5.5) // 6
   * @example $ceil(5.1) // 6
   */
  $ceil: Operation<Value, number>;

  /**
   * Divides one number by another.
   * @param {[Value, Value]} args The dividend and divisor (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The result of dividing the dividend by the divisor.
   * @example $divide([10, 2]) // 5
   * @example $divide([10, 3]) // 3.3333333333333335
   */
  $divide: Operation<[Value, Value], number>;

  /**
   * Raises Euler's number to the specified exponent.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} Euler's number raised to the specified power.
   * @example $exp(1) // 2.718281828459045
   * @example $exp(2) // 7.3890560989306495
   */
  $exp: Operation<Value, number>;

  /**
   * Returns the largest integer less than or equal to the specified number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The largest integer less than or equal to the input value.
   * @example $floor(5.5) // 5
   * @example $floor(5.1) // 5
   */
  $floor: Operation<Value, number>;

  /**
   * Returns the natural logarithm of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The natural logarithm of the input value.
   * @example $ln(1) // 0
   * @example $ln(2.718281828459045) // 1
   */
  $ln: Operation<Value, number>;

  /**
   * Returns the logarithm of a number in a specified base.
   * @param {[Value, Value]} args The number and base (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The logarithm of the number in the specified base.
   * @example $log([10, 10]) // 1
   * @example $log([100, 10]) // 2
   */
  $log: Operation<[Value, Value], number>;

  /**
   * Returns the base 10 logarithm of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The base 10 logarithm of the input value.
   * @example $log10(1) // 0
   * @example $log10(10) // 1
   */
  $log10: Operation<Value, number>;

  /**
   * Returns the remainder of dividing one number by another.
   * @param {[Value, Value]} args The dividend and divisor (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The remainder of dividing the dividend by the divisor.
   * @example $mod([10, 3]) // 1
   * @example $mod([10, 2]) // 0
   */
  $mod: Operation<[Value, Value], number>;

  /**
   * Multiplies numbers together.
   * @param {Value[]} args The input values (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The product of the input values.
   * @example $multiply([1, 2, 3]) // 6
   */
  $multiply: Operation<Value[], number>;

  /**
   * Raises a number to the specified exponent.
   * @param {[Value, Value]} args The base and exponent (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The base raised to the specified power.
   * @example $pow([2, 3]) // 8
   * @example $pow([3, 2]) // 9
   */
  $pow: Operation<[Value, Value], number>;

  /**
   * Rounds a number to the nearest integer.
   * @param {[Value, Value]} args The input value and the number of decimal places (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The input value rounded to the nearest value with the specified number of decimal places.
   * @example $round([5.5, 0]) // 6
   * @example $round([5.5, 1]) // 5.5
   */
  $round: Operation<[Value, Value], number>;

  /**
   * Returns the square root of a number.
   * @param {Value} args The input value (expression evaluating to a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The square root of the input value.
   * @example $sqrt(4) // 2
   * @example $sqrt(9) // 3
   */
  $sqrt: Operation<Value, number>;

  /**
   * Subtracts one number from another.
   * @param {[Value, Value]} args The minuend and subtrahend (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The result of subtracting the subtrahend from the minuend.
   * @example $subtract([5, 3]) // 2
   * @example $subtract([3, 5]) // -2
   */
  $subtract: Operation<[Value, Value], number>;

  /**
   * Truncates a number to the specified number of decimal places.
   * @param {[Value, Value]} args The input value and the number of decimal places (expressions evaluating to numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The input value truncated to the specified number of decimal places.
   * @example $trunc(5.5) // 5
   * @example $trunc(5.5, 1) // 5.5
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
   * @example $arrayElemAt([1, 2, 3], 0) // 1
   * @example $arrayElemAt([1, 2, 3], 1) // 2
   * @example $arrayElemAt([1, 2, 3], 3) // null
   */
  $arrayElemAt: Operation<[Value, Value], Value>;

  /**
   * Returns the concatenation of arrays.
   * @param {Value[]} args The input arrays (expressions evaluating to arrays).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The concatenation of the input arrays.
   * @example $concatArrays([1, 2], [3, 4]) // [1, 2, 3, 4]
   * @example $concatArrays(['hello', ' '], ['world']) // ['hello', ' ', 'world']
   * @example $concatArrays(['hello', ' '], [['world']]) // ['hello', ' ', ['world']]
   */
  $concatArrays: Operation<Value[], Value[]>;

  /**
   * Returns a subset of an array based on the specified condition.
   * @param {{ input: Value; cond: Value; as: Value }} args The array, the condition, and the variable name (expressions evaluating to an array, a boolean, and a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The subset of the array.
   * @example $filter({ input: [1, 2, 3, 4], as: 'num', cond: { $gt: ['$$num', 2] } }) // [3, 4]
   */
  $filter: Operation<{ input: Value; cond: Value; as: Value }, Value[]>;

  /**
   * Returns a specified number of elements from the beginning of an array.
   * @param {{ input: Value; n: Value }} args The array and the number of elements (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The specified number of elements from the beginning of the array.
   * @example $firstN({ n: 2, input: [1, 2, 3] }) // [1, 2]
   * @example $firstN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $firstN({ n: 2, input: [1] } }) // [1]
   */
  $firstN: Operation<{ input: Value; n: Value }, Value[]>;

  /**
   * Returns a boolean indicating whether a value is in an array.
   * @param {[Value, Value]} args The value and the array (expressions evaluating to any type and an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} A boolean indicating whether the value is in the array.
   * @example $in({ $in: [2, [1, 2, 3]] }) // true
   * @example $in({ $in: [4, [1, 2, 3]] }) // false
   * @example $in({ $in: ['world', ['hello', 'world']] }) // true
   */
  $in: Operation<[Value, Value], boolean>;

  /**
   * Returns the index of the first occurrence of a value in an array. If the value is not in the array, it returns -1.
   * @param {[Value, Value]} args The value and the array (expressions evaluating to any type and an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The index of the first occurrence of the value in the array.
   * @example $indexOfArray([['a', 'abc'], 'a']) // 0
   * @example $indexOfArray([[1, 2], 5]) // -1
   */
  $indexOfArray: Operation<[Value, Value], number>;

  /**
   * Returns a specified number of elements from the end of an array.
   * @param {{ input: Value; n: Value }} args The array and the number of elements (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The specified number of elements from the end of the array.
   * @example $lastN({ n: 2, input: [1, 2, 3] }) // [2, 3]
   * @example $lastN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $lastN({ n: 2, input: [1] } }) // [1]
   */
  $lastN: Operation<{ input: Value; n: Value }, Value[]>;

  /**
   * Applies a specified expression to each element of an array and returns the result.
   * @param {{ input: Value; as: Value; in: Value }} args The array, the variable name, and the expression (expressions evaluating to an array, a string, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The result of applying the expression to each element of the array.
   * @example $map({ input: [1, 2, 3], as: 'num', in: { $add: ['$$num', 1] } }) // [2, 3, 4]
   * @example $map({ input: ['a', 'b'], as: 'str', in: { $toUpper: '$$str' } } }) // ['A', 'B']
   */
  $map: Operation<{ input: Value; as: Value; in: Value }, Value[]>;

  /**
   * Returns the largest values in an array.
   * @param {{ input: Value; n: Value }} args The array and the number of values (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The largest values in the array.
   * @example $maxN({ n: 2, input: [3, 7, 2, 4] } }) // [7, 4]
   * @example $maxN({ n: 3, input: [3, 7, 2, 4] } }) // [7, 4, 3]
   * @example $maxN({ n: 5, input: [3, 7, 2, 4] } }) // [7, 4, 3, 2]
   */
  $maxN: Operation<{ input: Value; n: Value }, Value[]>;

  /**
   * Returns the smallest values in an array.
   * @param {{ input: Value; n: Value }} args The array and the number of values (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The smallest values in the array.
   * @example $minN({ n: 2, input: [3, 7, 2, 4] } }) // [2, 3]
   * @example $minN({ n: 3, input: [3, 7, 2, 4] } }) // [2, 3, 4]
   * @example $minN({ n: 5, input: [3, 7, 2, 4] } }) // [2, 3, 4, 7]
   */
  $minN: Operation<{ input: Value; n: Value }, Value[]>;

  /**
   * Accumulates the elements of an array using an expression and returns the result.
   * @param {{ input: Value; initialValue: Value; in: Value }} args The array, the initial value, and the expression (expressions evaluating to an array, any type, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The result of accumulating the elements of the array.
   * @example $reduce({ input: ['a', 'b', 'c'], initialValue: '', in: { $concat: ['$$value', '$$this'] } }) // 'abc'
   * @example $reduce({ input: [1, 2, 3], initialValue: 0, in: { $add: ['$$value', '$$this'] } } }) // 6
   */
  $reduce: Operation<{ input: Value; initialValue: Value; in: Value }, Value>;

  /**
   * Reverses the elements of an array.
   * @param {Value} args The input array (expression evaluating to an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The reversed array.
   * @example $reverseArray([4, 2, 3]) // [3, 2, 4]
   * @example $reverseArray(['a', 'c', 'b']) // ['b', 'c', 'a']
   */
  $reverseArray: Operation<Value, Value[]>;

  /**
   * Returns the number of elements in an array.
   * @param {Value} args The input array (expression evaluating to an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The number of elements in the array.
   * @example $size([1, 2, 3]) // 3
   * @example $size(['a', 'b', 'c', 'd']) // 4
   * @example $size([]) // 0
   */
  $size: Operation<Value, number>;

  /**
   * Returns a subset of an array.
   * @param {[Value, Value, Value]} args The array, the starting index, and the number of elements (expressions evaluating to an array, a number, and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The subset of the array.
   * @example $slice([[1, 2, 3], 1, 1]) // [2]
   * @example $slice([[1, 2, 3], 1, 2]) // [2, 3]
   * @example $slice([[1, 2, 3], 1, 3]) // [2, 3]
   * @example $slice([[1, 2, 3], 3, 2]) // []
   */
  $slice: Operation<[Value, Value, Value], Value[]>;

  /**
   * Sorts the elements of an array.
   * @param {{ input: Value; sortBy: Value }} args The array and the expression to sort by (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The sorted array.
   * @example $sortArray({ input: [3, 4, 2], sortBy: { $cmp: ['$$first', '$$second'] } }) // [2, 3, 4]
   * @example $sortArray({ input: [3, 4, 2], sortBy: { $cmp: ['$$second', '$$first'] } }) // [4, 3, 2]
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
   * @example $and([true, true, true]) // true
   * @example $and([true, false, true]) // false
   */
  $and: Operation<Value[], boolean>;

  /**
   * Evaluates a boolean and returns the opposite boolean value.
   * @param {Value} args A boolean (expression evaluating to a boolean).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} The opposite boolean value.
   * @example $not(true) // false
   * @example $not(false) // true
   */
  $not: Operation<Value, boolean>;

  /**
   * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, it returns false.
   * @param {Value[]} args An array of booleans (expressions evaluating to booleans).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if any of the expressions are true. Otherwise, false.
   * @example $or([true, false, true]) // true
   * @example $or([false, false, false]) // false
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
   * @example $cmp([3, 5]) // -1
   * @example $cmp([5, 3]) // 1
   * @example $cmp([3, 3]) // 0
   */
  $cmp: Operation<[Value, Value], number>;

  /**
   * Compares two values and returns true if they are equal. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the two values are equal. Otherwise, false.
   * @example $eq([3, 3]) // true
   * @example $eq(['hello', 'bye']) // false
   */
  $eq: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if the first is greater than the second. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to strings or numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the first value is greater than the second. Otherwise, false.
   * @example $gt([5, 3]) // true
   * @example $gt([3, 5]) // false
   * @example $gt([3, 3]) // false
   */
  $gt: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if the first is greater than or equal to the second. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to strings or numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the first value is greater than or equal to the second. Otherwise, false.
   * @example $gte([5, 3]) // true
   * @example $gte([3, 5]) // false
   * @example $gte([3, 3]) // true
   */
  $gte: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if the first is less than the second. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to strings or numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the first value is less than the second. Otherwise, false.
   * @example $lt([3, 5]) // true
   * @example $lt([5, 3]) // false
   * @example $lt([3, 3]) // false
   */
  $lt: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if the first is less than or equal to the second. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to strings or numbers).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the first value is less than or equal to the second. Otherwise, false.
   * @example $lte([3, 5]) // true
   * @example $lte([5, 3]) // false
   * @example $lte([3, 3]) // true
   */
  $lte: Operation<[Value, Value], boolean>;

  /**
   * Compares two values and returns true if they are not equal. Otherwise, it returns false.
   * @param {[Value, Value]} args An array of two values (expressions evaluating to any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the two values are not equal. Otherwise, false.
   * @example $ne([3, 3]) // false
   * @example $ne(['hello', 'bye']) // true
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
   * @example $cond({ if: true, then: 'yes', else: 'no' }) // 'yes'
   * @example $cond({ if: false, then: 'yes', else: 'no' }) // 'no'
   */
  $cond: Operation<{ if: Value; then: Value; else: Value }, Value>;

  /**
   * Evaluates input expressions for null values and returns the first non-null expression's value. Otherwise, it returns the last expression's value.
   * @param {Value[]} args The expressions (expressions evaluating to any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The first non-null expression's value. Otherwise, the last expression's value.
   * @example $ifNull([null, 'hello', 'bye']) // 'hello'
   * @example $ifNull([null, null, 'bye']) // 'bye'
   * @example $ifNull([null, null, null]) // null
   */
  $ifNull: Operation<Value[], Value>;

  /**
   * Evaluates a series of case expressions. When it finds an expression which evaluates to true, it returns the value of the corresponding expression. If no expression is true, it returns the value of the default expression.
   * @param {{ branches: { case: Value; then: Value }[]; default: Value }} args The branches and the default value (expressions evaluating to booleans and any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The value of the first true expression. Otherwise, the default value.
   * @example $switch({ branches: [{ case: false, then: 1 }, { case: true, then: 2 }], default: 3 } }) // 2
   * @example $switch({ branches: [{ case: false, then: 1 }, { case: false, then: 2 }], default: 3 } }) // 3
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
   * @example $getField({ field: 'qty', input: { item: 'apple', qty: 25, price: 4.5 } }) // 25
   */
  $getField: Operation<{ field: Value; input: Value }, Value>;

  /**
   * Merges objects into a single object.
   * @param {Value[]} args The objects (expressions evaluating to objects).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {{ [key: string]: Value }} The merged object.
   * @example $mergeObjects([{ item: 'apple', qty: 5, price: 2.5 }, { qty: 10, price: 1.2, sale: true }]) // { item: 'apple', qty: 10, price: 1.2, sale: true }
   */
  $mergeObjects: Operation<Value[], { [key: string]: Value }>;

  /**
   * Sets a field in an object to a specified value.
   * @param {{ field: Value; input: Value; value: Value }} args The field, the input object, and the value (expressions evaluating to a string, an object, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {{ [key: string]: Value }} The object with the field set to the value.
   * @example $setField({ field: 'item', input: { qty: 25, price: 4.5 }, value: 'apple' }) // { item: 'apple', qty: 25, price: 4.5 }
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
  /**
   * Concatenates strings together.
   * @param {Value[]} args The input strings (expressions evaluating to strings).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The result of concatenating the input strings.
   * @example $concat(['hello', ' ', 'world']) // 'hello world'
   */
  $concat: Operation<Value[], string>;

  /**
   * Removes whitespace from the beginning of a string.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The string with the whitespace removed from the beginning.
   * @example $ltrim('  hello') // 'hello'
   */
  $ltrim: Operation<Value, string>;

  /**
   * Performs a regular expression and returns true if there is a match. Otherwise, it returns false.
   * @param {[Value, Value]} args A string and a regular expression (expressions evaluating to strings).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} A boolean indicating if there is a match.
   * @example $regexMatch(['hello', '/ell/']) // true
   * @example $regexMatch(['hello', '/bye/']) // false
   */
  $regexMatch: Operation<[Value, Value], boolean>;

  /**
   * Removes whitespace from the end of a string.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The string with the whitespace removed from the end.
   * @example $rtrim('hello  ') // 'hello'
   */
  $rtrim: Operation<Value, string>;

  /**
   * Divides a string into an array of substrings based on a delimiter.
   * @param {[Value, Value]} args A string and a delimiter (expressions evaluating to strings).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string[]} The array of substrings.
   * @example $split(['June-15-2013', '-']) // ['June', '15', '2013']
   * @example $split(['hello world', ' ']) // ['hello', 'world']
   */
  $split: Operation<[Value, Value], string[]>;

  /**
   * Returns the length of a string.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The length of the input string.
   * @example $strLen('hello') // 5
   */
  $strLen: Operation<Value, number>;

  /**
   * Returns a substring of a string.
   * @param {[Value, Value, Value]} args The input string, the starting index, and the number of characters (expressions evaluating to a string, a number, and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The substring of the input string.
   * @example $substr(['hello', 0, 2]) // 'he'
   */
  $substr: Operation<[Value, Value, Value], string>;

  /**
   * Returns the string converted to lowercase.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The input string converted to lowercase.
   * @example $toLower('Marti Serra') // 'marti serra'
   */
  $toLower: Operation<Value, string>;

  /**
   * Removes whitespace from the beginning and end of a string.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The string with the whitespace removed from the beginning and end.
   * @example $trim('  hello  ') // 'hello'
   */
  $trim: Operation<Value, string>;

  /**
   * Returns the string converted to uppercase.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The input string converted to uppercase.
   * @example $toUpper('Marti Serra') // 'MARTI SERRA'
   */
  $toUpper: Operation<Value, string>;
};

/**
 * It represents all the type operations that can be used in an expression.
 */
export type TypeOperations = {
  /**
   * Converts a value to a specified type.
   * @param {{ input: Value; to: Value }} args The value and the type (expressions evaluating to any type and a string that has to be 'bool', 'number', or 'string').
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean | number | string} The converted value.
   * @example $convert({ input: '5', to: 'number' }) // 5
   * @example $convert({ input: 5, to: 'string' }) // '5'
   * @example $convert({ input: 5, to: 'bool' }) // true
   */
  $convert: Operation<{ input: Value; to: Value }, boolean | number | string>;

  /**
   * Returns true if the value is a boolean. Otherwise, it returns false.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the value is a boolean. Otherwise, false.
   * @example $isBoolean(false) // true
   * @example $isBoolean(5) // false
   * @example $isBoolean('hello') // false
   */
  $isBoolean: Operation<Value, boolean>;

  /**
   * Returns true if the value is a number. Otherwise, it returns false.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the value is a number. Otherwise, false.
   * @example $isNumber(5) // true
   * @example $isNumber(true) // false
   * @example $isNumber('hello') // false
   */
  $isNumber: Operation<Value, boolean>;

  /**
   * Returns true if the value is a string. Otherwise, it returns false.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} True if the value is a string. Otherwise, false.
   * @example $isString('hello') // true
   * @example $isString(5) // false
   * @example $isString(true) // false
   */
  $isString: Operation<Value, boolean>;

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
  $toBoolean: Operation<Value, boolean>;

  /**
   * Converts a value to a number. If the value cannot be converted, it returns null.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number | null} The converted value.
   * @example $toNumber('5') // 5
   * @example $toNumber('hello') // null
   */
  $toNumber: Operation<Value, number | null>;

  /**
   * Converts a value to a string.
   * @param {Value} args The value (expression evaluating to any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The converted value.
   * @example $toString(5) // '5'
   * @example $toString(true) // 'true'
   */
  $toString: Operation<Value, string>;
};

/**
 * It represents all the variable operations that can be used in an expression.
 */
export type VariableOperations = {
  /**
   * Binds variables for use in the specified expression, and returns the result of the expression.
   * @param {{ vars: { [key: string]: Value }; in: Value }} args The variables and the expression (expressions evaluating to any types).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The result of the expression.
   * @example $let({ vars: { age: 24 }, in: { isAdult: { $gte: ['$$age', 18] } } }) // { isAdult: true }
   */
  $let: Operation<{ vars: { [key: string]: Value }; in: Value }, Value>;
};
