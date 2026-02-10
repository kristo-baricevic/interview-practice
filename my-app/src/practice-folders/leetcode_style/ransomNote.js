/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const counts = new Map();

  for (const c of magazine) {
    counts.set(c, (counts.get(c) || 0) + 1);
  }

  for (const c of ransomNote) {
    if (!counts.has(c) || counts.get(c) === 0) {
      return false;
    }
    counts.set(c, counts.get(c) - 1);
  }

  return true;
};
