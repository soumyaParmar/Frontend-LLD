Array.prototype.myMap = function (fn, args) {
  if (this === null || this === undefined) {
    throw new TypeError("Null or undefined is not iterable");
  }

  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function`);
  }

  let getObj = Object(this);
  let len = getObj.length;
  let arr = new Array(len);

  for (let i = 0; i < len; i++) {
    if (i in getObj) {
      arr[i] = fn.call(args, getObj[i], i, getObj);
    }
  }

  return arr;
};
