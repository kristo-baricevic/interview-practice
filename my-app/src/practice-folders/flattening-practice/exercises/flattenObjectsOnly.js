// EXERCISE 1
// Flatten nested objects into dot paths.
// Do NOT expand arrays. Keep arrays as values.
//
// Example:
// { a: { b: 1 }, tags: ["x","y"] } -> { "a.b": 1, "tags": ["x","y"] }

function flattenObjectsOnly(obj) {
  const out = {};

  // TODO: implement
  // - use recursion
  // - iterate with Object.keys
  // - treat "plain objects" as: v !== null && typeof v === "object" && !Array.isArray(v)
  // - everything else (including arrays) becomes a value in out[path]

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
  user: { profile: { name: "Kristo" }, age: 30 },
  meta: { active: true, score: null },
  tags: ["a", "b"],
};

const expected = {
  "user.profile.name": "Kristo",
  "user.age": 30,
  "meta.active": true,
  "meta.score": null,
  tags: ["a", "b"],
};

assertDeepEqual(flattenObjectsOnly(input), expected, "flatten objects only");
