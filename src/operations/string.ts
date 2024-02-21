import { mongu } from '../index';

import { StringOperations, Value } from '../types';

import { assert } from '../assert';

export const string: StringOperations = {
  /**
   * Concatenates strings together.
   * @param {Value[]} args The input strings (expressions evaluating to strings).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The result of concatenating the input strings.
   * @example $concat(['hello', ' ', 'world']) // 'hello world'
   */
  $concat(args: Value[], vars: { [key: string]: Value }): string {
    return args
      .map(arg => {
        const string = mongu(arg, vars);
        assert<string>(string, ['string']);
        return string;
      })
      .join('');
  },

  /**
   * Removes whitespace from the beginning of a string.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The string with the whitespace removed from the beginning.
   * @example $ltrim('  hello') // 'hello'
   */
  $ltrim(args: Value, vars: { [key: string]: Value }): string {
    const string = mongu(args, vars);
    assert<string>(string, ['string']);
    return string.replace(/^\s+/, '');
  },

  /**
   * Performs a regular expression and returns true if there is a match. Otherwise, it returns false.
   * @param {[Value, Value]} args A string and a regular expression (expressions evaluating to strings).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {boolean} A boolean indicating if there is a match.
   * @example $regexMatch(['hello', '/ell/']) // true
   * @example $regexMatch(['hello', '/bye/']) // false
   */
  $regexMatch(args: [Value, Value], vars: { [key: string]: Value }): boolean {
    const string = mongu(args[0], vars);
    const regex = mongu(args[1], vars);
    assert<string>(string, ['string']);
    assert<string>(regex, ['string']);
    return string.match(regex) !== null;
  },

  /**
   * Removes whitespace from the end of a string.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The string with the whitespace removed from the end.
   * @example $rtrim('hello  ') // 'hello'
   */
  $rtrim(args: Value, vars: { [key: string]: Value }): string {
    const string = mongu(args, vars);
    assert<string>(string, ['string']);
    return string.replace(/\s+$/, '');
  },

  /**
   * Divides a string into an array of substrings based on a delimiter.
   * @param {[Value, Value]} args A string and a delimiter (expressions evaluating to strings).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string[]} The array of substrings.
   * @example $split(['June-15-2013', '-']) // ['June', '15', '2013']
   * @example $split(['hello world', ' ']) // ['hello', 'world']
   */
  $split(args: [Value, Value], vars: { [key: string]: Value }): string[] {
    const string = mongu(args[0], vars);
    const delimiter = mongu(args[1], vars);
    assert<string>(string, ['string']);
    assert<string>(delimiter, ['string']);
    return string.split(delimiter);
  },

  /**
   * Returns the length of a string.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {number} The length of the input string.
   * @example $strLen('hello') // 5
   */
  $strLen(args: Value, vars: { [key: string]: Value }): number {
    const string = mongu(args, vars);
    assert<string>(string, ['string']);
    return string.length;
  },

  /**
   * Returns a substring of a string.
   * @param {[Value, Value, Value]} args The input string, the starting index, and the number of characters (expressions evaluating to a string, a number, and a number).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The substring of the input string.
   * @example $substr(['hello', 0, 2]) // 'he'
   */
  $substr(args: [Value, Value, Value], vars: { [key: string]: Value }): string {
    const string = mongu(args[0], vars);
    const start = mongu(args[1], vars);
    const length = mongu(args[2], vars);
    assert<string>(string, ['string']);
    assert<number>(start, ['number']);
    assert<number>(length, ['number']);
    return string.substring(start, start + length);
  },

  /**
   * Returns the string converted to lowercase.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The input string converted to lowercase.
   * @example $toLower('Marti Serra') // 'marti serra'
   */
  $toLower(args: Value, vars: { [key: string]: Value }): string {
    const string = mongu(args, vars);
    assert<string>(string, ['string']);
    return string.toLowerCase();
  },

  /**
   * Removes whitespace from the beginning and end of a string.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The string with the whitespace removed from the beginning and end.
   * @example $trim('  hello  ') // 'hello'
   */
  $trim(args: Value, vars: { [key: string]: Value }): string {
    const string = mongu(args, vars);
    assert<string>(string, ['string']);
    return string.trim();
  },

  /**
   * Returns the string converted to uppercase.
   * @param {Value} args The input string (expression evaluating to a string).
   * @param {Object.<string, Value>} vars The variables.
   * @returns {string} The input string converted to uppercase.
   * @example $toUpper('Marti Serra') // 'MARTI SERRA'
   */
  $toUpper(args: Value, vars: { [key: string]: Value }): string {
    const string = mongu(args, vars);
    assert<string>(string, ['string']);
    return string.toUpperCase();
  },
};
