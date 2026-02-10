function flattenToPairs(obj) {
  const pairs = [];

  function walk(value, path) {
    if (Array.isArray(value)) {
      value.forEach((item) => walk(item, path)); // repeat same key
      return;
    }

    const isPlainObject =
      value !== null && typeof value === "object" && !Array.isArray(value);

    if (isPlainObject) {
      for (const key of Object.keys(value)) {
        walk(value[key], path ? `${path}.${key}` : key);
      }
      return;
    }

    pairs.push({ key: path, value });
  }

  walk(obj, "");
  return pairs;
}

// Example
console.log(flattenToPairs({ tags: ["a", "b"], q: "hi" }));
// [ { key: "tags", value: "a" }, { key: "tags", value: "b" }, { key: "q", value: "hi" } ]
