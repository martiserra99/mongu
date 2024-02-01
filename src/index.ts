import { operations } from './operations';

export type Primitive = string | number | boolean | null;
export type Value = { [key: string]: Value } | Value[] | Primitive;
export type Operation = (args: any, vars: { [key: string]: Value }) => Value;
export type Operations = { [key: string]: Operation };

import { isString, isObject, isArray, inObject, inArray } from './utils';

/**
 * It evaluates the expression with the given variables.
 *
 * @param expr The expression.
 * @param vars The variables to evaluate the expression with.
 * @returns The result of the expression.
 */
export function mongu(expr: Value, vars: { [key: string]: Value } = {}): Value {
  if (isString(expr)) return evaluateString(expr, vars);
  if (isObject(expr)) return evaluateObject(expr, vars);
  if (isArray(expr)) return evaluateArray(expr, vars);
  return expr;
}

/**
 * It evaluates the string expression with the given variables.
 *
 * @param expr The string expression.
 * @param vars The variables to evaluate the expression with.
 * @returns The result of the expression.
 */
function evaluateString(expr: string, vars: { [key: string]: Value }): Value {
  if (isVariable(expr)) return evaluateVariable(expr, vars);
  return evaluateNormalString(expr);
}

/**
 * It returns a boolean indicating whether the string expression is a variable.
 *
 * @param expr The string expression.
 * @returns A boolean indicating whether the string expression is a variable.
 */
function isVariable(expr: string): boolean {
  return expr.startsWith('$');
}

/**
 * It evaluates the variable expression with the given variables.
 *
 * @param expr The variable expression.
 * @param vars The variables to evaluate the expression with.
 * @returns The result of the expression.
 */
function evaluateVariable(expr: string, vars: { [key: string]: Value }): Value {
  const parts = expr.slice(1).split('.');
  const value = parts.reduce((acc: Value, key: string, i: number): Value => {
    if (isObject(acc) && inObject(acc, key)) return acc[key];
    if (isArray(acc) && inArray(acc, key)) return acc[Number(key)];
    throw new Error(`Variable ${parts.slice(0, i + 1).join('.')} not found`);
  }, vars);
  return value;
}

/**
 * It evaluates the normal string expression.
 *
 * @param expr The string expression.
 * @returns The result of the expression.
 */
function evaluateNormalString(expr: string): Value {
  if (expr.startsWith('_')) return expr.slice(1);
  return expr;
}

/**
 * It evaluates the object expression with the given variables.
 *
 * @param expr The object expression.
 * @param vars The variables to evaluate the expression with.
 * @returns The result of the expression.
 */
function evaluateObject(
  expr: { [key: string]: Value },
  vars: { [key: string]: Value }
): Value {
  if (isOperation(expr)) return evaluateOperation(expr, vars);
  return evaluateNormalObject(expr, vars);
}

/**
 * It returns a boolean indicating whether the object expression is an operation.
 *
 * @param expr The object expression.
 * @returns A boolean indicating whether the object expression is an operation.
 */
function isOperation(expr: { [key: string]: Value }): boolean {
  return Object.keys(expr).length === 1 && Object.keys(expr)[0].startsWith('$');
}

/**
 * It evaluates the operation expression with the given variables.
 *
 * @param expr The operation expression.
 * @param vars The variables to evaluate the expression with.
 * @returns The result of the expression.
 */
function evaluateOperation(
  expr: { [key: string]: Value },
  vars: { [key: string]: Value }
): Value {
  const operator = Object.keys(expr)[0];
  if (operator in operations) {
    const operation = operations[operator];
    return operation(expr[operator], vars);
  }
  throw new Error(`Operator ${operator} not found`);
}

/**
 * It evaluates the normal object expression with the given variables.
 *
 * @param expr The normal object expression.
 * @param vars The variables to evaluate the expression with.
 * @returns The result of the expression.
 */
function evaluateNormalObject(
  expr: { [key: string]: Value },
  vars: { [key: string]: Value }
): Value {
  return Object.fromEntries(
    Object.entries(expr).map(([key, expr]) => {
      return [evaluateNormalString(key), mongu(expr, vars)];
    })
  );
}

/**
 * It evaluates the array expression with the given variables.
 *
 * @param expr The array expression.
 * @param vars The variables to evaluate the expression with.
 * @returns The result of the expression.
 */
function evaluateArray(expr: Value[], vars: { [key: string]: Value }): Value {
  return expr.map(expression => mongu(expression, vars));
}
