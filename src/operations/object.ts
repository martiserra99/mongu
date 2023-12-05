import { mongu, Operations, Value, Object } from '../index';

import { assertObject, assertString } from '../asserts';

export const object: Operations = {
  /**
   * Gets the value of a field in an object.
   * @param args The field and the input object.
   * @param data The variables.
   * @returns The value of the field.
   */
  $getField(args: { field: Value; input: Value }, data: Object<Value>): Value {
    const field = mongu(args.field, data);
    const input = mongu(args.input, data);
    assertString(field);
    assertObject(input);
    return input[field] || null;
  },
  /**
   * Merges objects into a single object.
   * @param args The objects.
   * @param data The variables.
   * @returns The merged object.
   */
  $mergeObjects(args: Value[], data: Object<Value>): Value {
    return args.reduce((acc: Object<Value>, arg) => {
      const object = mongu(arg, data);
      assertObject(object);
      return { ...acc, ...object };
    }, {});
  },
  /**
   * Sets a field in an object to a specified value.
   * @param args The field, the input object, and the value.
   * @param data The variables.
   * @returns The object with the field set to the value.
   */
  $setField(
    args: { field: Value; input: Value; value: Value },
    data: Object<Value>
  ): Value {
    const field = mongu(args.field, data);
    const input = mongu(args.input, data);
    const value = mongu(args.value, data);
    assertString(field);
    assertObject(input);
    return { ...input, [field]: value };
  },
};
