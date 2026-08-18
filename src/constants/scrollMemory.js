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

export function getScrollY() {
  return (
    document.body.scrollTop ||
    document.documentElement.scrollTop ||
    window.scrollY ||
    0
  );
}

export function setScrollY(y) {
  document.body.scrollTop = y;
  document.documentElement.scrollTop = y;
  // 'auto' es más compatible que valores no estándar.
  window.scrollTo({ top: y, left: 0, behavior: 'auto' });
}
