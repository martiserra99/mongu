type Primitive = string | number | boolean | null;

type Value = { [key: string]: Value } | Value[] | Primitive;

type Variables = { [key: string]: Value };

type Operation<T extends Value, U extends Value> = (
  args: T,
  vars: Variables
) => U;

type Operations = ArithmeticOperations &
  ArrayOperations &
  BooleanOperations &
  ComparisonOperations &
  ConditionalOperations &
  ObjectOperations &
  StringOperations &
  TypeOperations &
  VariableOperations;

type ArithmeticOperations = {
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

type ArrayOperations = {
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

type BooleanOperations = {
  $and: Operation<Value[], boolean>;
  $not: Operation<Value, boolean>;
  $or: Operation<Value[], boolean>;
};

type ComparisonOperations = {
  $cmp: Operation<[Value, Value], number>;
  $eq: Operation<[Value, Value], boolean>;
  $gt: Operation<[Value, Value], boolean>;
  $gte: Operation<[Value, Value], boolean>;
  $lt: Operation<[Value, Value], boolean>;
  $lte: Operation<[Value, Value], boolean>;
  $ne: Operation<[Value, Value], boolean>;
};

type ConditionalOperations = {
  $cond: Operation<{ if: Value; then: Value; else: Value }, Value>;
  $ifNull: Operation<Value[], Value>;
  $switch: Operation<
    { branches: { case: Value; then: Value }[]; default: Value },
    Value
  >;
};

type ObjectOperations = {
  $getField: Operation<{ field: Value; input: Value }, Value>;
  $mergeObjects: Operation<Value[], { [key: string]: Value }>;
  $setField: Operation<
    { field: Value; input: Value; value: Value },
    { [key: string]: Value }
  >;
};

type StringOperations = {
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

type TypeOperations = {
  $convert: Operation<{ input: Value; to: Value }, boolean | number | string>;
  $isBoolean: Operation<Value, boolean>;
  $isNumber: Operation<Value, boolean>;
  $isString: Operation<Value, boolean>;
  $toBoolean: Operation<Value, boolean>;
  $toNumber: Operation<Value, number | null>;
  $toString: Operation<Value, string>;
};

type VariableOperations = {
  $let: Operation<{ vars: { [key: string]: Value }; in: Value }, Value>;
};

export {
  Primitive,
  Value,
  Variables,
  Operation,
  Operations,
  ArithmeticOperations,
  ArrayOperations,
  BooleanOperations,
  ComparisonOperations,
  ConditionalOperations,
  ObjectOperations,
  StringOperations,
  TypeOperations,
  VariableOperations,
};
