// Simple BFS / DFS (reachability / consistency)

// You’re given a grid representing service zones.
// 1 means the zone is serviceable, 0 means blocked.
// Count how many distinct service regions exist.

// Problem restated (what you say first)

// We have a 2D grid.
// 1 means serviceable, 0 means blocked.
// A service region is a group of 1s connected horizontally or vertically.
// We need to count how many distinct regions exist.

function countServiceRegions(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    // out of bounds or blocked
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
      return;
    }

    // mark as visited
    grid[r][c] = 0;

    // explore neighbors
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}

// Follow-ups
// - BFS or DFS, which do you prefer and why?
//
//      Either works. I usually pick DFS because it’s simpler to write and
//      reason about. If stack depth were a concern, I’d switch to BFS
//      with a queue.
//
// - How would you avoid revisiting zones?
//
//      I mark a zone as visited the first time I see it. Here I reuse the
//      grid and flip 1 to 0 so I don’t need extra memory.
//
// - What changes if the grid is very large?
//
//      I’d avoid recursive DFS because of call stack limits and use an iterative
//      BFS instead.
//      The algorithm stays the same, just the traversal mechanism changes.

// What they’re testing
// - Graph traversal basics
// - Visited-state handling
// - Calm problem decomposition

// Time is O(rows × cols) because each cell is visited once.
// Space is O(rows × cols) in the worst case for the call stack or queue.
