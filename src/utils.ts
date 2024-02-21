import { Value } from './types';

/**
 * It returns a boolean indicating whether the expression is a string.
 * @param expr The expression.
 * @returns A boolean indicating whether the expression is a string.
 */
export function isString(expr: Value): expr is string {
  return typeof expr === 'string';
}

/**
 * It returns a boolean indicating whether the expression is an object.
 * @param expr The expression.
 * @returns A boolean indicating whether the expression is an object.
 */
export function isObject(expr: Value): expr is { [key: string]: Value } {
  return typeof expr === 'object' && !Array.isArray(expr) && expr !== null;
}

/**
 * It returns a boolean indicating whether the expression is an array.
 * @param expr The expression.
 * @returns A boolean indicating whether the expression is an array.
 */
export function isArray(expr: Value): expr is Value[] {
  return Array.isArray(expr);
}

/**
 * It returns a boolean indicating whether the key is in the object.
 * @param object The object.
 * @param key The key.
 * @returns A boolean indicating whether the key is in the object.
 */
export function inObject(object: { [key: string]: Value }, key: string) {
  return key in object;
}

/**
 * It returns a boolean indicating whether the key is in the array.
 * @param array The array.
 * @param key The key.
 * @returns A boolean indicating whether the key is in the array.
 */
export function inArray(array: Value[], key: string) {
  return !isNaN(Number(key)) && key in array;
}
