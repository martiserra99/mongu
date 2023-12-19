import { operations } from './operations';

export type Primitive = string | number | boolean | null;
export type Object<T> = { [key: string]: T };
export type Value = Value[] | { [key: string]: Value } | Primitive;
export type Operation = (args: any, data: Object<Value>) => Value;
export type Operations = { [key: string]: Operation };

/**
 * It evaluates the mongo-like expression with the given data.
 *
 * @param expr The mongo-like expression.
 * @param data The data to evaluate the expression.
 * @returns The evaluated expression.
 */
export function mongu(expr: Value, data: Object<Value> = {}): Value {
  if (isArray(expr)) return monguArray(expr, data);
  if (isObject(expr)) return monguObject(expr, data);
  if (isString(expr)) return monguString(expr, data);
  return expr;
}

function isArray(expr: Value): expr is Value[] {
  return Array.isArray(expr);
}

function monguArray(expr: Value[], data: Object<Value>): Value {
  return expr.map(expr => mongu(expr, data));
}

function isObject(expr: Value): expr is Object<Value> {
  return typeof expr === 'object' && !Array.isArray(expr) && expr !== null;
}

function monguObject(expr: Object<Value>, data: Object<Value>): Value {
  if (isObjectOperation(expr)) return monguObjectOperation(expr, data);
  return monguObjectNotOperation(expr, data);
}

function isObjectOperation(expr: Object<Value>): boolean {
  return Object.keys(expr).length === 1 && Object.keys(expr)[0].startsWith('$');
}

function monguObjectOperation(expr: Object<Value>, data: Object<Value>): Value {
  const operator = Object.keys(expr)[0];
  const operation = operations[operator];
  return operation(expr[operator], data);
}

function monguObjectNotOperation(
  expr: Object<Value>,
  data: Object<Value>
): Value {
  return Object.fromEntries(
    Object.entries(expr).map(([key, expr]) => {
      return [evaluateStringNotVariable(key), mongu(expr, data)];
    })
  );
}

function isString(expr: Value): expr is string {
  return typeof expr === 'string';
}

function monguString(expr: string, data: Object<Value>): Value {
  if (isStringVariable(expr)) return monguStringVariable(expr, data);
  return evaluateStringNotVariable(expr);
}

function isStringVariable(expr: Value): boolean {
  return typeof expr === 'string' && expr.startsWith('$');
}

function monguStringVariable(expr: string, data: Object<Value>): Value {
  const parts = expr.slice(1).split('.');
  const value = parts.reduce((acc: Value, key: string): Value => {
    if (isObject(acc) && inObject(acc, key)) return acc[key];
    if (isArray(acc) && inArray(acc, key)) return acc[Number(key)];
    throw new Error(`Variable ${key} not found`);
  }, data);
  return value;
}

function inObject(object: Object<Value>, key: string) {
  return key in object;
}

function inArray(array: Value[], key: string) {
  return !isNaN(Number(key)) && key in array;
}

function evaluateStringNotVariable(expr: string): Value {
  if (expr.startsWith('_')) return expr.slice(1);
  return expr;
}
