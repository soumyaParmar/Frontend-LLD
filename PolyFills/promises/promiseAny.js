import { MyPromise } from "./promise.js";

export function myPromiseAny(promises) {
  return new MyPromise((res, rej) => {
    if (!Array.isArray(promises)) {
      return rej(new Error("promises must be an array"));
    }

    if (promises.length === 0) {
      return rej(new AggregateError([], "No promise given"));
    }

    let errors = [];
    let count = 0;

    for (let p = 0; p < promises.length; p++) {
      MyPromise.resolve(promises[p])
        .then((data) => res(data))
        .catch((err) => {
          errors[p] = err;
          count++;
          if (count == promises.length) {
            rej(new AggregateError(errors, "promises are rejected"));
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

const pSlow = delay(1000, "Slow Success");
const pFast = delay(200, "Fast Error", true);
const pMedium = delay(500, "Medium Success");

myPromiseAny([pSlow, pFast, pMedium]).then((val) => {
  console.log("ANY SUCCESS (Expected: Medium Success):", val);
});

const pErr1 = delay(100, "Error 1", true);
const pErr2 = delay(300, "Error 2", true);
myPromiseAny([pErr1, pErr2])
  .then((val) => {
    console.error("FAILED! Should not succeed:", val);
  })
  .catch((err) => {
    console.log("ANY REJECTED (Expected: AggregateError):", err);
    console.log("Contained errors in order:", err.errors);
  });

myPromiseAny([])
  .then((val) => {
    console.error("FAILED! Empty array should reject:", val);
  })
  .catch((err) => {
    console.log("EMPTY ARRAY REJECTED:", err.message);
  });
