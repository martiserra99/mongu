import { mongu, Operations, Value, Object } from '../index';

import { assertArray, assertNumber, assertString } from '../asserts';

export const array: Operations = {
  $arrayElemAt(args: [Value, Value], data: Object<Value>): Value {
    const array = mongu(args[0], data);
    assertArray(array);
    const index = mongu(args[1], data);
    assertNumber(index);
    return array[index] ?? null;
  },
  $concatArrays(args: Value[], data: Object<Value>): Value {
    return args.reduce((acc: Value[], expr: Value) => {
      const array = mongu(expr, data);
      assertArray(array);
      return acc.concat(array);
    }, []);
  },
  $filter(
    args: { input: Value; cond: Value; as: Value },
    data: Object<Value>
  ): Value {
    const array = mongu(args.input, data);
    assertArray(array);
    const as = mongu(args.as, data);
    assertString(as);
    return array.filter(value => {
      return mongu(args.cond, { ...data, [`$${as}`]: value });
    });
  },
  $firstN(args: { input: Value; n: Value }, data: Object<Value>): Value {
    const array = mongu(args.input, data);
    assertArray(array);
    const n = mongu(args.n, data);
    assertNumber(n);
    return array.slice(0, n);
  },
  $in(args: [Value, Value], data: Object<Value>): Value {
    const value = mongu(args[0], data);
    const array = mongu(args[1], data);
    assertArray(array);
    return array.includes(value);
  },
  $indexOfArray(args: [Value, Value], data: Object<Value>): Value {
    const array = mongu(args[0], data);
    assertArray(array);
    const value = mongu(args[1], data);
    return array.indexOf(value);
  },
  $lastN(args: { input: Value; n: Value }, data: Object<Value>): Value {
    const array = mongu(args.input, data);
    assertArray(array);
    const n = mongu(args.n, data);
    assertNumber(n);
    return array.slice(-n);
  },
  $map(
    args: { input: Value; as: Value; in: Value },
    data: Object<Value>
  ): Value {
    const array = mongu(args.input, data);
    assertArray(array);
    const as = mongu(args.as, data);
    assertString(as);
    return array.map(value => {
      return mongu(args.in, { ...data, [`$${as}`]: value });
    });
  },
  $maxN(args: { input: Value; n: Value }, data: Object<Value>): Value {
    const array = mongu(args.input, data);
    assertArray(array);
    const n = mongu(args.n, data);
    assertNumber(n);
    return array
      .sort((a, b) => {
        assertNumber(a);
        assertNumber(b);
        return b - a;
      })
      .slice(0, n);
  },
  $minN(args: { input: Value; n: Value }, data: Object<Value>): Value {
    const array = mongu(args.input, data);
    assertArray(array);
    const n = mongu(args.n, data);
    assertNumber(n);
    return array
      .sort((a, b) => {
        assertNumber(a);
        assertNumber(b);
        return a - b;
      })
      .slice(0, n);
  },
  $reduce(
    args: { input: Value; initialValue: Value; in: Value },
    data: Object<Value>
  ): Value {
    const array = mongu(args.input, data);
    assertArray(array);
    const initialValue = mongu(args.initialValue, data);
    return array.reduce((acc, value) => {
      return mongu(args.in, { ...data, $value: acc, $this: value });
    }, initialValue);
  },
  $reverseArray(args: Value, data: Object<Value>): Value {
    const array = mongu(args, data);
    assertArray(array);
    return array.reverse();
  },
  $size(args: Value, data: Object<Value>): Value {
    const array = mongu(args, data);
    assertArray(array);
    return array.length;
  },
  $slice(args: [Value, Value, Value], data: Object<Value>): Value {
    const array = mongu(args[0], data);
    assertArray(array);
    const position = mongu(args[1], data);
    assertNumber(position);
    const n = mongu(args[2], data);
    assertNumber(n);
    return array.slice(position, position + n);
  },
  $sortArray(
    args: { input: Value; sortBy: Value },
    data: Object<Value>
  ): Value {
    const array = mongu(args.input, data);
    assertArray(array);
    return array.sort((a, b) => {
      assertNumber(a);
      assertNumber(b);
      const c = mongu(args.sortBy, { ...data, $first: a, $second: b });
      assertNumber(c);
      return c;
    });
  },
};
