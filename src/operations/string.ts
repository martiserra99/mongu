import { mongu, Operations, Value, Object } from '../index';

import { assert } from '../assert';

export const string: Operations = {
  /**
   * Concatenates strings and returns the concatenated string.
   * @param args An array of strings.
   * @param data The variables.
   * @returns The concatenated string.
   */
  $concat(args: Value[], data: Object<Value>): Value {
    return args
      .map(arg => {
        const string = mongu(arg, data);
        assert<string>(string, ['string']);
        return string;
      })
      .join('');
  },
  /**
   * Removes whitespace from the beginning of a string.
   * @param args A string.
   * @param data The variables.
   * @returns The string with whitespace removed from the beginning.
   */
  $ltrim(args: Value, data: Object<Value>): Value {
    const string = mongu(args, data);
    assert<string>(string, ['string']);
    return string.replace(/^\s+/, '');
  },
  /**
   * Performs a regular expression and returns true if there is a match. Otherwise, it returns false.
   * @param args A string and a regular expression.
   * @param data The variables.
   * @returns A boolean indicating if there is a match.
   */
  $regexMatch(args: [Value, Value], data: Object<Value>): Value {
    const string = mongu(args[0], data);
    const regex = mongu(args[1], data);
    assert<string>(string, ['string']);
    assert<string>(regex, ['string']);
    return string.match(regex) !== null;
  },
  /**
   * Removes whitespace from the end of a string.
   * @param args A string.
   * @param data The variables.
   * @returns The string with whitespace removed from the end.
   */
  $rtrim(args: Value, data: Object<Value>): Value {
    const string = mongu(args, data);
    assert<string>(string, ['string']);
    return string.replace(/\s+$/, '');
  },
  /**
   * Divides a string into an array of substrings based on a delimiter.
   * @param args An array of a string and a delimiter.
   * @param data The variables.
   * @returns An array of substrings.
   */
  $split(args: [Value, Value], data: Object<Value>): Value {
    const string = mongu(args[0], data);
    const delimiter = mongu(args[1], data);
    assert<string>(string, ['string']);
    assert<string>(delimiter, ['string']);
    return string.split(delimiter);
  },
  /**
   * Returns the number of characters in a string.
   * @param args A string.
   * @param data The variables.
   * @returns The number of characters in the string.
   */
  $strLen(args: Value, data: Object<Value>): Value {
    const string = mongu(args, data);
    assert<string>(string, ['string']);
    return string.length;
  },
  /**
   * Returns the substring of a string.
   * @param args An array of a string, a starting index, and a length.
   * @param data The variables.
   * @returns The substring of the string.
   */
  $substr(args: [Value, Value, Value], data: Object<Value>): Value {
    const string = mongu(args[0], data);
    const start = mongu(args[1], data);
    const length = mongu(args[2], data);
    assert<string>(string, ['string']);
    assert<number>(start, ['number']);
    assert<number>(length, ['number']);
    return string.substr(start, length);
  },
  /**
   * Converts a string to lowercase.
   * @param args A string.
   * @param data The variables.
   * @returns The string converted to lowercase.
   */
  $toLower(args: Value, data: Object<Value>): Value {
    const string = mongu(args, data);
    assert<string>(string, ['string']);
    return string.toLowerCase();
  },
  /**
   * Removes whitespace from the beginning and end of a string.
   * @param args A string.
   * @param data The variables.
   * @returns The string with whitespace removed from the beginning and end.
   */
  $trim(args: Value, data: Object<Value>): Value {
    const string = mongu(args, data);
    assert<string>(string, ['string']);
    return string.trim();
  },
  /**
   * Converts a string to uppercase.
   * @param args A string.
   * @param data The variables.
   * @returns The string converted to uppercase.
   */
  $toUpper(args: Value, data: Object<Value>): Value {
    const string = mongu(args, data);
    assert<string>(string, ['string']);
    return string.toUpperCase();
  },
};
