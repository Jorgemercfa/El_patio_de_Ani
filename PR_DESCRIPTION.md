Title: fix: arregla scroll y UX de reserva (Inflable-reserva) + fix móvil

Descripción:

Este PR corrige varios problemas relacionados con el comportamiento de scroll y la experiencia de reserva:

- Corrige el problema de scroll cuando se navega desde un detalle de producto hacia la vista de reserva (Inflable-reserva). Al hacer "Agregar al carrito" desde la página de detalle, la vista de reserva ahora se renderiza desde arriba en lugar de quedarse posicionada en la parte inferior.
- Mejora la experiencia en móvil: cuando el formulario de reserva falla la validación, la pantalla hace scroll al primer campo con error y lo enfoca.
- Ajustes de compatibilidad en la gestión de scroll (reemplazo de behavior no estándar por 'auto').
- Soluciona un caso de solapamiento: reduce el z-index del botón sticky en el detalle para evitar que tape la vista destino.

Archivos modificados:
- src/router.js
- src/constants/scrollMemory.js
- src/views/Inflable-reserva.vue
- src/components/Component-service-item.vue

Checklist de QA:
1. Product-item -> abrir detalle -> pulsar "Agregar al carrito": la vista Inflable-reserva debe cargar desde arriba (desktop + móvil).
2. En Inflable-reserva, intentar enviar el formulario vacío -> la UI scrollea al primer campo con error.
3. Para inflables acuáticos: seleccionar modalidad 'agua' sin completar opciones -> validación bloquea envío.
4. Verificar modal de confirmación y botón "Ir al carrito".
5. Volver desde productsDetails al catálogo y confirmar que el catálogo restaura su scroll anterior.

Branch: fix/reservas-scroll-mobile
Base: main
