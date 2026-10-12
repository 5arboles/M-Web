# M ARCHIVE // Streetwear & Apparel

## 1. Visión y Resumen del Proyecto
Plataforma e-commerce y experiencia inmersiva para una marca de ropa urbana y streetwear con remeras oversize pesadas (280 GSM), con proyección a ampliarse a hoodies, pantalones y accesorios.

- **Estética:** Streetwear moderno / brutalista / minimalismo editorial (referencias: *Bucks Sauce*, *Cuberto*, *Modevo*).
- **Público:** Adolescentes y adultos que valoran el calce oversize, la música underground, el entrenamiento pesado y la cultura urbana de fútbol.
- **Paleta de Color:** 100% Monocromático (Negro puro `#000000`, gris grafito, blanco puro de alto contraste).
- **Tipografías:**
  - Principal (Display / Títulos): **Clash Display** (Bold, Geometric, Brutalist).
  - Acento (Editorial / Detalles técnicos): **DM Mono Italic** (Technical Monospace).
  - *Nota para próxima versión:* Considerar **Grenze** (Gothic / Expressive display serif) según feedback del usuario.

## 2. Líneas de Producto Iniciales
1. **IRON & HEAVY (Gym & Pump Covers):** Remeras oversize para entrenamiento pesado, cultura de gimnasio hardcore y disciplina.
2. **DARK ROCK (Underground & Noise):** Remeras oscuras inspiradas en el grunge, punk, estética gótica callejera y tipografías distorsionadas.
3. **BLOKECORE ARCHIVE (Fútbol de Culto & Tribuna):** Estilo futbolero de tablón y retro-moderno con diseño de autor.
4. **VENTA MAYORISTA (B2B):** Packs escalonados (Starter: 10-25u, Brand: 50-100u, Enterprise: +100u) para marcas, locales y gimnasios.

*Nota de alcance:* El personalizador de estampas en vivo (Punto 4) queda pausado para una etapa posterior a pedido del usuario.

## 3. Experiencia 3D (Simulación de Tela 100% — Offscreen Canvas Mode)
- **Geometría y Composición:**
  - Plano de tela de alta densidad (120x90 subdivisiones) que cubre el 100% de la pantalla, con el centro compositivo desplazado hacia la derecha.
  - Fondo negro puro (`#000000`).
  - La tipografía (**Clash Display** y **DM Mono Italic**) flota en la capa superior (`z-index: 20`) por encima del movimiento sobre la izquierda con viñeta suave.
- **Integración del Diseño:**
  - Se utiliza **un único diseño estelar** (`HEAVY DISCIPLINE // 280 GSM`) impreso directamente en la textura de la tela (Canvas 2D 2048x2048), garantizando integración absoluta sin desprendimientos de decal.
- **Física y Deformación:**
  - Bordes anclados estáticos (*pinned edges*) mediante función matemática senoidal perimetral.
  - Ondas de viento con presencia y dinamismo orgánico fluido (`waveIntensity: 0.85`).
  - **Deformación de Cursor en Elipse Vertical:**
    - Se reemplazó la deformación esférica por una **elipse vertical alargada** (`radiusX: 0.48`, `radiusY: 1.35`), simulando los pliegues y caídas de columnas naturales que se forman verticalmente en un tejido colgado.
    - Se restauró la fuerza táctil (`mouseStrength: 0.38`) para que la deformación y el juego de sombras con el foco de luz sean claramente visibles y definidos.
  - **Inclinación reactiva al Scroll con retorno elástico:**
    - Al hacer scroll (rueda del mouse o touch), la tela se inclina hacia el frente (*pitch forward*: la parte superior/delantera baja y la trasera sube con inercia de gravedad).
    - Al detener el scroll, la tela amortigua y regresa suavemente (*smooth spring lerp*) a su posición recta original.
  - **Sombra de Profundidad Inferior Reactiva:**
    - Se incorporó un plano de sombra de oclusión difusa con gradiente radial bajo el borde inferior de la tela (`y: -1.82`).
    - La opacidad y escala de la sombra reaccionan en tiempo real: cuando la tela ondea hacia adelante o se inclina por el scroll, la sombra se oscurece y se proyecta hacia el frente, asentando la tela tridimensionalmente en el espacio.

## 4. Flujo Completo Guiado por Scroll (Versión Actual)
1. **Hero Index & Fondos Rotativos:**
   - **Carrusel de Fondos cada 10s (`BackgroundSlideshow`):** Rotación automática con suave crossfade de `fondo.jpg`, `fondo2.jpg` y `fondo3.jpg` en la capa ambiental posterior con viñeta oscura cinematográfica.
   - La tela 3D interactiva se muestra en el plano frontal sobre el fondo translúcido.
   - Textos de portada con tipografía **Clash Display** y **DM Mono Italic** (sin comillas y con `-0.1em` de espaciado).
   - Tags actualizados: `[ BS AS, ARG ]`, `[ FLAGSHIP DROP // 2026 ]` y etiqueta `DISEÑO:`.
   - Al scrollear hacia abajo, los textos del Hero se desvanecen suavemente (`fade-out` y traslación vertical).
2. **Galería Horizontal de 10 Diseños (Scroll-Driven Slider):**
   - Título: **`DISEÑOS`** con la misma animación de reveal cinético del hero.
   - Subtítulo: `Deslizá hacia abajo para ver todos.`
   - **Imágenes Reales del Usuario:** Las tarjetas ahora utilizan las fotos de producto y modelos subidas por el usuario (`1.jpg` a `7.jpg`), ocupando la totalidad del cuerpo de la tarjeta (`object-cover`).
   - **Tooltip Interactivo que Sigue al Cursor:** Fondo negro con opacidad 0.1 (`bg-black/10`), casi transparente con desenfoque de fondo sutil y tipografía blanca pura, conteniendo el título y detalles.
   - **Botón Blanco al 70% de Ancho:** Posicionado con ancho fijo (`w-[70%]`), entra deslizándose de abajo hacia arriba en rollover y desaparece al salir, sin saltos de tamaño.
   - Cuenta con barra de progreso superior animada (`[ 01 / 10 ]`).
3. **Sección Mayorista (Wholesale):**
   - Título con animación de reveal cinético idéntica al hero.
   - Etiqueta limpia: `VENTA MAYORISTA` (referencia B2B removida).
   - Término textil actualizado a **tintas** (reemplazando serigrafía).
   - Packs: Starter (10-24), Brand (25-99) y Enterprise (100+).
4. **Footer:**
   - Cierre institucional limpio con `[ BS AS, ARG ]` (referencia tipográfica decorativa removida).
El archivo maestro detallado de referencias de diseño, simulación 3D y tipografías se encuentra en [`docs/REFERENCES.md`](file:///Users/wadud/Documents/TRABAJOS/M/M-Web/docs/REFERENCES.md).

## 5. Canales de Conversión
Toda la interacción de compra y consultas mayoristas está integrada directamente hacia **WhatsApp** mediante enlaces con mensajes dinámicos contextualizados según la prenda o pack elegido.

## 6. Configuración de Cuentas y Despliegue
- **Cuenta Oficial Vercel & GitHub:** Siempre utilizar la cuenta **`5arboles`**.
- **Cuenta Desactivada:** No utilizar la cuenta con el email de `lagranalma` / `Granalma` para evitar cruces de credenciales o errores de permisos.


