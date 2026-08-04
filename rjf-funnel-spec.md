# Spec del funnel a clonar — RemoteJobsFinder (contenido) con estilo JobWinner

Este documento define QUÉ construir. El contenido (textos, preguntas, opciones, orden, ramas, interstitials, loader y paywall) es el de RemoteJobsFinder, copiado 1:1. El LOOK (colores, tipografías, botones, tarjetas, imágenes, infografías) es el de JobWinner, definido en la sección "Sistema de diseño" al final.

Es un PROTOTIPO navegable en HTML/CSS/JS (no producto real): el registro y el pago son pantallas de maqueta, sin backend ni cobro real. Un solo estado en memoria (variables JS), sin localStorage.

Entrada real capturada: `remotejobsfinder.co/en/onboarding/30/quiz`. 44 pantallas de quiz + loader + resultado + paywall. Barra de progreso segmentada arriba con la etiqueta de la fase actual. Una pregunta por pantalla; en las de opción única, tocar la opción NO avanza sola, hay botón "Continuar"; en las multiselección y en los inputs también hay "Continuar". Flecha atrás arriba a la izquierda en todas.

---

## FASE 1 — Current status (Situación actual)

**P1. Estado laboral.** Título: "¿Cuál es tu situación laboral actual?"
Opciones (única): Estoy sin empleo · Tengo empleo · Trabajo por cuenta propia / freelance · Estudiante / busco mi primer empleo.
NOTA: esta es la PRIMERA pantalla del funnel (arranque de baja fricción).

**P2. Enfoque de búsqueda.** "¿Cómo estás enfocando tu búsqueda ahora mismo?"
Opciones: Buscando activamente · Abierto a oportunidades · Solo explorando.

**P3. Tiempo buscando.** "¿Cuánto tiempo llevas buscando empleo?"
Opciones: Acabo de empezar (menos de 1 mes) · 1-3 meses · 3-6 meses · Más de 6 meses · No estoy buscando activamente.

## FASE 2 — Your goals (Tus objetivos)

**P4. Objetivo.** "¿Qué estás buscando?" (opción única, 7 opciones)
Ascender en mi carrera · Cambiar de carrera a algo nuevo · Mi primer empleo a tiempo completo · Un empleo estable y a largo plazo en mi campo · Mejor equilibrio vida-trabajo · Ingreso urgente para mis necesidades · Ingreso extra.

**P5. Interstitial "Gracias".** "¡Gracias por compartir tus objetivos!" + subtítulo "Ahora responde unas preguntas rápidas y nuestra IA elegirá los empleos perfectos para ti." Botón Continuar.

## FASE 3 — AI experience

**P6. ¿Probaste IA?** "¿Has probado herramientas inteligentes como la IA para facilitar tu búsqueda de empleo?"
Opciones: Sí · No estoy seguro · No.

## FASE 4 — Job preferences (Preferencias de empleo)

**P7. Jornada.** "¿A qué tipo de trabajo estás abierto?" Full-time · Part-time · Freelance / Contrato · Prácticas.

**P8. Salario mínimo.** "¿Cuál es tu salario mínimo deseado?" Toggle Por hora / Mensual / Anual + input numérico con símbolo de moneda. Botón Continuar.

**P9. Modo de trabajo.** "¿Qué tipo de empleos prefieres?" 100% remoto · Híbrido · Presencial.

**P10. Gustos del remoto.** "¿Qué es lo que más te gusta de trabajar en remoto?" (multiselección)
Sin tiempo de desplazamiento · Necesidades familiares o personales · Acceso a más oportunidades · Libertad de trabajar desde cualquier sitio · Horario flexible.

**P11. País de residencia.** "¿En qué país resides?" Selector de país (autocompletado). Microcopy: "Si eres nómada digital, elige tu residencia fiscal."

**P12. Autorización de trabajo [pregunta US-céntrica].** "¿Estás autorizado para trabajar en EE. UU.?" No · Sí.
NOTA: en la versión JobWinner para mercado europeo, esta pregunta debe adaptarse al país elegido en P11 (p.ej. "¿Tienes permiso de trabajo en la UE?") o marcarse como opcional. Mantener el hueco de pantalla pero con copy correcto.

**P13. Categorías de empleo.** "¿Qué categorías de empleo te interesan?" (multiselección, con scroll)
Estoy abierto a cualquier puesto · Entrada de datos / Mecanografía · Atención al cliente · Ventas y Partnerships · Marketing y PR · IT y Software · Diseño (gráfico, UX, producto) · [y más al hacer scroll].

## FASE 5 — Your background (Tu perfil)

**P14. Educación.** "¿Cuál es tu nivel de estudios más alto?" Sin estudios formales · Bachillerato/Secundaria · Grado medio (Associate) · Grado (Bachelor's) · Máster · Título profesional (JD, MD, etc.) · Doctorado.

**P15. Nivel profesional.** "¿Cuál es tu nivel profesional actual?" Entry · Junior (menos de 2 años) · Middle (2-4 años) · Senior (5+ años) · Lead / Manager · Director · VP / C-level.

**P16. ¿Roles de menor nivel?** "¿Estás abierto a roles de menor nivel?" Sí, si es necesario · Quizá, si encaja bien · No, solo mi nivel o superior.

**P17. RAMA — Estado del CV.** "¿Qué describe mejor tu CV ahora mismo?" (opción única)
- CV al día → continúa a P19
- El CV necesita cambios → continúa a P19
- Solo LinkedIn → continúa a P19
- Aún no tengo CV → **P18** (pantalla especial)

**P18. Sin CV (solo si "aún no tengo CV").** "¿No tienes CV todavía? No pasa nada." Subtexto: "Puedes continuar ahora y añadirlo más tarde. También podemos ayudarte a crear uno." Botones: "Añadir LinkedIn" (secundario) · "Continuar por ahora" (primario).

**P19. Estrategias probadas.** "¿Qué estrategias de búsqueda has probado antes?" (multiselección)
Portales de empleo / candidaturas directas (LinkedIn, Indeed...) · Referidos de empleados (amigo o colega) · Agencias de reclutamiento · Networking (eventos, comunidades) · Blog personal / redes sociales · Otra.

**P20. Interstitial "El mercado se ha vuelto brutal".** Lista con iconos:
Mucha más gente compitiendo por los mismos empleos · Las empresas usan software complejo para filtrar candidaturas · La mayoría de portales muestran las mismas ofertas caducadas · Las ofertas falsas están por todas partes. Botón Continuar.

## FASE 6 — How we help (Cómo ayudamos) — bloque de pre-suasión

Este bloque alterna interstitials de dato/solución con micro-compromisos "¿Te identificas?" (tarjeta con cita, botones No / Sí) y algunas preguntas de preferencia intercaladas. Secuencia exacta capturada:

**P21.** Interstitial: "Hemos resuelto el puzzle de la búsqueda de empleo." "Hemos analizado 20 millones de empleos para 150.000 usuarios. Ahora sabemos qué consigue que te contraten." Continuar.

**P22.** ¿Te identificas? "Cada empleo que me gusta en LinkedIn ya tiene 200+ candidaturas." No / Sí.

**P23.** Interstitial "Malas noticias": "El 57% de los empleos remotos reciben 300+ candidaturas en 24 horas. No es de extrañar que sea fácil sentirse invisible." Continuar.

**P24.** Interstitial "Buenas noticias": "Escaneamos 1.000+ fuentes de empleo cada día. Los nuevos empleos aparecen aquí primero. Aplica antes de que otros los vean." Continuar.

**P25.** ¿Te identificas? "Me da miedo que mi CV desaparezca en un agujero negro." No / Sí.

**P26.** Interstitial "La verdad sobre las ofertas": "El 80% de las ofertas de empleo remoto no están activas, solo son sondeo de mercado. Nuestra IA selecciona el otro 20% que sí contrata." Continuar.

**P27.** ¿Te identificas? "Creo que un software filtra mi CV antes de que lo vea un reclutador." No / Sí.

**P28.** Interstitial "Lo que realmente pasa": "El 75% de los CV nunca llegan a un reclutador humano. Los sistemas ATS los rechazan automáticamente, a menudo por error." Continuar.

**P29.** Interstitial "De agujeros negros a respuestas": "Optimizamos tu CV para el ATS y nos aseguramos de que llegue a las personas que deciden." Continuar.

**P30.** Horario. "¿Qué horario prefieres?" Horario flexible · Horario fijo de 9 a 5.

**P31.** Tamaño de equipo. "¿Qué tamaño de equipo prefieres?" Equipos grandes · Equipos pequeños · Independiente.

**P32.** Tamaño de empresa. "¿Qué tamaño de empresa prefieres?" Startup · Mediana · Corporación.

**P33.** Beneficios. "¿Qué beneficios te importan más?" (multiselección)
PTO flexible · Seguro médico · Presupuesto para oficina en casa · Equipo proporcionado · Baja parental · Presupuesto de formación · Desarrollo de carrera · Apoyo a salud mental · Gastos de conferencias · Oportunidades internacionales · Programas de bienestar.

**P34.** ¿Te identificas? "Me preocupa que el ATS filtre mi CV antes de que lo vea un reclutador." No / Sí.

**P35.** Interstitial "750k+ empleos ocultos al mes": "Accede a roles privados y ofertas exclusivas que no están en los portales públicos. La mayoría solo ve 1/4 de las oportunidades." Continuar.

**P36.** ¿Te identificas? "Los filtros de LinkedIn rara vez muestran roles que encajan con mi perfil." No / Sí.

**P37.** ¿Te identificas? "Pierdo mucho tiempo haciendo scroll sin fin, pero no encuentro nada que encaje conmigo." No / Sí.

**P38.** ¿Te identificas? "Estoy agotado de saltar entre distintos portales revisando los mismos puestos." No / Sí.

**P39.** ¿Te identificas? "A veces veo ofertas que parecen falsas o estafa." No / Sí.

**P40.** ¿Te identificas? "Rara vez encuentro ofertas que encajen con mi perfil." No / Sí.

**P41.** Interstitial "Una forma más inteligente de buscar" + infografía comparativa de matches: barras "búsqueda tradicional" (62% / 83% / 30% / 71% / 27%) vs "RemoteJobsFinder" (100%...). Copy: "Encontramos empleos que de verdad encajan contigo para que no pierdas el tiempo. Solo oportunidades verificadas que encajan." Continuar.

**P42.** ¿Te identificas? "Estoy harto de rellenar los mismos formularios de solicitud una y otra vez." No / Sí.

**P43.** Interstitial "Es peor de lo que parece": "Una solicitud media tarda 30+ minutos. El 90% es introducción de datos repetitiva. La mayoría pasa más tiempo en formularios que buscando." Continuar.

**P44.** Tiempo diario. "¿Cuánto tiempo puedes dedicar a aplicar al día?" 3-4 horas · 1-2 horas · 30-60 min · 10-30 min · Demasiado ocupado para aplicar.

**P45.** Qué te frena. "¿Qué te impide aplicar a más empleos?" (multiselección) No tengo suficiente tiempo · Los formularios agotan · [más opciones].

**P46.** Interstitial "Nuestra IA aplica por ti automáticamente" + badge "3X" más candidaturas. Continuar.
NOTA JOBWINNER: si JobWinner NO hace auto-apply, cambiar este claim por uno verdadero ("Preparamos tu solicitud personalizada para cada oferta") para no prometer lo que no se entrega.

## FASE 7 — Resultado y paywall

**P47. Loader de matching.** "Emparejándote con empleos remotos según tu perfil." Anillo de progreso con porcentaje que sube (30%...100%) + checklist animada: Categorías y Salario · Experiencia · Preferencias de trabajo · Ubicación y Remoto · Objetivos personales. Debajo, una reseña rotando ("Michael escribió una reseña...").

**P48. Resultado.** "Hemos encontrado N empleos que encajan con tu perfil." Timeline "Consigue empleo en 4-6 semanas": Hoy N empleos → Semana 2: 300-600 candidaturas → Semana 4: 5-10 entrevistas → Semana 6: 1-2 ofertas. Tarjeta resumen del perfil (Objetivo, Roles preferidos, Experiencia, Salario, Preferencias).
NOTA JOBWINNER: usar un rango honesto (p.ej. "300-450 ofertas compatibles"), no una cifra exacta inventada que cambie entre sesiones.

**P49. Registro (maqueta).** En el prototipo, pantalla de email/registro simulada: input de email + botón. No conecta con nada; al pulsar avanza al paywall. (En RJF el sign-up va integrado en el tramo de resultado/paywall.)

**P50. Paywall.** Banner superior sticky: "50% de descuento reservado para ti: 09:57" (contador regresivo real en JS) + botón "GET ACCESS" siempre visible. Planes en 3 tarjetas:
- 1 semana — X€/día
- 1 mes — X€/día — etiqueta "Most popular", preseleccionado
- 3 meses — X€/día — el más barato por día
Todos con "60% OFF" y precio ancla tachado. Debajo, en el mismo tamaño que el precio por día (decisión JobWinner de transparencia), el cargo real: "se factura X€/mes, cancela cuando quieras". Botón CTA. Bloques inferiores: "Lo que desbloqueas", "Lo que incluye" (1M+ empleos, auto-apply, resume builder), "Aparecemos en" (logos de prensa), reseñas. Badge de Stripe (maqueta, sin cobro).
NOTA JOBWINNER: sin add-ons pre-marcados. Contador y descuento sí (tráfico frío), pero cargo mensual visible y legible.

---

## Ramas y variantes a implementar (todas)

1. **P17 estado del CV** → si "aún no tengo CV", insertar P18; el resto salta a P19.
2. **P12 autorización** → adaptar el copy al país de P11 (UE vs US). En el prototipo basta con un condicional simple por país.
3. **P9 modo de trabajo** → en RJF el camino no cambia (verificado). No hace falta rama de ubicación distinta, pero dejar el hook por si se quiere.
4. Todas las pantallas "¿Te identificas?" registran la respuesta (No/Sí) aunque no cambien el flujo (son micro-compromisos).
5. **Barra de progreso** avanza por fase; la etiqueta de fase cambia (CURRENT STATUS → YOUR GOALS → AI EXPERIENCE → JOB PREFERENCES → YOUR BACKGROUND → HOW WE HELP → resultado).

---

## Sistema de diseño JobWinner (el LOOK que se aplica encima)

Fuente de verdad: skill `jobwinner-product-page/references/design-system.md` y skill `product-mockup`. Tokens:

```
Azul primario   #007AFF   hover #0062D6   tint #EAF3FD
Tinta (texto)   #02112D   slate #656F83
Terracota       #DE8F6E   (acento cálido)
Nube (fondos)   #F5F9FD   línea #E3E9F2
Éxito (checks)  #88AB75   fondo #F3F7EE   oro #F2C037
Radios: botón 10px · tarjeta 16px
Sombra: 0 1px 2px rgba(2,17,45,.05), 0 8px 24px rgba(2,17,45,.05)
Tipografía: Plus Jakarta Sans 700/800 (títulos) · Inter 400/600 (cuerpo), vía Google Fonts @import
```

Componentes clave a estilar con estos tokens:
- Opciones de respuesta: tarjeta blanca, borde 1px `#E3E9F2`, radio 16, hover tint `#EAF3FD`; seleccionada: borde 2px azul `#007AFF` + glow suave.
- Botón "Continuar": relleno azul, radio 10, peso 600, flecha → con `::after`. Secundario: blanco, borde 1px azul.
- Barra de progreso: segmentos, activo azul.
- Checks de multiselección e infografías: verde éxito `#88AB75`.
- Interstitials: título Plus Jakarta Sans 800 tinta, cuerpo Inter slate, ilustración/emoji centrado.
- Loader: anillo azul sobre `#E3E9F2`, checklist con checks verdes.
- Tarjetas de precio del paywall: tarjeta blanca + borde línea; "Most popular" = borde 2px azul + glow; etiqueta pill azul pinchada al borde superior; precio en Plus Jakarta Sans 800 40px; ancla tachada muted; "60% OFF" chip verde.
- Mockups/infografías (comparativa de matches, timeline 4-6 semanas): construir en HTML/CSS con la skill `product-mockup`, acento `#007AFF`, no capturas.

Nada de morados ni amarillos de RemoteJobsFinder: todo pasa a la paleta azul JobWinner.
