export class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onResolveCb = [];
    this.onRejectCb = [];

    const resolve = (val) => {
      if (val instanceof Promise) {
        return val.then(resolve, reject);
      }
      if (this.state === "pending") {
        this.state = "fullfilled";
        this.value = val;
        this.onResolveCb.forEach((cb) => queueMicrotask(() => cb(val)));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectCb.forEach((cb) => queueMicrotask(() => cb(reason)));
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onSuccess, onReject) {
    onSuccess = typeof onSuccess === "function" ? onSuccess : (val) => val;
    onReject =
      typeof onReject === "function"
        ? onReject
        : (err) => {
            throw err;
          };
    return new MyPromise((resolve, reject) => {
      if (this.state === "pending") {
        this.onResolveCb.push(() => {
          queueMicrotask(() => {
            try {
              let x = onSuccess(this.value);

              if (x instanceof MyPromise) {
                x.then(resolve, reject);
              } else {
                resolve(x);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectCb.push(() => {
          queueMicrotask(() => {
            try {
              let x = onReject(this.reason);

              if (x instanceof MyPromise) {
                x.then(resolve, reject);
              } else {
                resolve(x);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
      } else if (this.state === "fullfilled") {
        queueMicrotask(() => {
          try {
            let x = onSuccess(this.value);

            if (x instanceof MyPromise) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === "rejected") {
        queueMicrotask(() => {
          try {
            let x = onReject(this.reason);
            if (x instanceof MyPromise) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  catch(onReject) {
    this.then(null, onReject);
  }
}

let x = new MyPromise((res, rej) => {
  setTimeout(() => {
    res("soumya");
  }, 2000);
});

x.then((data) => {
  console.log(data);
  return data;
})
  .then((data) => console.log(data.split("")))
  .catch((err) => console.log(err));
