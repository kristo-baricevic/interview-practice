// Sliding Window (search / filtering)

// Given a string representing a customer search query stream,
// find the length of the longest substring without repeating characters.

// Walk me through how you’d do this efficiently.

// Problem restated
// Given a string, find the length of the longest substring that contains no
// repeated characters.

function lengthOfLongestSubstring(s) {
  let left = 0;
  let maxLen = 0;
  const seen = new Set();

  for (let right = 0; right < s.length; right++) {
    // shrink window until s[right] is unique
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// What this is doing, plainly
//
// - left and right define a window in the string
// - The window always contains unique characters
// - seen tracks which characters are currently in the window
// - We expand the window to the right.
// - If we hit a duplicate, we shrink from the left until it’s gone.
// - At each step, we track the largest window we’ve seen.

// Follow-ups
//
// - What state do you keep as the window moves?
//
//      Two pointers and a set of the characters currently in the window.
//
// - Why doesn’t restarting the scan work well?
//
//      Restarting causes repeated work.
//      Sliding window guarantees each character is added and removed
//      at most once.
//
// - How would this change if the input were very large?
//
//      The algorithm stays linear.
//      If memory were a concern, I’d replace the Set with a fixed-size array
//      if the character set is bounded.

// What they’re testing
//
// - Maintaining evolving state
// - Knowing when to move left vs right pointer
// - Explaining logic clearly

// Complexity
// - Time is O(n).
// - Space is O(min(n, character set size))
