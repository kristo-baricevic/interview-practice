// Container With Most Water
// Prompt

// Given heights of vertical lines, find the maximum area of water a container can hold.

// Example:

// heights = [1,8,6,2,5,4,8,3,7]
// return 49

// Key idea to say out loud

// The area is limited by the shorter line.
// I move the pointer pointing to the shorter line inward,
// because moving the taller one cannot increase the area.

function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);

    max = Math.max(max, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return max;
}

// Why this works

// Width always shrinks
// Only increasing the limiting height can improve area
// Two pointers guarantee linear time

// Time: O(n)
// Space: O(1)
