import { mongu } from '../index';

import { ObjectOperations, Value } from '../types';

import { assert } from '../assert';

export const object: ObjectOperations = {
  /**
   * Gets the value of a field in an object. If the field does not exist, it returns null.
   * @param {{ field: Value; input: Value }} args The field and the input object (expressions evaluating to a string and an object).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {Value} The value of the field.
   * @example $getField({ field: 'qty', input: { item: 'apple', qty: 25, price: 4.5 } }) // 25
   */
  $getField(
    args: { field: Value; input: Value },
    vars: { [key: string]: Value }
  ): Value {
    const field = mongu(args.field, vars);
    const input = mongu(args.input, vars);
    assert<string>(field, ['string']);
    assert<{ [key: string]: Value }>(input, ['object']);
    if (field in input) return mongu(input[field], vars);
    return null;
  },

  /**
   * Merges objects into a single object.
   * @param {Value[]} args The objects (expressions evaluating to objects).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {{ [key: string]: Value }} The merged object.
   * @example $mergeObjects([{ item: 'apple', qty: 5, price: 2.5 }, { qty: 10, price: 1.2, sale: true }]) // { item: 'apple', qty: 10, price: 1.2, sale: true }
   */
  $mergeObjects(
    args: Value[],
    vars: { [key: string]: Value }
  ): { [key: string]: Value } {
    return args.reduce((acc: { [key: string]: Value }, arg) => {
      const object = mongu(arg, vars);
      assert<{ [key: string]: Value }>(object, ['object']);
      return { ...acc, ...object };
    }, {});
  },

  /**
   * Sets a field in an object to a specified value.
   * @param {{ field: Value; input: Value; value: Value }} args The field, the input object, and the value (expressions evaluating to a string, an object, and any type).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {{ [key: string]: Value }} The object with the field set to the value.
   * @example $setField({ field: 'item', input: { qty: 25, price: 4.5 }, value: 'apple' }) // { item: 'apple', qty: 25, price: 4.5 }
   */
  $setField(
    args: { field: Value; input: Value; value: Value },
    vars: { [key: string]: Value }
  ): { [key: string]: Value } {
    const field = mongu(args.field, vars);
    const input = mongu(args.input, vars);
    const value = mongu(args.value, vars);
    assert<string>(field, ['string']);
    assert<{ [key: string]: Value }>(input, ['object']);
    return { ...input, [field]: value };
  },
};
