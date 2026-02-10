function flattenObjectsOnly(obj) {
  const out = {};

  function walk(value, path) {
    const isPlainObject =
      value !== null && typeof value === "object" && !Array.isArray(value);

    if (isPlainObject) {
      for (const key of Object.keys(value)) {
        walk(value[key], path ? `${path}.${key}` : key);
      }
      return;
    }

    out[path] = value;
  }

  walk(obj, "");
  return out;
}

// Example
console.log(flattenObjectsOnly({ tags: ["a", "b"], user: { name: "k" } }));
// { "tags": ["a","b"], "user.name": "k" }
