// Top K Frequent Elements
// Medium
// Company Tags
// Hints
// Given an integer array nums and an integer k, return the k most frequent elements within the array.

// The test cases are generated such that the answer is always unique.

// You may return the output in any order.

// Example 1:

// Input: nums = [1,2,2,3,3,3], k = 2

// Output: [2,3]
// Example 2:

// Input: nums = [7,7], k = 1

// Output: [7]

function topKFrequent(nums, k) {
  const counts = {};

  for (let n of nums) {
    counts[n] = (counts[n] || 0) + 1;
  }

  const arr = Objects.entries(counts).map((key, freq) => (freq, parseInt(key)));

  const returnVal = arr
    .sorted((a, b) => b[0] - a[0])
    .slice(0, k)
    .map((pair) => pair[1]);

  return returnVal;
}
