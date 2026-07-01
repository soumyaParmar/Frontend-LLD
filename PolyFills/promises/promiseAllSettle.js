import { MyPromise } from "./promise.js";

export function promiseAllSettle(promises) {
  return new MyPromise((res, rej) => {
    if (!Array.isArray(promises)) {
      return rej(new Error("Input must be an array"));
    }

    if (promises.length === 0) {
      return res([]);
    }

    let result = [];
    let count = 0;

    for (let p = 0; p < promises.length; p++) {
      MyPromise.resolve(promises[p])
        .then((data) => {
          result[p] = { status: "fulfilled", value: data };
          count++;
          if (count === promises.length) {
            res(result);
          }
        })
        .catch((err) => {
          result[p] = { status: "rejected", reason: err };
          count++;
          if (count === promises.length) {
            res(result);
          }
        });
    }
  });
}

const delay = (ms, value, shouldReject = false) => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) reject(value);
      else resolve(value);
    }, ms);
  });
};

const p1 = delay(500, "Success 1");
const p2 = delay(1000, "Error 2", true);
const p3 = "Immediate value";
promiseAllSettle([p1, p2, p3]).then((results) => {
  console.log("SETTLED RESULTS:", results);
});

promiseAllSettle([]).then((results) => {
  console.log("EMPTY ARRAY TEST:", results);
});
