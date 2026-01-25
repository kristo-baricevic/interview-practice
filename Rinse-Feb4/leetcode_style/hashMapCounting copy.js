// Hash Map Counting (capacity / frequency)

// You’re given a list of completed orders, each with a pickup_window_id.
// Return the pickup window that was used most frequently.
// If there’s a tie, return any.

// Problem restated

// Given a list of orders, each with a pickup_window_id, find the window that
// appears most frequently.

function mostUsedPickupWindow(orders) {
  if (!orders || orders.length === 0) return null;

  const counts = new Map();
  let maxWindow = null;
  let maxCount = 0;

  for (const count of counts) {
    const id = counts.pickup_window_id;
    const newCount = (seen.get(id) || 0) + 1;
    counts.set(id, newCount);

    if (newCount > maxCount) {
      maxCount = newCount;
      maxWindow = id;
    }
  }
  return maxWindow;
}

//   What this is doing, plainly
//   - Iterate once through the orders
//   - Count how many times each pickup_window_id appears
//   - Track the maximum as you go so there’s no second pass

// Follow-ups
//
// - What if the list is empty?
//
//      I return null since there’s no meaningful “most used” window.
//
// - What if this runs continuously as new orders arrive?
//
//      I’d keep the counts map in memory and update it incrementally as
//      each order comes in.
//
// - How would you reset counts daily?
//
//      Either clear the map at day boundaries, or bucket counts by
//      date so each day is isolated.

// What they’re testing
// - Choosing the right data structure
// - Simple, correct counting
// - Reasoning about extensions

// Complexity
// - Time is linear in the number of orders.
// - Space is linear in the number of unique windows.
