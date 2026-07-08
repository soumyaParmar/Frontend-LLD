Array.prototype.myflatMap = function (fn, thisArgs) {
  if (this === null || this === undefined) {
    throw new TypeError(`${this} is not defined`);
  }

  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function`);
  }

  let O = Object(this);
  let len = O.length;
  const res = [];
  let index = 0;

  for (let i = 0; i < len; i++) {
    if (i in O) {
      let mappedValue = fn.call(thisArgs, O[i], i, O);

      if (Array.isArray(mappedValue)) {
        for (let j = 0; j < mappedValue.length; i++) {
          res[index] = mappedValue[j];
          index++;
        }
      } else {
        res[index] = mappedValue;
        index++;
      }
    }
  }

  return res;
};

Array.prototype.myflat = function (depth = 1) {
  let res = [];

  const flatten = (arr, depth) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        res.push(...flatten(arr[i], depth - 1));
      } else {
        res.push(arr[i]);
      }
    }
  };
  flatten(this, depth);

  return res;
};

Array.prototype.myFlatMap = function (fn, thisArgs) {
  if (this === null || this === undefined) {
    throw new TypeError(`${this} is not defined`);
  }

  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function`);
  }

  return this.map(fn, thisArgs).flat(1);
};
