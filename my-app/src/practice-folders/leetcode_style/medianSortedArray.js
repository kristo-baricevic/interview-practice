/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

var findMedianSortedArrays = function (nums1, nums2) {
  //ensure nums1.length < nums2.length, if not swap
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  //define x and y as length of nums1 and nums2
  let x = nums1.length;
  let y = nums2.length;
  //define left and right pointers for binary search and even\odd boolean
  let l = 0;
  let r = x;
  const even = (x + y) % 2 === 0;

  //set up while loop for while l <= r
  while (l <= r) {
    //define partition points for nums1 and nums2

    let partitionX = Math.floor((l + r) / 2);
    let partitionY = Math.floor((x + y + 1) / 2 - partitionX);

    //define max and min values for each partitioned array
    let maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    let minRightX = partitionX === x ? Infinity : nums1[partitionX];

    let maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    let minRightY = partitionY === y ? Infinity : nums2[partitionY];

    //perform check to make sure that the max and min values are correct
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      //return values for even and odd
      if (even) {
        return (
          (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2
        );
      } else {
        return Math.max(maxLeftX, maxLeftY);
      }
    }

    //if max and min values are not correct, adjust pointers - two conditions to apply
    if (maxLeftX > minRightY) {
      r = partitionX - 1;
    } else {
      l = partitionX + 1;
    }
  }
};
