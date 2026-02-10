var isPalindrome = function (s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  let l = 0;
  let r = cleaned.length - 1;

  while (l < r) {
    if (cleaned[l] !== cleaned[r]) return false;
    l++;
    r--;
  }

  return true;
};

// this one is faster

var isPalindrome = function (s) {
  s = s.trim();

  let left = 0;
  let right = s.length - 1;
  while (left <= right) {
    while (!isAlphaNum(s[left])) {
      left++;
      if (left > right) return true;
    }

    while (!isAlphaNum(s[right])) {
      right--;
      if (left > right) return true;
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;

    left++;
    right--;
  }

  return true;
};

var isAlphaNum = function (char) {
  if (char.toLowerCase() >= "a" && char.toLowerCase() <= "z") return true;

  if (char.toLowerCase() >= "0" && char.toLowerCase() <= "9") return true;

  return false;
};
