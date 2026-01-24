// Prompt

// Given a sorted array nums, remove duplicates in place so each element appears once.
// Return the new length.

// Example:

// nums = [1,1,2,2,3]
// after mutation → [1,2,3,...]
// return 3

// Key idea to say out loud

// Because the array is sorted, duplicates are adjacent. I can use two pointers, one to read and one to write unique values.

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let write = 1;

  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[read - 1]) {
      nums[write] = nums[read];
      write++;
    }
  }

  return write;
}

// Why this works

// - read scans the array
// - write tracks where the next unique value goes
// - Everything before write is unique

// Time: O(n)
// Space: O(1)
