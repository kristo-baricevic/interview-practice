"use strict";

function header(title) {
  console.log("\n" + "=".repeat(60));
  console.log(title);
  console.log("=".repeat(60));
}

function arraysBasics() {
  header("Array basics");

  const nums = [1, 2, 3, 4, 5];

  const mapped = nums.map((n) => n * 2);
  const filtered = nums.filter((n) => n % 2 === 0);
  const reduced = nums.reduce((acc, n) => acc + n, 0);

  console.log({ nums, mapped, filtered, reduced });

  console.log(
    "find:",
    nums.find((n) => n > 3)
  );
  console.log(
    "findIndex:",
    nums.findIndex((n) => n > 3)
  );
  console.log(
    "some:",
    nums.some((n) => n === 3)
  );
  console.log(
    "every:",
    nums.every((n) => n > 0)
  );
  console.log("includes:", nums.includes(4));
  console.log("indexOf:", nums.indexOf(3));
  console.log("lastIndexOf:", [1, 2, 2, 3].lastIndexOf(2));

  const mut = [1, 2, 3];
  mut.push(4);
  const popped = mut.pop();
  mut.unshift(0);
  const shifted = mut.shift();
  const splicedOut = mut.splice(1, 1, 99);
  mut.sort((a, b) => a - b);
  mut.reverse();

  console.log({ mut, popped, shifted, splicedOut });

  const base = [1, 2, 3, 4];
  const sliced = base.slice(1, 3);
  const concatted = base.concat([5, 6]);
  const spreadCopy = [...base];

  console.log({ base, sliced, concatted, spreadCopy });

  const nested = [1, [2, [3, 4]], 5];
  console.log("flat:", nested.flat(2));

  const flatMapped = [1, 2, 3].flatMap((n) => [n, n * 10]);
  console.log("flatMap:", flatMapped);

  console.log("join:", ["a", "b", "c"].join("-"));

  if (typeof base.toSorted === "function") {
    console.log(
      "toSorted:",
      base.toSorted((a, b) => b - a)
    );
    console.log("toReversed:", base.toReversed());
    console.log("toSpliced:", base.toSpliced(1, 1, 999));
    console.log("with:", base.with(0, 111));
  } else {
    console.log(
      "toSorted/toReversed/toSpliced/with not available in this runtime"
    );
  }
}

function objectBasics() {
  header("Object basics");

  const obj = { a: 1, b: 2 };
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const entries = Object.entries(obj);
  const rebuilt = Object.fromEntries(entries);

  console.log({ obj, keys, values, entries, rebuilt });

  console.log("'a' in obj:", "a" in obj);
  console.log("Object.hasOwn(obj,'a'):", Object.hasOwn(obj, "a"));

  const merged1 = { ...obj, c: 3 };
  const merged2 = Object.assign({}, obj, { c: 3 });
  console.log({ merged1, merged2 });

  const frozen = Object.freeze({ x: { y: 1 } });
  try {
    frozen.x.y = 2;
  } catch (e) {
    console.log("freeze write threw:", String(e));
  }
  console.log("freeze is shallow:", frozen);

  const proto = { kind: "proto" };
  const child = Object.create(proto);
  child.own = 123;

  console.log("Object.create:", { protoKind: child.kind, own: child.own });
  console.log("Object.keys(child):", Object.keys(child));

  const defined = {};
  Object.defineProperty(defined, "hidden", {
    value: 42,
    enumerable: false,
    writable: true,
    configurable: true,
  });
  console.log("defineProperty enumerable keys:", Object.keys(defined));
  console.log(
    "descriptor:",
    Object.getOwnPropertyDescriptor(defined, "hidden")
  );
}

function mapBasics() {
  header("Map basics");

  const m = new Map();
  m.set("a", 1);
  m.set("b", 2);

  const keyObj = { id: 1 };
  m.set(keyObj, "value for object key");

  console.log("get('a'):", m.get("a"));
  console.log("has('b'):", m.has("b"));
  console.log("get(objectKey):", m.get(keyObj));
  console.log("size:", m.size);

  console.log("entries:", [...m.entries()]);
  console.log("keys:", [...m.keys()]);
  console.log("values:", [...m.values()]);

  m.delete("b");
  console.log("after delete:", [...m.entries()]);

  m.clear();
  console.log("after clear size:", m.size);
}

function setBasics() {
  header("Set basics");

  const s = new Set([1, 2, 2, 3]);
  console.log("set:", [...s], "size:", s.size);

  s.add(4);
  console.log("has 3:", s.has(3));
  s.delete(2);
  console.log("after delete 2:", [...s]);

  const arr = [1, 1, 2, 3, 3];
  const unique = [...new Set(arr)];
  console.log({ arr, unique });
}

function weakMapWeakSetBasics() {
  header("WeakMap / WeakSet basics");

  const wm = new WeakMap();
  const ws = new WeakSet();

  const o1 = { name: "one" };
  const o2 = { name: "two" };

  wm.set(o1, { cached: true });
  ws.add(o2);

  console.log("WeakMap has o1:", wm.has(o1));
  console.log("WeakMap get o1:", wm.get(o1));
  console.log("WeakSet has o2:", ws.has(o2));

  wm.delete(o1);
  ws.delete(o2);

  console.log("after delete wm.has(o1):", wm.has(o1));
  console.log("after delete ws.has(o2):", ws.has(o2));
}

function jsonBasics() {
  header("JSON basics");

  const data = { a: 1, b: [2, 3], c: { d: "x" } };
  const str = JSON.stringify(data);
  const parsed = JSON.parse(str);

  console.log({ data, str, parsed });

  const withDate = { createdAt: new Date("2026-02-10T12:00:00Z") };
  const dateStr = JSON.stringify(withDate);
  const dateParsed = JSON.parse(dateStr);
  console.log({ withDate, dateStr, dateParsed });
}

function iterationBasics() {
  header("Iteration basics");

  const arr = ["x", "y", "z"];
  for (const v of arr) console.log("for...of array value:", v);

  const obj = { a: 1, b: 2 };
  for (const k in obj) console.log("for...in object key:", k);

  for (const [k, v] of Object.entries(obj)) {
    console.log("Object.entries for...of:", k, v);
  }

  const m = new Map([
    ["k1", "v1"],
    ["k2", "v2"],
  ]);
  for (const [k, v] of m) console.log("for...of map:", k, v);
}

function copyingAndEqualityBasics() {
  header("Copying and equality (React-relevant basics)");

  const a = { x: 1, nested: { y: 2 } };
  const b = { ...a };

  console.log("a === b:", a === b);
  console.log("a.nested === b.nested (shallow copy):", a.nested === b.nested);

  const arr1 = [1, 2, 3];
  const arr2 = [...arr1];
  console.log("arr1 === arr2:", arr1 === arr2);

  const deepCandidate = { x: 1, nested: { y: 2 }, list: [1, 2] };
  let deepCopy;

  if (typeof structuredClone === "function") {
    deepCopy = structuredClone(deepCandidate);
  } else {
    deepCopy = JSON.parse(JSON.stringify(deepCandidate));
  }

  console.log("deepCandidate === deepCopy:", deepCandidate === deepCopy);
  console.log(
    "deepCandidate.nested === deepCopy.nested:",
    deepCandidate.nested === deepCopy.nested
  );
}

function main() {
  arraysBasics();
  objectBasics();
  mapBasics();
  setBasics();
  weakMapWeakSetBasics();
  jsonBasics();
  iterationBasics();
  copyingAndEqualityBasics();
}

main();
