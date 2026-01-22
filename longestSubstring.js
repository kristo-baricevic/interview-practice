// Sliding Window Problem: Longest Substring Without Repeating Characters
// Prompt

// Given a string s, find the length of the longest substring without repeating characters.

// Examples
// longestSubstring("abcabcbb") // 3  ("abc")
// longestSubstring("bbbbb")    // 1  ("b")
// longestSubstring("pwwkew")   // 3  ("wke")

function longestSubstring(s) {
  if (s.length < 2) return s.length;

  const left = 0;
  const maxLength = 0;
  const seen = new Set();

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
