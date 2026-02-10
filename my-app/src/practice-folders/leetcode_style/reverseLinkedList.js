// Given the beginning of a singly linked list head, reverse the list, and return the new beginning of the list.

// Example 1:

// Input: head = [0,1,2,3]

// Output: [3,2,1,0]
// Example 2:

// Input: head = []

// Output: []

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

var reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // save next
    curr.next = prev; // reverse pointer
    prev = curr; // move prev forward
    curr = next; // move curr forward
  }

  return prev;
};
