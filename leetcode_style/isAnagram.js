var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const count = new Map();

  for (let i = 0; i < s.length; i++) {
    count.set(s[i], (count.get(s[i]) || 0) + 1);
    count.set(t[i], (count.get(t[i]) || 0) - 1);
  }

  for (const v of count.values()) {
    if (v !== 0) return false;
  }

  return true;
};
