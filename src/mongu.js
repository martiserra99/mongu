function mongu(expr, data) {
  if (isArray(expr)) return evaluateArray(expr, data);
  if (isObject(expr)) return evaluateObject(expr, data);
  if (isString(expr)) return evaluateString(expr, data);
  return expr;
}

function isArray(expr) {
  return Array.isArray(expr);
}

function evaluateArray(expr, data) {
  return expr.map((expr) => mongu(expr, data));
}

function isObject(expr) {
  return typeof expr === "object" && !Array.isArray(expr) && expr !== null;
}

function evaluateObject(expr, data) {
  if (isObjectOperation(expr)) return evaluateObjectOperation(expr, data);
  return evaluateObjectNotOperation(expr, data);
}

function isObjectOperation(expr) {
  return Object.keys(expr).length === 1 && Object.keys(expr)[0].startsWith("$");
}

function evaluateObjectOperation(expr, data) {
  const operator = Object.keys(expr)[0];
  const operation = operations[operator];
  return operation(expr[operator], data);
}

function evaluateObjectNotOperation(expr, data) {
  return Object.fromEntries(
    Object.entries(expr).map(([key, expr]) => {
      return [evaluateStringNotVariable(key), mongu(expr, data)];
    })
  );
}

function isString(expr) {
  return typeof expr === "string";
}

function evaluateString(expr, data) {
  if (isStringVariable(expr)) return evaluateStringVariable(expr, data);
  return evaluateStringNotVariable(expr);
}

function isStringVariable(expr) {
  return typeof expr === "string" && expr.startsWith("$");
}

function evaluateStringVariable(expr, data) {
  return mongu(data[expr.slice(1)], data);
}

function evaluateStringNotVariable(expr) {
  if (expr.startsWith("_")) return expr.slice(1);
  return expr;
}

const operations = {
  // Boolean Operators
  $and(args, data) {
    return args.every((expr) => mongu(expr, data));
  },
  $or(args, data) {
    return args.some((expr) => mongu(expr, data));
  },
  $not(args, data) {
    return !mongu(args[0], data);
  },
  // Comparison Operators
  $eq(args, data) {
    return mongu(args[0], data) === mongu(args[1], data);
  },
  $ne(args, data) {
    return mongu(args[0], data) !== mongu(args[1], data);
  },
  $gt(args, data) {
    return mongu(args[0], data) > mongu(args[1], data);
  },
  $lt(args, data) {
    return mongu(args[0], data) < mongu(args[1], data);
  },
  $gte(args, data) {
    return mongu(args[0], data) >= mongu(args[1], data);
  },
  $lte(args, data) {
    return mongu(args[0], data) <= mongu(args[1], data);
  },
  $cmp(args, data) {
    const res = mongu(args[0], data) - mongu(args[1], data);
    return res === 0 ? 0 : res / Math.abs(res);
  },
  // Arithmetic Operators
  $add(args, data) {
    return args.reduce((acc, expr) => acc + mongu(expr, data), 0);
  },
  $subtract(args, data) {
    return mongu(args[0], data) - mongu(args[1], data);
  },
  $multiply(args, data) {
    return args.reduce((acc, expr) => acc * mongu(expr, data), 1);
  },
  $divide(args, data) {
    return mongu(args[0], data) / mongu(args[1], data);
  },
  $mod(args, data) {
    return mongu(args[0], data) % mongu(args[1], data);
  },
  // String Operators
  $concat(args, data) {
    return args.map((expr) => mongu(expr, data)).join("");
  },
  $toLower(args, data) {
    return mongu(args, data).toLowerCase();
  },
  $toUpper(args, data) {
    return mongu(args, data).toUpperCase();
  },
  // Array Operators
  $size(args, data) {
    return mongu(args, data).length;
  },
  $filter(args, data) {
    return mongu(args.input, data).filter((item) => {
      const as = args.as ? `$${args.as}` : "$this";
      return mongu(args.cond, { ...data, ...{ [as]: item } });
    });
  },
  $map(args, data) {
    return mongu(args.input, data).map((item) => {
      const as = args.as ? `$${args.as}` : "$this";
      return mongu(args.in, { ...data, ...{ [as]: item } });
    });
  },
  $reduce(args, data) {
    return mongu(args.input, data).reduce((acc, item) => {
      return mongu(args.in, { ...data, ...{ $value: acc, $this: item } });
    }, mongu(args.initialValue, data));
  },
  $in(args, data) {
    return mongu(args[1], data).includes(mongu(args[0], data));
  },
  // Conditional Operators
  $cond(args, data) {
    if (mongu(args.if, data)) return mongu(args.then, data);
    else return mongu(args.else, data);
  },
  // Variable Operators
  $let(args, data) {
    const vars = Object.fromEntries(
      Object.entries(args.vars).map(([key, expr]) => {
        return [`$${key}`, mongu(expr, data)];
      })
    );
    return mongu(args.in, { ...data, ...vars });
  },
};

module.exports = mongu;
