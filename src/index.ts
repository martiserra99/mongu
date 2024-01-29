import { operations } from './operations';

export type Primitive = string | number | boolean | null;

export type Value = { [key: string]: Value } | Value[] | Primitive;

export type Operation = (args: any, vars: { [key: string]: Value }) => Value;

export type Operations = { [key: string]: Operation };

/**
 * It evaluates the mongo-like expression with the given variables.
 *
 * @param expr The mongo-like expression.
 * @param vars The variables to evaluate the expression with.
 * @returns The result of the expression.
 */
export function mongu(expr: Value, vars: { [key: string]: Value } = {}): Value {
  if (isArray(expr)) {
    return evaluateArray(expr, vars);
  }

  if (isObject(expr)) {
    return evaluateObject(expr, vars);
  }

  if (isString(expr)) {
    return evaluateString(expr, vars);
  }

  return expr;
}

function isArray(expr: Value): expr is Value[] {
  return Array.isArray(expr);
}

function evaluateArray(expr: Value[], vars: { [key: string]: Value }): Value {
  return expr.map(expression => mongu(expression, vars));
}

function isObject(expr: Value): expr is { [key: string]: Value } {
  return typeof expr === 'object' && !Array.isArray(expr) && expr !== null;
}

function evaluateObject(
  expr: { [key: string]: Value },
  vars: { [key: string]: Value }
): Value {
  if (isOperation(expr)) return evaluateOperation(expr, vars);
  return evaluateNormalObject(expr, vars);
}

function isOperation(expr: { [key: string]: Value }): boolean {
  return Object.keys(expr).length === 1 && Object.keys(expr)[0].startsWith('$');
}

function evaluateOperation(
  expr: { [key: string]: Value },
  vars: { [key: string]: Value }
): Value {
  const operator = Object.keys(expr)[0];
  const operation: Operation = operations[operator];
  return operation(expr[operator], vars);
}

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

function isString(expr: Value): expr is string {
  return typeof expr === 'string';
}

function evaluateString(expr: string, vars: { [key: string]: Value }): Value {
  if (isVariable(expr)) return evaluateVariable(expr, vars);
  return evaluateNormalString(expr);
}

function isVariable(expr: Value): boolean {
  return typeof expr === 'string' && expr.startsWith('$');
}

function evaluateVariable(expr: string, vars: { [key: string]: Value }): Value {
  const parts = expr.slice(1).split('.');
  const value = parts.reduce((acc: Value, key: string): Value => {
    if (isArray(acc) && inArray(acc, key)) {
      return acc[Number(key)];
    }

    if (isObject(acc) && inObject(acc, key)) {
      return acc[key];
    }

    throw new Error(`Variable ${key} not found`);
  }, vars);
  return value;
}

function inArray(array: Value[], key: string) {
  return !isNaN(Number(key)) && key in array;
}

function inObject(object: { [key: string]: Value }, key: string) {
  return key in object;
}

function evaluateNormalString(expr: string): Value {
  if (expr.startsWith('_')) return expr.slice(1);
  return expr;
}
