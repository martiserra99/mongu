import { mongu } from '../index';

import { ArrayOperations, Value } from '../types';

import { assert } from '../assert';

export const array: ArrayOperations = {
  /**
   * Returns the element at the specified array index.
   * @param args The array and the index.
   * @param vars The variables.
   * @returns The element at the specified array index.
   */
  $arrayElemAt(args: [Value, Value], vars: { [key: string]: Value }): Value {
    const array = mongu(args[0], vars);
    assert<Value[]>(array, ['array']);
    const index = mongu(args[1], vars);
    assert<number>(index, ['number']);
    return array[index] ?? null;
  },
  /**
   * Concatenates arrays to return the concatenated array.
   * @param args The arrays.
   * @param vars The variables.
   * @returns The concatenated array.
   */
  $concatArrays(args: Value[], vars: { [key: string]: Value }): Value[] {
    return args.reduce((acc: Value[], expr: Value) => {
      const array = mongu(expr, vars);
      assert<Value[]>(array, ['array']);
      return acc.concat(array);
    }, []);
  },
  /**
   * Selects a subset of an array to return based on the specified condition.
   * @param args The array, the condition, and the variable name.
   * @param vars The variables.
   * @returns The subset of the array.
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
   * @param args The array and the number of elements.
   * @param vars The variables.
   * @returns The specified number of elements from the beginning of the array.
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
   * Returns a boolean indicating whether a specified value is in an array.
   * @param args The value and the array.
   * @param vars The variables.
   * @returns A boolean indicating whether a specified value is in an array.
   */
  $in(args: [Value, Value], vars: { [key: string]: Value }): boolean {
    const value = mongu(args[0], vars);
    const array = mongu(args[1], vars);
    assert<Value[]>(array, ['array']);
    return array.includes(value);
  },
  /**
   * Searches an array for an occurrence of a specified value and returns the array index of the first occurrence.
   * @param args The value and the array.
   * @param vars The variables.
   * @returns The array index of the first occurrence of the specified value.
   */
  $indexOfArray(args: [Value, Value], vars: { [key: string]: Value }): number {
    const array = mongu(args[0], vars);
    assert<Value[]>(array, ['array']);
    const value = mongu(args[1], vars);
    return array.indexOf(value);
  },
  /**
   * Returns a specified number of elements from the end of an array.
   * @param args The array and the number of elements.
   * @param vars The variables.
   * @returns The specified number of elements from the end of the array.
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
   * Applies an expression to each item in an array and returns an array with the applied results.
   * @param args The array, the variable name, and the expression.
   * @param vars The variables.
   * @returns The array with the applied results.
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
   * Returns the n largest values in an array.
   * @param args The array and the number of values.
   * @param vars The variables.
   * @returns The n largest values in the array.
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
   * Returns the n smallest values in an array.
   * @param args The array and the number of values.
   * @param vars The variables.
   * @returns The n smallest values in the array.
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
   * Applies an expression to each element in an array and combines them into a single value.
   * @param args The array, the initial value, and the expression.
   * @param vars The variables.
   * @returns The combined value.
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
   * Accepts an array expression as an argument and returns an array with the elements in reverse order.
   * @param args The array.
   * @param vars The variables.
   * @returns The array with the elements in reverse order.
   */
  $reverseArray(args: Value, vars: { [key: string]: Value }): Value[] {
    const array = mongu(args, vars);
    assert<Value[]>(array, ['array']);
    return array.reverse();
  },
  /**
   * Counts and returns the total number of items in an array.
   * @param args The array.
   * @param vars The variables.
   * @returns The total number of items in the array.
   */
  $size(args: Value, vars: { [key: string]: Value }): number {
    const array = mongu(args, vars);
    assert<Value[]>(array, ['array']);
    return array.length;
  },
  /**
   * Returns a subset of an array.
   * @param args The array, the position, and the number of elements.
   * @param vars The variables.
   * @returns The subset of the array.
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
   * Sorts an array based on its elements. The sort order is user specified.
   * @param args The array and the sort order.
   * @param vars The variables.
   * @returns The sorted array.
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
