Array.prototype.myFilter = function (fn, args) {
  if (this === null || this === undefined) {
    throw new TypeError("Null or undefined is not iterable");
  }

  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function`);
  }

  let getObj = Object(this);
  let len = getObj.length;
  let arr = [];

  for (let i = 0; i < len; i++) {
    if (i in getObj && fn.call(args, getObj[i], i, getObj)) {
      arr.push(getObj[i]);
    }
  }

  return arr;
};
