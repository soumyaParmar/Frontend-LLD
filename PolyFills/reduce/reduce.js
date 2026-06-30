Array.prototype.myReduce = function (fn, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError("Null or undefined is not iterable");
  }

  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function`);
  }

  let getObj = Object(this);
  let len = getObj.length;
  let hasAcc = arguments.length >= 2;
  let acc = hasAcc ? initialValue : undefined;
  let i = 0;

  if (!hasAcc) {
    for (i = 0; i < len; i++) {
      if (i in getObj) {
        acc = getObj[i];
        hasAcc = true;
        i++;
        break;
      }
    }
  }
  if (!hasAcc) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  for (let j = i; j < len; j++) {
    if (j in getObj) {
      acc = fn(acc, getObj[j], j, getObj);
    }
  }

  return acc;
};
