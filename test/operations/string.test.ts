import { mongu } from '../../src/index';

describe('$concat', () => {
  it('concatenates strings and returns the concatenated string', () => {
    expect(mongu({ $concat: ['marti', ' ', 'serra'] })).toBe('marti serra');
  });
});

describe('$ltrim', () => {
  it('removes whitespace from the beginning of a string', () => {
    expect(mongu({ $ltrim: '   marti   ' })).toBe('marti   ');
  });
});

describe('$regexMatch', () => {
  it('performs a regular expression and returns true if there is a match', () => {
    expect(mongu({ $regexMatch: ['hello', 'ell'] })).toBe(true);
    expect(mongu({ $regexMatch: ['goodbye', 'abc'] })).toBe(false);
  });
});

describe('$rtrim', () => {
  it('removes whitespace from the end of a string.', () => {
    expect(mongu({ $rtrim: '   marti   ' })).toBe('   marti');
  });
});

describe('$split', () => {
  it('divides a string into an array of substrings based on a delimiter', () => {
    expect(mongu({ $split: ['June-15-2013', '-'] })).toEqual([
      'June',
      '15',
      '2013',
    ]);
    expect(mongu({ $split: ['Hello World', ' '] })).toEqual(['Hello', 'World']);
  });
});

describe('$strLen', () => {
  it('returns the number of characters', () => {
    expect(mongu({ $strLen: 'abcde' })).toBe(5);
  });
});

describe('$substr', () => {
  it('returns the substring of a string', () => {
    expect(mongu({ $substr: ['hello world', 1, 3] })).toBe('ell');
  });
});

describe('$toLower', () => {
  it('converts a string to lowercase', () => {
    expect(mongu({ $toLower: 'Marti Serra' })).toBe('marti serra');
  });
});

describe('$trim', () => {
  it('removes whitespace from the beginning and end of a string.', () => {
    expect(mongu({ $trim: '   marti   ' })).toBe('marti');
  });
});

describe('$toUpper', () => {
  it('converts a string to uppercase', () => {
    expect(mongu({ $toUpper: 'Marti Serra' })).toBe('MARTI SERRA');
  });
});
