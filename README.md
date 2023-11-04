# mongu

Use mongo-like expressions in JavaScript (node or browser).

## Installation

```bash
npm install mongu
```

## Quickstart

To use this library you just have to import the function `mongu` and introduce an expression and some variables. The result of this function will be the result of evaluating the expression with these variables.

Here is an example:

```js
const mongu = require("mongu");

const expr = {
  fullName: {
    $concat: [{ $toLower: "$name" }, " ", { $toLower: "$surname" }]
  },
  isAdult: { $gte: ["$age", 18] },
};

const vars = { name: "Marti", surname: "Serra", age: 24 };

console.log(mongu(expr, vars));
```

## Documentation

The mongu library exports a function that accepts two parameters:

- A mongu expression.

- An object with variables that are used in the the mongu expression.

The result of this function is the result of evaluating the expression with the variables.

### Expression

A mongu expression is an expression that with some variables evaluate to a result. This library is inspired by mongodb and it has the same way of defining operations and the operators are the same.

### Operators

There are a lot of operators that are supported in mongu:

- Boolean Operators: $and, $or, $not

- Comparison Operators: $eq, $ne, $gt, $lt, $gte, $lte, $cmp

- Arithmetic Operators: $add, $subtract, $multiply, $divide, $mod

- String Operators: $concat, $toLower, $toUpper

- Array Operators: $size, $filter, $map, $reduce, $in

- Conditional Operators: $cond

- Variable Operators: $let

### The _ character

The _ character can be placed in front of any string or object key and it will treat the following character as it was a regular character and not a special one like $.

Here is an example:

```js
const expr = {
  fullName: {
    _$concat: [{ $toLower: "_$name" }, " ", { $toLower: "_$surname" }]
  },
  isAdult: { $gte: ["$age", 18] },
};
```
