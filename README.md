# mongu

Use mongo-like expressions in JavaScript.

## ❯ Install

```bash
npm install --save mongu
```

## ❯ Usage

```js
const { mongu } = require('mongu');

const expr = {
  fullName: {
    $concat: [{ $toLower: '$name' }, ' ', { $toLower: '$surname' }],
  },
  isAdult: { $gte: ['$age', 18] },
};

const vars = { name: 'Marti', surname: 'Serra', age: 24 };

console.log(mongu(expr, vars));
```

## ❯ Examples

### Basic Example

This is a simple example used to add the numbers of an array.

```js
const { mongu } = require('mongu');

const expr = { $add: '$numbers' };
const vars = { numbers: [1, 2, 3] };

console.log(mongu(expr, vars)); // 6
```

## ❯ How To Use

To use this library you just have to import the `mongu` function and introduce an expression and some variables. The result of this function will be the result of evaluating the expression with these variables.

## ❯ Arithmetic Operators

### \$abs

Returns the absolute value of a number.

`$abs` has to following syntax:

```json
{ "$abs": "number" }
```

These are some examples:

```json
{ "$abs": 1 } // 1
```

```json
{ "abs": -1 } // 1
```

### \$add

Adds numbers together.

`$add` has the following syntax:

```json
{ "$add": ["number", "number", "..."] }
```

These are some examples:

```json
{ "$add": [1, 2, 3] } // 6
```

```json
{ "$add": [-2, 4] } // 2
```

### \$ceil

Returns the smallest integer greater than or equal to the specified number.

`$ceil` has the following syntax:

```json
{ "$ceil": "number" }
```

These are some examples:

```json
{ "$ceil": 1 } // 1
```

```json
{ "$ceil": 7.8 } // 8
```

```json
{ "$ceil": -2.8 } // -2
```

### \$divide

Divides one number by another.

`$divide` has the following syntax:

```json
{ "$divide": ["number", "number"] }
```

These are some examples:

```json
{ "$divide": [4, 2] } // 2
```

```json
{ "$divide": [5, 2] } // 2.5
```

### \$exp

Raises Euler's number to the specified exponent.

`$exp` has the following syntax:

```json
{ "$exp": "number" }
```

These are some examples:

```json
{ "$exp": 0 } // 1
```

```json
{ "$exp": 2 } // 7.38905609893065
```

```json
{ "$exp": -2 } // 0.1353352832366127
```

### \$floor

Returns the largest integer less than or equal to the specified number.

`$floor` has the following syntax:

```json
{ "$floor": "number" }
```

These are some examples:

```json
{ "$floor": 1 } // 1
```

```json
{ "$floor": 7.8 } // 7
```

```json
{ "$floor": -2.8 } // -3
```

### \$ln

Calculates the natural logarithm of a number.

`$ln` has the following syntax:

```json
{ "$ln": "number" }
```

These are some examples:

```json
{ "$ln": 1 } // 0
```

```json
{ "$ln": 10 } // 2.302585092994046
```

### \$log

Calculates the log of a number in the specified base.

`$log` has the following syntax:

```json
{ "$log": ["number", "base"] }
```

These are some examples:

```json
{ "$log": [100, 10] } // 2
```

### \$log10

Calculates the log base 10 of a number.

`$log10` has the following syntax:

```json
{ "$log10": "number" }
```

These are some examples:

```json
{ "$log10": 1 } // 0
```

```json
{ "$log10": 10 } // 1
```

```json
{ "$log10": 100 } // 2
```

### \$mod

Divides one number by another and returns the remainder.

`$mod` has the following syntax:

```json
{ "$mod": ["number", "number"] }
```

These are some examples:

```json
{ "$mod": [5, 2] } // 1
```

### \$multiply

Multiplies numbers together.

`$multiply` has the following syntax:

```json
{ "$multiply": ["number", "number", "..."] }
```

These are some examples:

```json
{ "$multiply": [2, 3] } // 6
```

```json
{ "$multiply": [2, 2, 3] } // 12
```

### \$pow

Raises a number to the specified exponent.

`$pow` has the following syntax:

```json
{ "$pow": ["number", "exponent"] }
```

These are some examples:

```json
{ "$pow": [5, 0] } // 1
```

```json
{ "$pow": [5, 2] } // 25
```

```json
{ "$pow": [5, -2] } // 0.04
```

### \$round

Rounds a number to a specified decimal place.

`$round` has the following syntax:

```json
{ "$round": ["number", "place"] }
```

These are some examples:

```json
{ "$round": [5.43, 0] } // 5
```

```json
{ "$round": [5.43, 1] } // 5.4
```

### \sqrt

Calculates the square root of a positive number.

`$sqrt` has the following syntax:

```json
{ "$sqrt": "number" }
```

These are some examples:

```json
{ "$sqrt": 25 } // 5
```

```json
{ "$sqrt": 30 } // 5.477225575051661
```

### \$subtract

Subtracts two numbers to return the difference.

`$subtract` has the following syntax:

```json
{ "$sqrt": ["number", "number"] }
```

These are some examples:

```json
{ "$sqrt": [5, 2] } // 3
```

```json
{ "$sqrt": [-2, 4] } // -6
```

### \$trunc

Truncates a number to a specified decimal place.

`$trunc` has the following syntax:

```json
{ "$trunc": ["number", "place"] }
```

These are some examples:

```json
{ "$trunc": [5.43, 0] } // 5
```

```json
{ "$trunc": [5.43, 1] } // 5.4
```

## ❯ Boolean Operators

### \$and

Evaluates one or more expressions and returns true if all of the expressions are true. Otherwise, it returns false.

`$and` has to following syntax:

```json
{ "$and": ["boolean", "boolean", "..."] }
```

These are some examples:

```json
{ "$and": [true, true] } // true
```

```json
{ "$and": [true, false, true] } // false
```

### \$not

Evaluates a boolean and returns the opposite boolean value.

`$not` has to following syntax:

```json
{ "$not": "boolean" }
```

These are some examples:

```json
{ "$not": true } // false
```

```json
{ "$not": false } // true
```

### \$or

Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, it returns false.

`$or` has to following syntax:

```json
{ "$or": ["boolean", "boolean", "..."] }
```

These are some examples:

```json
{ "$or": [true, false] } // true
```

```json
{ "$or": [false, false] } // false
```

## ❯ Comparison Operators

### \$cmp

Compares two values and returns:

- `-1` if the first value is less than the second.
- `1` if the first value is greater than the second.
- `0` if the two values are equivalent.

`$cmp` has to following syntax:

```json
{ "$cmp": ["number", "number"] }
```

These are some examples:

```json
{ "$cmp": [3, 5] } // -1
```

```json
{ "cmp": [5, 3] } // 1
```

```json
{ "cmp": [5, 5] } // 0
```

### \$eq

Compares two values and returns:

- `true` when the values are equivalent.
- `false` when the values are not equivalent.

`$eq` has to following syntax:

```json
{ "$eq": ["any", "any"] }
```

These are some examples:

```json
{ "$eq": [5, 5] } // true
```

```json
{ "eq": ["hello", "bye"] } // false
```

### \$gt

Compares two values and returns:

- `true` when the first value is greater than the second value.
- `false` when the first value is less than or equivalent to the second value.

`$gt` has to following syntax:

```json
{ "$gt": ["number", "number"] }
```

These are some examples:

```json
{ "$gt": [5, 2] } // true
```

```json
{ "$gt": [5, 7] } // false
```

### \$gte

Compares two values and returns:

- `true` when the first value is greater than or equivalent to the second value.
- `false` when the first value is less than the second value.

`$gte` has to following syntax:

```json
{ "$gte": ["number", "number"] }
```

These are some examples:

```json
{ "$gte": [5, 2] } // true
```

```json
{ "$gte": [5, 5] } // true
```

```json
{ "$gte": [5, 7] } // false
```

### \$lt

Compares two values and returns:

- `true` when the first value is less than the second value.
- `false` when the first value is greater than or equivalent to the second value.

`$lt` has to following syntax:

```json
{ "$lt": ["number", "number"] }
```

These are some examples:

```json
{ "$lt": [5, 7] } // true
```

```json
{ "$lt": [5, 2] } // false
```

### \$lte

Compares two values and returns:

- `true` when the first value is less than or equivalent to the second value.
- `false` when the first value is greater than the second value.

`$lte` has to following syntax:

```json
{ "$lte": ["number", "number"] }
```

These are some examples:

```json
{ "$lte": [5, 7] } // true
```

```json
{ "$lte": [5, 5] } // true
```

```json
{ "$lte": [5, 2] } // false
```

### \$ne

Compares two values and returns:

- `true` when the values are not equivalent.
- `false` when the values are equivalent.

`$ne` has to following syntax:

```json
{ "$ne": ["any", "any"] }
```

These are some examples:

```json
{ "ne": ["hello", "bye"] } // true
```

```json
{ "$ne": [5, 5] } // false
```

## ❯ String Operators

### \$concat

Concatenates strings and returns the concatenated string.

`$concat` has to following syntax:

```json
{ "$concat": ["string", "string", "..."] }
```

These are some examples:

```json
{ "$concat": ["marti", " ", "serra"] } // marti serra
```

### \$ltrim

Removes whitespace characters from the beginning of a string.

`$ltrim` has to following syntax:

```json
{ "$ltrim": "string" }
```

These are some examples:

```json
{ "$ltrim": "   marti" } // marti
```

### \$rtrim

Removes whitespace characters from the end of a string.

`$rtrim` has to following syntax:

```json
{ "$rtrim": "string" }
```

These are some examples:

```json
{ "$rtrim": "marti   " } // marti
```

### \$split

Divides a string into an array of substrings based on a delimiter.

`$split` has to following syntax:

```json
{ "$split": ["string", "delimiter"] }
```

These are some examples:

```json
{ "$split": ["June-15-2013", "-"] } // ["June", "15", "2013"]
```

```json
{ "$split": ["Hello World", " "] } // ["Hello", "World"]
```

### \$strLen

Returns the number of characters.

`$strLen` has to following syntax:

```json
{ "$strLen": "string" }
```

These are some examples:

```json
{ "$strLen": "abcde" } // 5
```

### \$substr

Returns a substring of a string, starting at a specified index position and including the specified number of characters.

`$substr` has to following syntax:

```json
{ "$substr": ["string", "start", "length"] }
```

These are some examples:

```json
{ "$substr": ["hello world", 1, 3] } // ell
```

### \$toLower

Converts a string to lowercase, returning the result.

`$toLower` has to following syntax:

```json
{ "$toLower": "string" }
```

These are some examples:

```json
{ "$toLower": "Marti Serra" } // marti serra
```

### \$trim

Removes whitespace characters from the beginning and end of a string.

`$trim` has to following syntax:

```json
{ "$trim": "string" }
```

These are some examples:

```json
{ "$trim": "   marti serra   " } // marti serra
```

### \$toUpper

Converts a string to uppercase, returning the result.

`$toUpper` has to following syntax:

```json
{ "$toUpper": "string" }
```

These are some examples:

```json
{ "$toUpper": "Marti Serra" } // MARTI SERRA
```

## ❯ Conditional Operators

### \$cond

Evaluates a boolean expression to return one of the two specified return expressions.

`$cond` has to following syntax:

```json
{ "$cond": { "if": "boolean", "then": "any", "else": "any" } }
```

These are some examples:

```json
{ "$cond": { "if": true, "then": "hello", "else": "bye" } } // hello
```

```json
{ "$cond": { "if": false, "then": "hello", "else": "bye" } } // bye
```

### \$ifNull

Evaluates input expressions for null values and returns:

- The first non-null input expression value found.
- A replacement expression value if all input expressions evaluate to null.

`$ifNull` has to following syntax:

```json
{ "$ifNull": ["any", "any", "...", "replacement"] }
```

These are some examples:

```json
{ "$ifNull": [null, "hello", "bye"] } // hello
```

```json
{ "$ifNull": [null, null, "bye"] } // bye
```

```json
{ "$ifNull": [null, null, null] } // null
```

### \$switch

Evaluates a series of case expressions. When it finds an expression which evaluates to true, it executes a specified expression and breaks out of the control flow.

`$switch` has to following syntax:

```json
{
  "$switch": {
    "branches": [
      { "case": "boolean", "then": "any" },
      { "case": "boolean", "then": "any" }
      "..."
    ],
    "default": "any"
  }
}
```

These are some examples:

```json
{
  "$switch": {
    "branches": [
      { "case": false, "then": 1 },
      { "case": true, "then": 2 }
    ],
    "default": 3
  }
} // 2
```

```json
{
  "$switch": {
    "branches": [
      { "case": false, "then": 1 },
      { "case": false, "then": 2 }
    ],
    "default": 3
  }
} // 3
```
