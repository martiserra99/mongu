import { Value } from './types';

type Type = keyof typeof callbacks;

/**
 * It asserts that the value is one of the given types.
 *
 * @param value The value.
 * @param types The types.
 */
export function assert<T extends Value>(
  value: Value,
  types: Type[]
): asserts value is T {
  if (!types.some(type => callbacks[type](value))) {
    throw new TypeError(`Expected one of these types: ${types.join(', ')}.`);
  }
}

const callbacks = {
  number: (value: Value): boolean => {
    return typeof value === 'number';
  },
  string: (value: Value): boolean => {
    return typeof value === 'string';
  },
  boolean: (value: Value): boolean => {
    return typeof value === 'boolean';
  },
  array: (value: Value): boolean => {
    return Array.isArray(value);
  },
  object: (value: Value): boolean => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  },
};
