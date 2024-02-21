import { mongu } from '../index';

import { ArrayOperations, Value } from '../types';

import { assert } from '../assert';

export const array: ArrayOperations = {
  /**
   * Returns the element at the specified index in an array.
   * @param {[Value, Value]} args The array and the index (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The element at the specified index in the array.
   * @example $arrayElemAt([1, 2, 3], 0) // 1
   * @example $arrayElemAt([1, 2, 3], 1) // 2
   * @example $arrayElemAt([1, 2, 3], 3) // null
   */
  $arrayElemAt(args: [Value, Value], vars: { [key: string]: Value }): Value {
    const array = mongu(args[0], vars);
    assert<Value[]>(array, ['array']);
    const index = mongu(args[1], vars);
    assert<number>(index, ['number']);
    return array[index] ?? null;
  },

  /**
   * Returns the concatenation of arrays.
   * @param {Value[]} args The input arrays (expressions evaluating to arrays).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The concatenation of the input arrays.
   * @example $concatArrays([1, 2], [3, 4]) // [1, 2, 3, 4]
   * @example $concatArrays(['hello', ' '], ['world']) // ['hello', ' ', 'world']
   * @example $concatArrays(['hello', ' '], [['world']]) // ['hello', ' ', ['world']]
   */
  $concatArrays(args: Value[], vars: { [key: string]: Value }): Value[] {
    return args.reduce((acc: Value[], expr: Value) => {
      const array = mongu(expr, vars);
      assert<Value[]>(array, ['array']);
      return acc.concat(array);
    }, []);
  },

  /**
   * Returns a subset of an array based on the specified condition.
   * @param {{ input: Value; cond: Value; as: Value }} args The array, the condition, and the variable name (expressions evaluating to an array, a boolean, and a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The subset of the array.
   * @example $filter({ input: [1, 2, 3, 4], as: 'num', cond: { $gt: ['$$num', 2] } }) // [3, 4]
   */
  $filter(
    args: { input: Value; cond: Value; as: Value },
    vars: { [key: string]: Value }
  ): Value[] {
    const array = mongu(args.input, vars);
    assert<Value[]>(array, ['array']);
    const as = mongu(args.as, vars);
    assert<string>(as, ['string']);
    return array.filter(value => {
      return mongu(args.cond, { ...vars, [`$${as}`]: value });
    });
  },

  /**
   * Returns a specified number of elements from the beginning of an array.
   * @param {{ input: Value; n: Value }} args The array and the number of elements (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The specified number of elements from the beginning of the array.
   * @example $firstN({ n: 2, input: [1, 2, 3] }) // [1, 2]
   * @example $firstN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $firstN({ n: 2, input: [1] } }) // [1]
   */
  $firstN(
    args: { input: Value; n: Value },
    vars: { [key: string]: Value }
  ): Value[] {
    const array = mongu(args.input, vars);
    assert<Value[]>(array, ['array']);
    const n = mongu(args.n, vars);
    assert<number>(n, ['number']);
    return array.slice(0, n);
  },

  /**
   * Returns a boolean indicating whether a value is in an array.
   * @param {[Value, Value]} args The value and the array (expressions evaluating to any type and an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} A boolean indicating whether the value is in the array.
   * @example $in({ $in: [2, [1, 2, 3]] }) // true
   * @example $in({ $in: [4, [1, 2, 3]] }) // false
   * @example $in({ $in: ['world', ['hello', 'world']] }) // true
   */
  $in(args: [Value, Value], vars: { [key: string]: Value }): boolean {
    const value = mongu(args[0], vars);
    const array = mongu(args[1], vars);
    assert<Value[]>(array, ['array']);
    return array.includes(value);
  },

  /**
   * Returns the index of the first occurrence of a value in an array. If the value is not in the array, it returns -1.
   * @param {[Value, Value]} args The value and the array (expressions evaluating to any type and an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The index of the first occurrence of the value in the array.
   * @example $indexOfArray([['a', 'abc'], 'a']) // 0
   * @example $indexOfArray([[1, 2], 5]) // -1
   */
  $indexOfArray(args: [Value, Value], vars: { [key: string]: Value }): number {
    const array = mongu(args[0], vars);
    assert<Value[]>(array, ['array']);
    const value = mongu(args[1], vars);
    return array.indexOf(value);
  },

  /**
   * Returns a specified number of elements from the end of an array.
   * @param {{ input: Value; n: Value }} args The array and the number of elements (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The specified number of elements from the end of the array.
   * @example $lastN({ n: 2, input: [1, 2, 3] }) // [2, 3]
   * @example $lastN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $lastN({ n: 2, input: [1] } }) // [1]
   */
  $lastN(
    args: { input: Value; n: Value },
    vars: { [key: string]: Value }
  ): Value[] {
    const array = mongu(args.input, vars);
    assert<Value[]>(array, ['array']);
    const n = mongu(args.n, vars);
    assert<number>(n, ['number']);
    return array.slice(-n);
  },

  /**
   * Applies a specified expression to each element of an array and returns the result.
   * @param {{ input: Value; as: Value; in: Value }} args The array, the variable name, and the expression (expressions evaluating to an array, a string, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The result of applying the expression to each element of the array.
   * @example $map({ input: [1, 2, 3], as: 'num', in: { $add: ['$$num', 1] } }) // [2, 3, 4]
   * @example $map({ input: ['a', 'b'], as: 'str', in: { $toUpper: '$$str' } } }) // ['A', 'B']
   */
  $map(
    args: { input: Value; as: Value; in: Value },
    vars: { [key: string]: Value }
  ): Value[] {
    const array = mongu(args.input, vars);
    assert<Value[]>(array, ['array']);
    const as = mongu(args.as, vars);
    assert<string>(as, ['string']);
    return array.map(value => {
      return mongu(args.in, { ...vars, [`$${as}`]: value });
    });
  },

  /**
   * Returns the largest values in an array.
   * @param {{ input: Value; n: Value }} args The array and the number of values (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The largest values in the array.
   * @example $maxN({ n: 2, input: [3, 7, 2, 4] } }) // [7, 4]
   * @example $maxN({ n: 3, input: [3, 7, 2, 4] } }) // [7, 4, 3]
   * @example $maxN({ n: 5, input: [3, 7, 2, 4] } }) // [7, 4, 3, 2]
   */
  $maxN(
    args: { input: Value; n: Value },
    vars: { [key: string]: Value }
  ): Value[] {
    const array = mongu(args.input, vars);
    assert<Value[]>(array, ['array']);
    const n = mongu(args.n, vars);
    assert<number>(n, ['number']);
    return array
      .sort((a, b) => {
        assert<number>(a, ['number']);
        assert<number>(b, ['number']);
        return b - a;
      })
      .slice(0, n);
  },

  /**
   * Returns the smallest values in an array.
   * @param {{ input: Value; n: Value }} args The array and the number of values (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The smallest values in the array.
   * @example $minN({ n: 2, input: [3, 7, 2, 4] } }) // [2, 3]
   * @example $minN({ n: 3, input: [3, 7, 2, 4] } }) // [2, 3, 4]
   * @example $minN({ n: 5, input: [3, 7, 2, 4] } }) // [2, 3, 4, 7]
   */
  $minN(
    args: { input: Value; n: Value },
    vars: { [key: string]: Value }
  ): Value[] {
    const array = mongu(args.input, vars);
    assert<Value[]>(array, ['array']);
    const n = mongu(args.n, vars);
    assert<number>(n, ['number']);
    return array
      .sort((a, b) => {
        assert<number>(a, ['number']);
        assert<number>(b, ['number']);
        return a - b;
      })
      .slice(0, n);
  },

  /**
   * Accumulates the elements of an array using an expression and returns the result.
   * @param {{ input: Value; initialValue: Value; in: Value }} args The array, the initial value, and the expression (expressions evaluating to an array, any type, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The result of accumulating the elements of the array.
   * @example $reduce({ input: ['a', 'b', 'c'], initialValue: '', in: { $concat: ['$$value', '$$this'] } }) // 'abc'
   * @example $reduce({ input: [1, 2, 3], initialValue: 0, in: { $add: ['$$value', '$$this'] } } }) // 6
   */
  $reduce(
    args: { input: Value; initialValue: Value; in: Value },
    vars: { [key: string]: Value }
  ): Value {
    const array = mongu(args.input, vars);
    assert<Value[]>(array, ['array']);
    const initialValue = mongu(args.initialValue, vars);
    return array.reduce((acc, value) => {
      return mongu(args.in, { ...vars, $value: acc, $this: value });
    }, initialValue);
  },

  /**
   * Reverses the elements of an array.
   * @param {Value} args The input array (expression evaluating to an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The reversed array.
   * @example $reverseArray([4, 2, 3]) // [3, 2, 4]
   * @example $reverseArray(['a', 'c', 'b']) // ['b', 'c', 'a']
   */
  $reverseArray(args: Value, vars: { [key: string]: Value }): Value[] {
    const array = mongu(args, vars);
    assert<Value[]>(array, ['array']);
    return array.reverse();
  },

  /**
   * Returns the number of elements in an array.
   * @param {Value} args The input array (expression evaluating to an array).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The number of elements in the array.
   * @example $size([1, 2, 3]) // 3
   * @example $size(['a', 'b', 'c', 'd']) // 4
   * @example $size([]) // 0
   */
  $size(args: Value, vars: { [key: string]: Value }): number {
    const array = mongu(args, vars);
    assert<Value[]>(array, ['array']);
    return array.length;
  },

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
  $slice(args: [Value, Value, Value], vars: { [key: string]: Value }): Value[] {
    const array = mongu(args[0], vars);
    assert<Value[]>(array, ['array']);
    const position = mongu(args[1], vars);
    assert<number>(position, ['number']);
    const n = mongu(args[2], vars);
    assert<number>(n, ['number']);
    return array.slice(position, position + n);
  },

  /**
   * Sorts the elements of an array.
   * @param {{ input: Value; sortBy: Value }} args The array and the expression to sort by (expressions evaluating to an array and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value[]} The sorted array.
   * @example $sortArray({ input: [3, 4, 2], sortBy: { $cmp: ['$$first', '$$second'] } }) // [2, 3, 4]
   * @example $sortArray({ input: [3, 4, 2], sortBy: { $cmp: ['$$second', '$$first'] } }) // [4, 3, 2]
   */
  $sortArray(
    args: { input: Value; sortBy: Value },
    vars: { [key: string]: Value }
  ): Value[] {
    const array = mongu(args.input, vars);
    assert<Value[]>(array, ['array']);
    return array.sort((a, b) => {
      const c = mongu(args.sortBy, { ...vars, $first: a, $second: b });
      assert<number>(c, ['number']);
      return c;
    });
  },
};
