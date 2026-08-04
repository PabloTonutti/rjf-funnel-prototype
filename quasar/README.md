# JobWinner Funnel — Quasar app

Port 1:1 del prototipo HTML (`../index.html`) a Quasar (Vue 3 + Vite + Pinia + vue-i18n).
Mismo diseño, mismas 54 pantallas, mismas ramas. Estado en memoria (sin localStorage).

## Arrancar

```bash
npm install
npx quasar dev    # http://localhost:8890
npx quasar build  # estáticos en dist/spa
```

Requiere Node 18+ (recomendado 20/22).

## Estructura

| Ruta | Qué es |
|---|---|
| `src/data/screens.js` | **Contenido y flujo**: las 54 pantallas con textos como pares `[en, es]`, ramas (`cond`) y planes del paywall. Portado verbatim del prototipo. |
| `src/stores/funnel.js` | Motor del funnel (Pinia): respuestas, historial, navegación `next/back`, ramas, idioma. |
| `src/components/screens/` | Un componente por tipo de pantalla (18): single/multi choice, salario con histograma, selector de países, interstitials, donuts, loader con micro-preguntas, subida de CV, LinkedIn, paywall… |
| `src/assets/graphics.js` | Iconos duotono, iconos de trazo e ilustraciones SVG (strings, se inyectan con `v-html`). |
| `src/css/app.scss` | El CSS completo del prototipo, copiado tal cual → paridad de píxel. |
| `src/css/quasar.variables.scss` | Tokens JobWinner como variables Quasar (`$primary: #007AFF`…) para lo que se construya encima. |
| `src/i18n/` | Strings de UI (botones/labels) vía vue-i18n. El contenido de pantalla vive en `screens.js` como pares EN/ES a propósito: es contenido, no copy de UI. |

## Integraciones pendientes (producción)

Los puntos de integración están mockeados y marcados en el código:

- **Import de LinkedIn** (`LinkedInAddScreen.vue`): llamar a un endpoint propio (p. ej. `/api/linkedin-import`) que use la API de Renidly **desde el backend** — la key nunca va en el cliente.
- **Parseo de CV** (`ResumeScreen.vue` / `UploadingScreen.vue`): el archivo se lee en el navegador; el parseo real (experiencia/skills) va por backend.
- **Pago** (`PaywallScreen.vue`): conectar Stripe Checkout; hoy el CTA avanza a la pantalla de éxito simulado.
- **Registro** (`SignupScreen.vue`): hoy es maqueta, no envía nada.
