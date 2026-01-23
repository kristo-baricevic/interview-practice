// Merge / Insert Intervals (time windows)

// You’re given a list of scheduled pickup windows for a driver,
// each as [start, end], sorted by start time and non-overlapping.
// A new pickup request comes in with its own window.

// Write a function that inserts the new window and merges overlaps
// so the schedule remains valid.

// “Because the intervals are sorted and non-overlapping,
// I can walk through them once and decide whether to append, merge, or insert.”

// Iterate through intervals
// If current interval ends before new starts → keep it
// If current interval starts after new ends → insert new once, then keep the rest
// Otherwise → overlap, expand new interval
// If new never inserted, append it at the end

const intervals = [
  [1, 3],
  [5, 7],
  [9, 12],
];

function insertInterval(intervals, newInterval) {
  const result = [];
  let i = 0;

  // 1. Add all intervals that end before the new one starts
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // 2. Merge all overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }

  // 3. Insert the merged interval
  result.push(newInterval);

  // 4. Add the remaining intervals
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

// Follow-ups they might ask
// - What if the list isn’t sorted?
// - What if the new window doesn’t overlap anything?
// - Why is this safe to do greedily?

// What they’re testing
// - Time window reasoning
// - Clean iteration
// - Avoiding edge-case bugs at boundaries

// Time is linear in the number of intervals.
// Space is linear for the result.
