import { MyPromise } from "./promise.js";

export function myPromiseRace(promises) {
  return new MyPromise((res, rej) => {
    if (!Array.isArray(promises)) {
      return rej(new Error("promises must be an array"));
    }

    if (promises.length === 0) {
      return;
    }

    for (let p = 0; p < promises.length; p++) {
      MyPromise.resolve(promises[p])
        .then((data) => res(data))
        .catch((err) => rej(err));
    }
  });
}
