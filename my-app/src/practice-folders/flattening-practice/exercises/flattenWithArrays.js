// EXERCISE 2
// Flatten nested objects AND arrays.
// Arrays are expanded by index using dot notation.
//
// Example:
// { items: [{id:7},{id:8}] } -> { "items.0.id": 7, "items.1.id": 8 }

function flattenWithArrays(value) {
  const out = {};

  // TODO: implement
  // Rules:
  // - If v is an array, recurse into each element with index in the path
  // - If v is a plain object, recurse into each key
  // - Otherwise, set out[path] = v
  // - Root can be an object or an array

  return out;
}

function sortObjectKeys(x) {
  if (Array.isArray(x)) return x.map(sortObjectKeys);
  if (x && typeof x === "object") {
    const out = {};
    for (const k of Object.keys(x).sort()) out[k] = sortObjectKeys(x[k]);
    return out;
  }
  return x;
}

function assertDeepEqual(actual, expected, label) {
  const a = JSON.stringify(sortObjectKeys(actual));
  const e = JSON.stringify(sortObjectKeys(expected));
  if (a !== e) {
    console.error(`FAIL: ${label}`);
    console.error("actual:", JSON.stringify(actual, null, 2));
    console.error("expected:", JSON.stringify(expected, null, 2));
    process.exit(1);
  }
  console.log(`PASS: ${label}`);
}

const input = {
  items: [{ id: 7, info: { ok: true } }, { id: 8 }],
  tags: ["a", "b"],
  grid: [[1, 2], [3]],
  mixed: [{ b: 1 }, 2, null],
};

const expected = {
  "items.0.id": 7,
  "items.0.info.ok": true,
  "items.1.id": 8,
  "tags.0": "a",
  "tags.1": "b",
  "grid.0.0": 1,
  "grid.0.1": 2,
  "grid.1.0": 3,
  "mixed.0.b": 1,
  "mixed.1": 2,
  "mixed.2": null,
};

assertDeepEqual(
  flattenWithArrays(input),
  expected,
  "flatten with arrays (dot indices)"
);

// Root array case
const rootArrayInput = [{ x: 1 }, { x: 2 }];
const rootArrayExpected = { "0.x": 1, "1.x": 2 };
assertDeepEqual(
  flattenWithArrays(rootArrayInput),
  rootArrayExpected,
  "root array flatten"
);
