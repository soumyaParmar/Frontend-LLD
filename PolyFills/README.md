# JavaScript Polyfills (LLD Practice)

This directory contains low-level implementations of core JavaScript standard built-in functions. The objective is to understand JavaScript engine mechanics, event loop queues, type conversions, and boundary conditions.

---

## 📚 Table of Contents
1. [Array.prototype.forEach](#1-arrayprototypeforeach)
2. [Array.prototype.map](#2-arrayprototypemap)
3. [Array.prototype.filter](#3-arrayprototypefilter)
4. [Array.prototype.reduce](#4-arrayprototypereduce)
5. [Promise (MyPromise)](#5-promise-mypromise)

---

## 1. Array.prototype.forEach
* **Location:** `forEach/ForEach.js`
* **Key Learning Concepts:**
  * **Generic Object Casting:** Uses `Object(this)` to ensure it works on array-like objects and primitive boxed types (like strings).
  * **Sparsity Preservation:** Checks `i in getObj` to skip unallocated slots in sparse arrays, preventing callback execution on empty items.
  * **Context Binding:** Passes the second argument `thisArg` to the callback function using `.call(thisArg, ...)`.

---

## 2. Array.prototype.map
* **Location:** `map/map.js`
* **Key Learning Concepts:**
  * **Preserving Sparsity on Return:** Allocates the new array length upfront via `new Array(len)` rather than `push` to keep sparse index slots empty in the output.
  * **Casting Length:** Converts length safely to a 32-bit unsigned integer to support all array-like structures.

---

## 3. Array.prototype.filter
* **Location:** `filter/filter.js`
* **Key Learning Concepts:**
  * **Dense Compaction:** Filters matches and returns a dense array via `.push(...)` (unlike `map`, `filter` discards empty indices in the resulting array).
  * **Logical Short-circuiting:** Validates presence (`i in getObj`) before executing the callback selector to avoid unnecessary computations.

---

## 4. Array.prototype.reduce
* **Location:** `reduce/reduce.js`
* **Key Learning Concepts:**
  * **Falsy Guard Check:** Checks `arguments.length >= 2` to detect `initialValue` presence, preventing falsy values (`0`, `""`, `false`) from being ignored.
  * **Accumulator Initialization:** Walks sparse arrays to find the first allocated index to initialize the accumulator when `initialValue` is omitted. Throws `TypeError` if empty.

---

## 5. Promise (MyPromise)
* **Location:** `promises/promise.js`
* **Key Learning Concepts:**
  * **Microtask Scheduling:** Schedules callback execution on the high-priority microtask queue using `queueMicrotask` to maintain standard Promise event timings.
  * **Promise Chaining:** Returns a new `MyPromise` instance from `.then()` and resolves returned promise-like values (`instanceof MyPromise`) recursively.
  * **Default Callbacks:** Safely defaults omitted callbacks (like `.then(null, reject)`) using value passthrough `(val) => val` and rethrow `(err) => { throw err; }`.
  * **Closure-scoped resolve/reject:** Binds lexical `this` to resolving executors for delayed asynchronous execution.

---

## 🚀 How to Run Tests

Run any polyfill script directly via Node.js:

```bash
# From the polyFills directory
node ./promises/promise.js
```
