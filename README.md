# El_patio_de_Ani

## Firebase requerido

La app ahora usa Firebase Auth + Firestore para:

- Usuarios (`user`)
- Empresas/admin (`company`)
- Catálogo de productos (`products`)

Configura estas variables de entorno antes de ejecutar la app:

- `VUE_APP_FIREBASE_API_KEY`
- `VUE_APP_FIREBASE_AUTH_DOMAIN`
- `VUE_APP_FIREBASE_PROJECT_ID`
- `VUE_APP_FIREBASE_STORAGE_BUCKET`
- `VUE_APP_FIREBASE_MESSAGING_SENDER_ID`
- `VUE_APP_FIREBASE_APP_ID`

> Nota: `cart`, `loyalty` y `reservas` permanecen en `localStorage` para mantener compatibilidad sin romper el flujo actual.