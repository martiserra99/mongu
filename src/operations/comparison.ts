import { mongu, Operations, Value, Object } from '../index';

import { assert } from '../assert';

export const comparison: Operations = {
  /**
   * Compares two values and returns -1 if the first is less than the second, 1 if the first is greater than the second, and 0 if the two values are equal.
   * @param args An array of two values.
   * @param data The variables.
   * @returns The result of comparing the two values.
   */
  $cmp(args: [Value, Value], data: Object<Value>): Value {
    const a = mongu(args[0], data);
    const b = mongu(args[1], data);
    assert<number>(a, ['number']);
    assert<number>(b, ['number']);
    return a < b ? -1 : a > b ? 1 : 0;
  },
  /**
   * Compares two values and returns true if they are equal.
   * @param args An array of two values.
   * @param data The variables.
   * @returns The result of comparing the two values.
   */
  $eq(args: [Value, Value], data: Object<Value>): Value {
    const a = mongu(args[0], data);
    const b = mongu(args[1], data);
    return a === b;
  },
  /**
   * Compares two values and returns true if the first is greater than the second.
   * @param args An array of two values.
   * @param data The variables.
   * @returns The result of comparing the two values.
   */
  $gt(args: [Value, Value], data: Object<Value>): Value {
    const a = mongu(args[0], data);
    const b = mongu(args[1], data);
    assert<number>(a, ['number']);
    assert<number>(b, ['number']);
    return a > b;
  },
  /**
   * Compares two values and returns true if the first is greater than or equal to the second.
   * @param args An array of two values.
   * @param data The variables.
   * @returns The result of comparing the two values.
   */
  $gte(args: [Value, Value], data: Object<Value>): Value {
    const a = mongu(args[0], data);
    const b = mongu(args[1], data);
    assert<number>(a, ['number']);
    assert<number>(b, ['number']);
    return a >= b;
  },
  /**
   * Compares two values and returns true if the first is less than the second.
   * @param args An array of two values.
   * @param data The variables.
   * @returns The result of comparing the two values.
   */
  $lt(args: [Value, Value], data: Object<Value>): Value {
    const a = mongu(args[0], data);
    const b = mongu(args[1], data);
    assert<number>(a, ['number']);
    assert<number>(b, ['number']);
    return a < b;
  },
  /**
   * Compares two values and returns true if the first is less than or equal to the second.
   * @param args An array of two values.
   * @param data The variables.
   * @returns The result of comparing the two values.
   */
  $lte(args: [Value, Value], data: Object<Value>): Value {
    const a = mongu(args[0], data);
    const b = mongu(args[1], data);
    assert<number>(a, ['number']);
    assert<number>(b, ['number']);
    return a <= b;
  },
  /**
   * Compares two values and returns true if they are not equal.
   * @param args An array of two values.
   * @param data The variables.
   * @returns The result of comparing the two values.
   */
  $ne(args: [Value, Value], data: Object<Value>): Value {
    const a = mongu(args[0], data);
    const b = mongu(args[1], data);
    return a !== b;
  },
};
