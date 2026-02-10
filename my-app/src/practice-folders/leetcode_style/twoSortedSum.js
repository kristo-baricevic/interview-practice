// Two Sum (Sorted Array)
// You are given a sorted array of integers nums and a target number target.
// Return the indices of the two numbers that add up to target.
// You may assume:
// Exactly one solution exists
// You cannot use the same element twice
// Example:
// nums = [1, 2, 3, 4, 6]
// target = 6

// this solution is better when the array is unsorted (time and space are both O(n))

function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }

    seen.set(nums[i], i);
  }

  return null;
}

// this solution is better when the array is sorted (time is O(n) but space is only O(1))

function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }

  return null;
}
