function flattenRows(arr) {
  return arr.map((row) => {
    const out = {};
    function walk(value, path) {
      const isPlainObject =
        value !== null && typeof value === "object" && !Array.isArray(value);

      if (isPlainObject) {
        for (const key of Object.keys(value)) {
          walk(value[key], path ? `${path}.${key}` : key);
        }
      } else {
        out[path] = value;
      }
    }
    walk(row, "");
    return out;
  });
}

// Example
console.log(
  flattenRows([
    { user: { name: "a" }, score: 1 },
    { user: { name: "b" }, score: 2 },
  ])
);
// [ { "user.name": "a", "score": 1 }, { "user.name": "b", "score": 2 } ]
