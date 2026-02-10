function flattenWithArrayIndices(obj) {
  const out = {};

  function flatten(value, path) {
    if (Array.isArray(value)) {
      value.forEach((item, i) =>
        flatten(item, path ? `${path}.${i}` : String(i))
      );
      return;
    }

    const isObject = value !== null && typeof value === "object";
    if (isObject) {
      for (const key of Object.keys(value)) {
        flatten(value[key], path ? `${path}.${key}` : key);
      }
      return;
    }

    out[path] = value;
  }

  flatten(obj, "");
  return out;
}

// Example
const input = { items: [{ id: 7 }, { id: 8 }], tags: ["a", "b"] };
console.log(flattenWithArrayIndices(input));
/*
  {
    "items.0.id": 7,
    "items.1.id": 8,
    "tags.0": "a",
    "tags.1": "b"
  }
  */
