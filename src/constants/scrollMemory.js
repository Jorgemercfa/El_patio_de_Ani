const positions = new Map();

export function saveScrollPosition(key, y) {
  positions.set(key, y);
}

export function popScrollPosition(key) {
  if (!positions.has(key)) return null;
  const y = positions.get(key);
  positions.delete(key);
  return y;
}