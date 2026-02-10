function flattenWithBrackets(obj) {
  const out = {};

  function walk(value, path) {
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        const next = path ? `${path}[${i}]` : `[${i}]`;
        walk(item, next);
      });
      return;
    }

    const isObject = value !== null && typeof value === "object";
    if (isObject) {
      for (const key of Object.keys(value)) {
        const next = path ? `${path}.${key}` : key;
        walk(value[key], next);
      }
      return;
    }

    out[path] = value;
  }

  walk(obj, "");
  return out;
}

// Example
console.log(flattenWithBrackets({ items: [{ name: "x" }] }));
// { "items[0].name": "x" }
