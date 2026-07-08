function deepcopy(value, visited = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;

  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);

  if (visited.has(value)) return visited.get(value);

  if (value instanceof Map) {
    const clone = new Map();
    visited.set(value, clone);

    value.forEach((val, key) => {
      clone.set(deepcopy(key, visited), deepcopy(val, visited));
    });

    return clone;
  }

  if (value instanceof Set) {
    const clone = new Set();
    visited.set(value, clone);

    value.forEach((val) => {
      clone.add(deepcopy(val, visited));
    });

    return clone;
  }

  const clone = Array.isArray(value)
    ? new Array(value.length)
    : Object.create(Object.getPrototypeOf(value));

  visited.set(value, clone);

  const keys = Reflect.ownKeys(value);
  for (let key of keys) {
    if (Object.prototype.propertyIsEnumerable.call(value, key)) {
      clone[key] = deepcopy(value[key], visited);
    }
  }
  return clone;
}
