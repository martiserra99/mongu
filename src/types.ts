/**
 * It represents a primitive value that can be a string, number, boolean, or null.
 */
export type Primitive = string | number | boolean | null;

/**
 * It represents a value that can be a primitive, an object, or an array.
 */
export type Value = { [key: string]: Value } | Value[] | Primitive;

/**
 * It represents an operation that takes some arguments and variables and returns a value.
 *
 * @param T The type of the arguments.
 * @param U The type of the value.
 */
export type Operation<T extends Value, U extends Value> = (
  args: T,
  vars: { [key: string]: Value }
) => U;

/**
 * It represents all the operations that can be used in an expression.
 */
export type Operations = ArithmeticOperations &
  ArrayOperations &
  BooleanOperations &
  ComparisonOperations &
  ConditionalOperations &
  ObjectOperations &
  StringOperations &
  TypeOperations &
  VariableOperations;

/**
 * It represents all the arithmetic operations that can be used in an expression.
 */
export type ArithmeticOperations = {
  $abs: Operation<Value, number>;
  $add: Operation<Value[], number>;
  $ceil: Operation<Value, number>;
  $divide: Operation<[Value, Value], number>;
  $exp: Operation<Value, number>;
  $floor: Operation<Value, number>;
  $ln: Operation<Value, number>;
  $log: Operation<[Value, Value], number>;
  $log10: Operation<Value, number>;
  $mod: Operation<[Value, Value], number>;
  $multiply: Operation<Value[], number>;
  $pow: Operation<[Value, Value], number>;
  $round: Operation<[Value, Value], number>;
  $sqrt: Operation<Value, number>;
  $subtract: Operation<[Value, Value], number>;
  $trunc: Operation<[Value, Value], number>;
};

/**
 * It represents all the array operations that can be used in an expression.
 */
export type ArrayOperations = {
  $arrayElemAt: Operation<[Value, Value], Value>;
  $concatArrays: Operation<Value[], Value[]>;
  $filter: Operation<{ input: Value; cond: Value; as: Value }, Value[]>;
  $firstN: Operation<{ input: Value; n: Value }, Value[]>;
  $in: Operation<[Value, Value], boolean>;
  $indexOfArray: Operation<[Value, Value], number>;
  $lastN: Operation<{ input: Value; n: Value }, Value[]>;
  $map: Operation<{ input: Value; as: Value; in: Value }, Value[]>;
  $maxN: Operation<{ input: Value; n: Value }, Value[]>;
  $minN: Operation<{ input: Value; n: Value }, Value[]>;
  $reduce: Operation<{ input: Value; initialValue: Value; in: Value }, Value>;
  $reverseArray: Operation<Value, Value[]>;
  $size: Operation<Value, number>;
  $slice: Operation<[Value, Value, Value], Value[]>;
  $sortArray: Operation<{ input: Value; sortBy: Value }, Value[]>;
};

/**
 * It represents all the boolean operations that can be used in an expression.
 */
export type BooleanOperations = {
  $and: Operation<Value[], boolean>;
  $not: Operation<Value, boolean>;
  $or: Operation<Value[], boolean>;
};

/**
 * It represents all the comparison operations that can be used in an expression.
 */
export type ComparisonOperations = {
  $cmp: Operation<[Value, Value], number>;
  $eq: Operation<[Value, Value], boolean>;
  $gt: Operation<[Value, Value], boolean>;
  $gte: Operation<[Value, Value], boolean>;
  $lt: Operation<[Value, Value], boolean>;
  $lte: Operation<[Value, Value], boolean>;
  $ne: Operation<[Value, Value], boolean>;
};

/**
 * It represents all the conditional operations that can be used in an expression.
 */
export type ConditionalOperations = {
  $cond: Operation<{ if: Value; then: Value; else: Value }, Value>;
  $ifNull: Operation<Value[], Value>;
  $switch: Operation<
    { branches: { case: Value; then: Value }[]; default: Value },
    Value
  >;
};

/**
 * It represents all the object operations that can be used in an expression.
 */
export type ObjectOperations = {
  $getField: Operation<{ field: Value; input: Value }, Value>;
  $mergeObjects: Operation<Value[], { [key: string]: Value }>;
  $setField: Operation<
    { field: Value; input: Value; value: Value },
    { [key: string]: Value }
  >;
};

/**
 * It represents all the string operations that can be used in an expression.
 */
export type StringOperations = {
  $concat: Operation<Value[], string>;
  $ltrim: Operation<Value, string>;
  $regexMatch: Operation<[Value, Value], boolean>;
  $rtrim: Operation<Value, string>;
  $split: Operation<[Value, Value], string[]>;
  $strLen: Operation<Value, number>;
  $substr: Operation<[Value, Value, Value], string>;
  $toLower: Operation<Value, string>;
  $trim: Operation<Value, string>;
  $toUpper: Operation<Value, string>;
};

/**
 * It represents all the type operations that can be used in an expression.
 */
export type TypeOperations = {
  $convert: Operation<{ input: Value; to: Value }, boolean | number | string>;
  $isBoolean: Operation<Value, boolean>;
  $isNumber: Operation<Value, boolean>;
  $isString: Operation<Value, boolean>;
  $toBoolean: Operation<Value, boolean>;
  $toNumber: Operation<Value, number | null>;
  $toString: Operation<Value, string>;
};

/**
 * It represents all the variable operations that can be used in an expression.
 */
export type VariableOperations = {
  $let: Operation<{ vars: { [key: string]: Value }; in: Value }, Value>;
};
