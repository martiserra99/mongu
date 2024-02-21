import { mongu, Operations, Value } from '../index';

import { assert } from '../assert';

export const object: Operations = {
  /**
   * Gets the value of a field in an object.
   * @param args The field and the input object.
   * @param vars The variables.
   * @returns The value of the field.
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
   * @param args The objects.
   * @param vars The variables.
   * @returns The merged object.
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
   * @param args The field, the input object, and the value.
   * @param vars The variables.
   * @returns The object with the field set to the value.
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
