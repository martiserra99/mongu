# mongu

Use mongo-like expressions in JavaScript (node or browser).

## ❯ Install

```txt
npm install --save prompts
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

This is a simple example used to add different numbers.

```js
const { mongu } = require('mongu');

const expr = { $add: '$numbers' };

const vars = { numbers: [1, 2, 3] };

console.log(mongu(expr, vars));
```

## ❯ How To Use

To use this library you just have to import the function `mongu` and introduce an expression and some variables. The result of this function will be the result of evaluating the expression with these variables.

## ❯ Arithmetic Operators

### \$abs

Returns the absolute value of a number.

`$abs` has to following syntax:

```txt
{ $abs: <number> }
```

The `<number>` expression can be any valid expression as long as it resolves to a number.
