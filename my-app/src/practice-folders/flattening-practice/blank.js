const flattenObject = (value) => {
  const out = {};

  function walk(v, path) {
    if (Array.isArray(v)) {
      v.forEach((item, i) => {
        walk(item, path ? `${path}.${i}` : String(i));
      });
      return;
    }

    if (v !== null && typeof v === "object") {
      for (const key of Object.keys(v)) {
        walk(v[key], path ? `${path}.${key}` : key);
      }
      return;
    }

    out[path] = v;
  }

  walk(value, "");
  return out;
};
