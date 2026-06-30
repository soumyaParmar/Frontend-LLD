Array.prototype.myforEach = function (fn, args) {
  if (this === null || this === undefined) {
    throw new Error("This is null or undefined");
  }

  if (typeof fn !== "function") {
    throw new Error("Callback is not a function");
  }

  let genObj = Object(this);

  for (let i = 0; i < genObj.length; i++) {
    if (i in genObj) {
      fn.call(args, genObj[i], i, genObj);
    }
  }
};
