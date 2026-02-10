// [ { key: "tags", value: "a" }, { key: "tags", value: "b" }, { key: "q", value: "hi" } ]
// { tags: ["a", "b"], q: "hi" }

function flattenToKV (obj) {
  const pairs = []

  const walk = (value, path ) => {
    // handle if array
    if (Array.isArray(value)) {
      value.forEach((item) => {
        walk(item, path)
      })
      return;
    }


    // handle if plain object
    const isPlainObject = value != null && typeof value === "object" && !Array.isArray(value);

    if (isPlainObject) {
      for (const key of Object.keys(value)) {
        walk(value[key], path ? `${path}.${key}` : key)
      }
      return; 
    }


    // push data into pairs
    pairs.push({key: value, path})
  }

  walk(obj, "");
  return pairs;
}
