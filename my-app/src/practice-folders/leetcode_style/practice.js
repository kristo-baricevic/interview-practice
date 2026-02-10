const isAnagram = (s, t) => {
  if (s.length !== t.length) {
    return false;
  }

  const counts = new Map();

  for (let i = 0; i < s.length; i++) {
    counts.set(s[i], (counts.get(s[i]) || 0) + 1);
    counts.set(t[i], (counts.get(t[i]) || 0) - 1);
  }

  for (v of counts.values()) {
    if (v !== 0) return false;
  }

  return true;
};
