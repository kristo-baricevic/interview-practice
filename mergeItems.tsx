function mergeItems(existing, incoming) {
  if (!existing || !incoming) return;

  // we will use a map to allow us quick lookup by id
  const map = new Map();

  // populate map with original array
  for (const item of existing) {
    map.set(item.id, item);
  }

  for (const item of incoming) {
    const currentItem = map.get(item.id);

    if (!currentItem || item.createAt > currentItem.createdAt) {
      map.set(item.id, item);
    }
  }

  return Array.from(map.values()).sort((a, b) => b.createdAt - a.createdAt);
}
