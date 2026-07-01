import { MyPromise } from "./promise.js";

export function myPromiseAll(promises) {
  return new MyPromise((res, rej) => {
    if (!Array.isArray(promises)) {
      return rej(new Error("Input must be an array"));
    }

    if (promises.length <= 0) {
      return res([]);
    }

    let result = [];
    let completed = 0;

    for (let p = 0; p < promises.length; p++) {
      MyPromise.resolve(promises[p])
        .then((data) => {
          result[p] = data;
          completed++;
          if (completed === promises.length) {
            res(result);
          }
        })
        .catch((err) => {
          rej(err);
        });
    }
  });
}
