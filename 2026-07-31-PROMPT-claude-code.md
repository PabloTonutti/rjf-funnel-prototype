# Cómo montar el clon del funnel en Claude Code

Guía para abrir una sesión de Claude Code y que te construya el funnel completo de RemoteJobsFinder (contenido) con el look de JobWinner (diseño), como prototipo navegable. Al final tienes el prompt listo para pegar.

## Qué le vas a pedir

Un prototipo en HTML/CSS/JS, un solo archivo autocontenido (o carpeta con index.html), navegable en el navegador. 44 pantallas de quiz + loader + pantalla de resultado + registro de maqueta + paywall con contador. Todo el contenido (preguntas, opciones, orden, ramas, interstitials) es el de RemoteJobsFinder; todos los colores, tipografías, botones e infografías son de JobWinner. Registro y pago son maqueta: no hay backend ni cobro, el botón de pago solo muestra un estado de "éxito" simulado.

## Los archivos que necesita (esta misma carpeta)

Esta carpeta `rjf-clone/` es autocontenida. Ábrela como carpeta de trabajo en Claude Code y ya tiene todo:

- `rjf-funnel-spec.md` — el QUÉ construir: las 50 pantallas con sus textos, opciones y ramas, más los tokens de diseño de JobWinner al final. Es la fuente de verdad del contenido.
- `jobwinner-design-system.md` — los tokens oficiales de JobWinner (azul #007AFF, tinta #02112D, Plus Jakarta Sans + Inter, radios y sombras). El LOOK.
- `jobwinner-section-patterns.md` — patrones de sección de JobWinner por si quieres que las infografías respiren igual que la web.

Con estos tres archivos no depende de nada externo. Si además tienes las skills de tu cuenta sincronizadas en Cowork (`jobwinner-product-page` y `product-mockup`), Claude Code las puede usar como refuerzo, pero no son imprescindibles porque los tokens ya están volcados en los .md de la carpeta.

## Pasos

1. Copia la carpeta `rjf-clone/` a tu equipo (o al repo donde quieras el prototipo).
2. Abre Claude Code dentro de esa carpeta: `cd ruta/a/rjf-clone && claude`.
3. Pega el prompt de abajo.
4. Cuando termine, ábrelo con `open index.html` (o el nombre que genere) en Chrome y recórrelo de principio a fin.

## Prompt para pegar en Claude Code

```
Quiero que construyas un prototipo navegable de un funnel de onboarding tipo quiz, en HTML/CSS/JS, autocontenido y sin backend.

Fuente de contenido: lee `rjf-funnel-spec.md` en esta carpeta. Ahí están las 50 pantallas (P1 a P50) con sus títulos, opciones, interstitials, ramas, loader, resultado y paywall. Reproduce ese contenido tal cual, en español, respetando el orden y todas las ramas.

Fuente de diseño: lee `jobwinner-design-system.md` (y `jobwinner-section-patterns.md`) en esta carpeta. Aplica esos tokens a TODO: azul primario #007AFF, tinta #02112D, slate #656F83, éxito #88AB75, fondos #F5F9FD, línea #E3E9F2, radios botón 10px / tarjeta 16px, tipografías Plus Jakarta Sans (títulos 700/800) e Inter (cuerpo 400/600) vía Google Fonts. Nada de morados ni amarillos del original: toda la paleta pasa a JobWinner.

Requisitos:
- Es un PROTOTIPO. El estado vive en variables JS en memoria (sin localStorage). El registro (P49) y el pago (P50) son maqueta: no conectan con nada, solo avanzan o muestran un estado simulado de éxito.
- Una pregunta por pantalla. En opción única, seleccionar NO auto-avanza: hay botón "Continuar". En multiselección y en inputs también hay "Continuar". Flecha de "atrás" arriba a la izquierda en cada pantalla.
- Barra de progreso segmentada arriba con la etiqueta de la fase actual (CURRENT STATUS, YOUR GOALS, AI EXPERIENCE, JOB PREFERENCES, YOUR BACKGROUND, HOW WE HELP, resultado).
- Implementa las ramas: P17 (si "aún no tengo CV" inserta P18, el resto salta a P19) y P12 (adapta el copy de autorización de trabajo al país elegido en P11: UE en vez de EE. UU., o márcala opcional). Las pantallas "¿Te identificas?" guardan la respuesta aunque no cambien el flujo.
- El loader (P47) es un anillo de progreso animado con checklist; el resultado (P48) incluye la línea de tiempo "4-6 semanas" y la tarjeta resumen del perfil con los datos que el usuario fue eligiendo.
- El paywall (P50) tiene contador regresivo real en JS (arranca en ~09:57 y baja), 3 tarjetas de plan con la del medio preseleccionada ("Most popular"), precio por día grande y, en el mismo tamaño y legible, el cargo mensual real ("se factura X€/mes, cancela cuando quieras"). Badge de Stripe de maqueta. CTA que lleva a un estado de éxito simulado.
- Las infografías (comparativa de matches de P41, timeline de P48, badges "3X") constrúyelas en HTML/CSS con la paleta JobWinner, no como imágenes. Si las skills `product-mockup` o `jobwinner-product-page` están disponibles en mi cuenta, úsalas como referencia de estilo.

Ajustes de honestidad de marca (importante, cámbialos respecto al original):
- Si JobWinner no hace auto-apply real, en P46 sustituye "nuestra IA aplica por ti automáticamente" por un claim verdadero, p.ej. "preparamos tu solicitud personalizada para cada oferta".
- En P48 usa un rango honesto de ofertas compatibles (p.ej. "300-450"), no una cifra exacta inventada.
- En el paywall, sin add-ons pre-marcados.

Entrega un solo archivo (o carpeta con index.html) que pueda abrir en Chrome y recorrer entero, de P1 al estado de éxito tras el pago. Cuando termines, dime cómo abrirlo y hazme un resumen de qué pantallas y ramas quedaron implementadas.
```

## Después, si quieres iterar

Cuando lo tengas montado, buenos siguientes pasos para pedirle a Claude Code: ajustar copys concretos, meter tus propias ilustraciones de JobWinner en los interstitials, o preparar una versión responsive para móvil (el original es mobile-first, así que probablemente ya salga bien en vertical). Si quieres que registro y pago dejen de ser maqueta más adelante, eso ya es integración real (auth + Stripe) y conviene tratarlo como fase aparte.
