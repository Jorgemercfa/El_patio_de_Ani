// Memoria de scroll en memoria (no localStorage/sessionStorage), escopada
// por fullPath (incluye query, o sea categoría/subcategoría activas).
// Vive mientras dure la sesión de la SPA, que es exactamente lo que
// necesitamos: recordar dónde estaba el usuario en el catálogo al entrar
// al detalle de un producto, y restaurarlo al volver.
const positions = new Map();

export function saveScrollPosition(key, y) {
  positions.set(key, y);
}

// Se "consume" (delete) al leer: si el usuario vuelve a entrar a la misma
// URL más adelante sin pasar antes por el detalle, no debe heredar una
// posición vieja.
export function popScrollPosition(key) {
  if (!positions.has(key)) return null;
  const y = positions.get(key);
  positions.delete(key);
  return y;
}