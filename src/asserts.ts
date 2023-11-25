import { Value } from './index';

export function assertNumber(value: Value): asserts value is number {
  if (typeof value !== 'number') {
    throw new TypeError('Expected a number.');
  }
}

export function assertArray(value: Value): asserts value is Value[] {
  if (!Array.isArray(value)) {
    throw new TypeError('Expected an array.');
  }
}

export function assertString(value: Value): asserts value is string {
  if (typeof value !== 'string') {
    throw new TypeError('Expected a string.');
  }
}

export function assertBoolean(value: Value): asserts value is boolean {
  if (typeof value !== 'boolean') {
    throw new TypeError('Expected a boolean.');
  }
}
