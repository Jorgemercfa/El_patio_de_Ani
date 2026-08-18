### Qué soluciona

- Corrige el problema de scroll cuando se navega desde un detalle de producto hacia la vista de reserva (Inflable-reserva). Al hacer "Agregar al carrito" desde la página de detalle, la vista de reserva ahora se renderiza desde arriba en lugar de quedarse posicionada en la parte inferior.
- Mejora la experiencia en móvil: cuando el formulario de reserva falla la validación, la pantalla hace scroll al primer campo con error y lo enfoca.
- Ajustes de compatibilidad en la gestión de scroll (reemplazo de behavior no estándar por 'auto').
- Soluciona un caso de solapamiento: reduce el z-index del botón sticky en el detalle para evitar que tape la vista destino.

### Archivos modificados
- src/router.js — Mejora de scrollBehavior y uso de behavior compatible.
- src/constants/scrollMemory.js — Uso de window.scrollTo({ behavior: 'auto' }).
- src/views/Inflable-reserva.vue — Forzar scroll-to-top y scroll-to-first-error en validación.
- src/components/Component-service-item.vue — Reducir z-index del botón sticky en móvil.

### Cómo probar (Checklist de QA)
1. Abrir el catálogo (Product-item.vue) y seleccionar un producto para ver su detalle (Component-service-item.vue).
2. Hacer scroll hacia abajo en el detalle y pulsar "🛒 Agregar al carrito" (esto navega a /Inflable-reserva?id=<id>
   - Resultado esperado: la vista Inflable-reserva carga desde arriba (scroll top). Repetir en móvil y desktop.
3. En Inflable-reserva, intentar enviar el formulario vacío:
   - Resultado esperado: la UI scrollea al primer campo con error y lo muestra (mejor experiencia móvil).
4. Para inflables acuáticos: seleccionar modalidad 'agua' y dejar sin elegir conexión o drenaje — la validación debe impedir el envío y mostrar errores.
5. Verificar que el modal de confirmación aparece al enviar con datos válidos y que el botón "Ir al carrito" lleva a /Cart.
6. Volver desde productsDetails al catálogo y comprobar que el catálogo restaura su posición anterior (comportamiento original no se rompe).

### Notas
- La rama es: `fix/reservas-scroll-mobile`
- Base: rama por defecto del repositorio (por defecto `main` o la rama que tengas configurada)

Si estás de acuerdo, abre este PR y asigna a reviewers si procede.
