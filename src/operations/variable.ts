import { mongu, Operations, Value, Object } from '../index';

export const variable: Operations = {
  /**
   * Concatenates strings and returns the concatenated string.
   * @param args An array of strings.
   * @param data The variables.
   * @returns The concatenated string.
   */
  $let(args: { vars: Object<Value>; in: Value }, data: Object<Value>): Value {
    const vars = Object.fromEntries(
      Object.entries(args.vars).map(([key, value]) => [
        `$${key}`,
        mongu(value, data),
      ])
    );
    return mongu(args.in, vars);
  },
};
