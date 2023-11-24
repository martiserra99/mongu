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
