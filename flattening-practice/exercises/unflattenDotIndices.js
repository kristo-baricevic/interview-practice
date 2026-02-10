// EXERCISE 3 (final boss)
// Unflatten dot paths back into nested objects AND arrays.
// Numeric segments mean array indices.
//
// Example:
// { "items.0.id": 7, "items.1.id": 8 } -> { items: [{id:7},{id:8}] }

function unflattenDotIndices(flat) {
  // TODO: implement
  // Rules:
  // - Split each key by "."
  // - If a segment looks like a number (e.g. "0", "12"), treat that level as an array
  // - Create objects/arrays as needed while walking
  // - Assign the value at the final segment

  return {};
}

function assertDeepEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`FAIL: ${label}`);
    console.error("actual:", JSON.stringify(actual, null, 2));
    console.error("expected:", JSON.stringify(expected, null, 2));
    process.exit(1);
  }
  console.log(`PASS: ${label}`);
}

const flat = {
  "items.0.id": 7,
  "items.0.info.ok": true,
  "items.1.id": 8,
  "tags.0": "a",
  "tags.1": "b",
  "grid.0.0": 1,
  "grid.0.1": 2,
  "grid.1.0": 3,
};

const expected = {
  items: [{ id: 7, info: { ok: true } }, { id: 8 }],
  tags: ["a", "b"],
  grid: [[1, 2], [3]],
};

assertDeepEqual(unflattenDotIndices(flat), expected, "unflatten dot indices");
