# Plan de rediseño — Landing KEI Software (v2)

Referencias: **lusion.co** y **osmo.supply**, revisadas en el navegador.
Marca: Manual de marca KEI Software (tipografías y paleta). La página de recursos gráficos se ignora y sus fondos no se usan.

## 0. Qué tienen en común las dos referencias (y qué copiamos)

Las dos son **claras, limpias y redondeadas**. No hay formas raras ni cajas duras.

| Recurso | Lusion | Osmo | En KEI |
|---|---|---|---|
| Fondo | Claro, casi blanco con un toque frío | Gris claro | Fondo claro `#F9FAFC` |
| Títulos | Enormes, peso regular, mucho aire | Enormes, centrados, peso regular | Glacial Indifference regular, enorme |
| Contenedores | Paneles grandes con esquinas muy redondeadas | Paneles redondeados y bloques ovalados | Paneles redondeados, nunca cajas con borde |
| Botones | Píldoras con un punto ("● Let's talk") | Píldoras | Píldoras con punto |
| Etiquetas | Mayúsculas chicas con "•" | Mayúsculas chicas en píldora | Montserrat Medium, mayúsculas chicas |
| Acento | Azul fuerte | Lila y verde | Azul UI `#3F7DFF`, como Lusion |
| Detalle | Cruces "+" en las esquinas de los paneles | Cinta de texto bajo el menú | Las dos cosas, muy sutiles |
| Proyectos | Grilla de 2 columnas con imágenes grandes redondeadas, etiquetas y título abajo | Abanico curvo de tarjetas inclinadas | Las dos: abanico en el hero, grilla en proyectos |
| Footer | — | Palabra gigante | Ya lo tenemos: **queda igual** |

Lo que **no** va: objetos 3D inventados, formas abstractas, gradientes "de IA", íconos de stock, cajas con borde, tarjetas cuadradas repetidas.
Todas las imágenes son **contenido real de KEI**: proyectos, equipo y clientes.

## 1. Sistema visual

**Color (solo del manual):**
- Fondo claro `#F9FAFC`: la base de la página.
- Azul hielo `#DFE8FD`: paneles suaves y fondos de etiquetas.
- Fondo oscuro `#020714`: texto principal, la pantalla de carga y el footer.
- Azul marino `#16205E`: paneles oscuros (proceso, cierre).
- Azul UI `#3F7DFF`: el único acento (botón principal, la línea curva, palabras clave). Se usa poco.
- El modo oscuro se mantiene: invierte la base a `#020714`.

**Tipografía:**
- **Glacial Indifference** regular para títulos: grandes, interlineado apretado.
- **Montserrat** para todo lo demás: Light en el cuerpo, Medium en etiquetas y botones, Bold en datos.

**Formas:** esquinas redondeadas grandes en paneles e imágenes, botones píldora, círculos para retratos. Nada rectangular duro.

**Movimiento (sobrio, como en las referencias):**
- Scroll suave (Lenis).
- Títulos que entran línea por línea.
- Imágenes que hacen un zoom leve al pasar el mouse.
- Botones píldora cuyo texto rueda al pasar el mouse.
- Una línea curva azul que se dibuja al bajar, como el arco de Lusion.
- Respeta `prefers-reduced-motion`.

## 2. Estructura, sección por sección

**0. Carga (como Lusion).** Fondo oscuro, una barra fina al centro y un contador grande abajo a la izquierda (000→100). Solo en la primera visita y corta.

**1. Menú (como Osmo).** Una píldora oscura flotante y centrada, con el logo horizontal, "Menú", el modo claro/oscuro, la música y el botón "Hablemos" en azul. Debajo, una cinta fina de texto en movimiento: `PRIMERA CONSULTA SIN CARGO • SOFTWARE A MEDIDA • IA • AUTOMATIZACIÓN • WEB`.

**2. Hero (como Osmo).**
- Título centrado y enorme: **"Software a medida ◆ Resultados reales"**. El ◆ es el isotipo real, chico, entre las dos frases, como la estrella de Osmo.
- Debajo, una línea en Montserrat con palabras resaltadas en pastillas: *"Creamos [sistemas], [IA] y [sitios web] a medida para que tu negocio crezca."*
- Botón "● Hablemos".
- Abajo, un **abanico curvo con los 4 proyectos reales** en tarjetas redondeadas e inclinadas. Gira suave al bajar y se puede arrastrar.

**3. Frase principal (como "Bold Ideas, Brought to Life" de Lusion).**
- Título enorme en dos líneas, la primera con sangría: **"Ideas claras, / software que funciona."**
- A la derecha, un párrafo corto sobre qué hace KEI y el botón "● Cómo trabajamos".
- La línea curva azul cruza la sección al bajar.
- Al lado, un panel redondeado con la imagen de un proyecto.

**4. Servicios (como las filas de Osmo).** Título grande "Qué hacemos". Debajo, las 4 filas separadas por líneas finas: nombre del servicio a la izquierda (Glacial) y descripción a la derecha (Montserrat). Al pasar el mouse, la fila se tiñe de azul hielo y aparece una flecha en píldora. Textos actuales: Sistemas a tu medida, IA que entiende tu negocio, Plataformas que fidelizan, Sitios que convierten.

**5. Proyectos (como "Featured Work" de Lusion).**
- Título "Proyectos" a la izquierda y una bajada chica en mayúsculas a la derecha.
- Grilla de 2×2 con los 4 proyectos: imagen grande con esquinas redondeadas, etiquetas arriba del título (`PLATAFORMA WEB • DISEÑO • DESARROLLO`) y nombre abajo.
- Al pasar el mouse, zoom leve y aparece "Ver proyecto".
- Antes de la grilla, como en el "Play Reel" de Lusion, un panel ancho y redondeado que pasa las capturas de los proyectos, con **"NUESTRO TRABAJO"** gigante partido alrededor de un botón píldora.

**6. Proceso (como el panel oscuro de Osmo).** Un panel azul marino con esquinas muy redondeadas, que rompe el ritmo claro de la página. Los 4 pasos van en columnas: número grande, título y descripción. Una línea azul avanza de un paso al otro al bajar. Textos actuales: Consulta gratuita, Propuesta clara, Desarrollo ágil, Entrega y soporte.

**7. Clientes y testimonios (como Osmo).**
- Etiqueta "CONFÍAN EN NOSOTROS" en píldora y una fila de logos de clientes.
- Los testimonios en un carril horizontal para arrastrar: tarjetas redondeadas con la cita, foto redonda, nombre y empresa.

**8. Equipo (como la tarjeta de autor de Osmo).** Tres tarjetas redondeadas (azul UI, azul marino y azul hielo), una por persona: retrato en un círculo, nombre en Glacial, rol y botón píldora a LinkedIn.

**9. Cierre (como el CTA final de Lusion).** Frase grande y centrada: **"¿Tenés una idea? Hagámosla realidad."** Botón "● Hablemos" en azul.

**10. Contacto (como el formulario de Osmo).** Campos limpios en píldoras gris claro y botón oscuro. Los campos actuales no cambian.

**11. Footer: queda exactamente como está**, con las letras grandes de "KEI Software".

El botón de WhatsApp se mantiene, como una píldora discreta abajo a la derecha.

## 3. Textos

Se ajustan apenas: siempre sobre lo que hace KEI y coherentes con lo que ya está. Lo único nuevo son el título de la sección 3, la bajada del hero y la frase del cierre. Servicios, proceso, proyectos, testimonios y equipo mantienen su contenido.

## 4. Técnica

- Next.js 16 y framer-motion, que ya están. Se suma **Lenis** para el scroll suave.
- No hay escena 3D. Se quitan los fondos animados actuales (LiquidEther, cintas, estrellas) para que la página sea más liviana.
- Las imágenes son las reales de `public/proyectos`, `public/team` y `public/testimonials`.
- El SEO (metadata, datos estructurados), el blog y las preguntas frecuentes no se tocan.

## 5. Orden de implementación

1. Bases: fuentes, colores del manual, scroll suave, botones píldora y etiquetas.
2. Carga, menú y hero (con el abanico).
3. Frase principal y servicios.
4. Proyectos y proceso.
5. Testimonios, equipo, cierre y contacto.
6. Celular, modo oscuro, `reduced-motion`, rendimiento y revisión final con las skills de diseño.

## 6. Pendiente

- **Archivo de Glacial Indifference.** No está en Google Fonts. Necesito los archivos, o tu OK para bajarla del sitio oficial (es gratuita).
