import { mongu } from '../../src/index';

describe('$arrayElemAt', () => {
  it('returns the element at the specified array index', () => {
    expect(mongu({ $arrayElemAt: [[1, 2, 3], 1] })).toBe(2);
  });
});

describe('$arrayToObject', () => {
  it('returns an object from the array', () => {
    expect(
      mongu({
        $arrayToObject: [
          ['a', 'b'],
          ['c', 'd'],
        ],
      })
    ).toEqual({ a: 'b', c: 'd' });
  });
});

describe('$concatArrays', () => {
  it('returns an array of the concatenated arrays', () => {
    expect(
      mongu({
        $concatArrays: [
          [1, 2],
          [3, 4],
        ],
      })
    ).toEqual([1, 2, 3, 4]);
  });
});

describe('$filter', () => {
  it('returns an array with only those elements that match the condition', () => {
    expect(
      mongu({
        $filter: {
          input: [1, 2, 3, 4],
          as: 'num',
          cond: { $gt: ['$$num', 2] },
        },
      })
    ).toEqual([3, 4]);
  });
});

describe('$firstN', () => {
  it('returns the first N elements of an array', () => {
    expect(mongu({ $firstN: [[1, 2, 3, 4], 2] })).toEqual([1, 2]);
  });
});

describe('$in', () => {
  it('returns a boolean indicating whether a specified value is in an array', () => {
    expect(mongu({ $in: [2, [1, 2, 3]] })).toBe(true);
    expect(mongu({ $in: [4, [1, 2, 3]] })).toBe(false);
  });
});

describe('$indexOfArray', () => {
  it('returns the index of the first occurrence of a value in an array', () => {
    expect(mongu({ $indexOfArray: [[1, 2, 3], 2] })).toBe(1);
    expect(mongu({ $indexOfArray: [[1, 2, 3], 4] })).toBe(-1);
  });
});

describe('$isArray', () => {
  it('returns a boolean indicating whether the argument is an array', () => {
    expect(mongu({ $isArray: [1, 2, 3] })).toBe(true);
    expect(mongu({ $isArray: 1 })).toBe(false);
  });
});

describe('$lastN', () => {
  it('returns the last N elements of an array', () => {
    expect(mongu({ $lastN: [[1, 2, 3, 4], 2] })).toEqual([3, 4]);
  });
});

describe('$map', () => {
  it('returns an array with the applied expression to each element', () => {
    expect(
      mongu({
        $map: {
          input: [1, 2, 3],
          as: 'num',
          in: { $add: ['$$num', 1] },
        },
      })
    ).toEqual([2, 3, 4]);
  });
});

describe('$maxN', () => {
  it('returns the N highest values in an array', () => {
    expect(mongu({ $maxN: [[1, 2, 3, 4], 2] })).toEqual([4, 3]);
  });
});

describe('$minN', () => {
  it('returns the N lowest values in an array', () => {
    expect(mongu({ $minN: [[1, 2, 3, 4], 2] })).toEqual([1, 2]);
  });
});

describe('$objectToArray', () => {
  it('returns an array of key-value pairs from the input object', () => {
    expect(
      mongu({
        $objectToArray: { a: 1, b: 2 },
      })
    ).toEqual([
      { k: 'a', v: 1 },
      { k: 'b', v: 2 },
    ]);
  });
});

describe('$range', () => {
  it('returns an array of numbers that is a sequence of the specified step', () => {
    expect(mongu({ $range: [0, 5, 2] })).toEqual([0, 2, 4]);
  });
});

describe('$reduce', () => {
  it('returns a value that results from applying an expression to each element in the input array', () => {
    expect(
      mongu({
        $reduce: {
          input: [1, 2, 3],
          initialValue: 0,
          in: { $add: ['$$value', '$$this'] },
        },
      })
    ).toBe(6);
  });
});

describe('$reverseArray', () => {
  it('returns an array with the elements in reverse order', () => {
    expect(mongu({ $reverseArray: [1, 2, 3] })).toEqual([3, 2, 1]);
  });
});

describe('$size', () => {
  it('returns the number of elements in the array', () => {
    expect(mongu({ $size: [1, 2, 3] })).toBe(3);
  });
});

describe('$slice', () => {
  it('returns a subset of an array', () => {
    expect(mongu({ $slice: [[1, 2, 3, 4], 1, 2] })).toEqual([2, 3]);
    expect(mongu({ $slice: [[1, 2, 3, 4], 1] })).toEqual([2, 3, 4]);
    expect(mongu({ $slice: [[1, 2, 3, 4], -2] })).toEqual([3, 4]);
    expect(mongu({ $slice: [[1, 2, 3, 4], -2, 1] })).toEqual([3]);
  });
});

describe('$sortArray', () => {
  it('returns an array with the elements sorted', () => {
    expect(mongu({ $sortArray: { input: [2, 1, 3] } })).toEqual([1, 2, 3]);
    expect(mongu({ $sortArray: { input: [2, 1, 3], sortBy: -1 } })).toEqual([
      3,
      2,
      1,
    ]);
  });
});
