# M ARCHIVE // Streetwear & Apparel

## 1. Visión y Resumen del Proyecto
Plataforma e-commerce y experiencia inmersiva para una marca de ropa urbana y streetwear con remeras oversize pesadas (280 GSM), con proyección a ampliarse a hoodies, pantalones y accesorios.

- **Estética:** Streetwear moderno / brutalista / minimalismo editorial (referencias: *Bucks Sauce*, *Cuberto*, *Modevo*).
- **Público:** Adolescentes y adultos que valoran el calce oversize, la música underground, el entrenamiento pesado y la cultura urbana de fútbol.
- **Paleta de Color:** 100% Monocromático (Negro puro `#000000`, gris grafito, blanco puro de alto contraste).
- **Tipografías:**
  - Principal (Display / Títulos): **Clash Display** (Bold, Geometric, Brutalist).
  - Acento (Editorial / Detalles técnicos): **DM Mono Italic** (Technical Monospace, `-0.1em` letter-spacing).
  - *Opción de inversión probada en Lab:* DM Mono Italic en jerarquía dominante gigante (`text-8xl`) combinada con micro-etiquetas en Clash Display.

---

## 2. Líneas de Producto Iniciales
1. **IRON & HEAVY (Gym & Pump Covers):** Remeras oversize para entrenamiento pesado, cultura de gimnasio hardcore y disciplina.
2. **DARK ROCK (Underground & Noise):** Remeras oscuras inspiradas en el grunge, punk, estética gótica callejera y tipografías distorsionadas.
3. **BLOKECORE ARCHIVE (Fútbol de Culto & Tribuna):** Estilo futbolero de tablón y retro-moderno con diseño de autor.
4. **VENTA MAYORISTA (B2B):** Packs escalonados (Starter: 10-24u, Brand: 25-99u, Enterprise: +100u) para marcas, locales y gimnasios.

---

## 3. Experiencia 3D Principal (`index.html`)
- **Simulación de Tela en Hero:**
  - Plano de tela de alta densidad (120x90 subdivisiones) cubriendo el fondo interactivo.
  - Deformación de cursor en **elipse vertical alargada** (`radiusX: 0.48`, `radiusY: 1.35`) simulando la caída natural de los pliegues textiles.
  - Inclinación (*pitch*) reactiva al scroll con amortiguación elástica (*spring lerp*).
  - Plano de sombra difusa inferior reactiva en `y: -1.82`.
  - Carrusel automático de fondos ambientales (`fondo.jpg`, `fondo2.jpg`, `fondo3.jpg`) cada 10 segundos.

---

## 4. Laboratorio de Experimentación (`gym.html` / `/gym`)
Página aislada multi-página creada específicamente para testear interacciones avanzadas, física de telas, tipografías cinéticas y galerías alternativas sin tocar la web de producción principal.

- **Ruta de acceso:**
  - Local: `http://localhost:5173/gym.html`
  - Producción Vercel: `/gym` o `/gym.html` (configurado mediante `vercel.json` rewrites y `vite.config.ts` multi-page input).
  - Acceso desde la web principal: Botón `[ LAB: GYM.HTML → ]` en el Hero.

### 4.1. Módulos y Experimentos Activos en `gym.html`
1. **Fondo Paramétrico 3D (Estilo: SUDOR & TENSIÓN):**
   - Estilo fijado por defecto en la simulación 3D: `SUDOR & TENSIÓN` (`waveIntensity: 1.15`, `waveSpeed: 2.2`, `mouseStrength: 0.52`).
   - Fondos y texturas actualizados a fotografías reales de entrenamiento (`gym-lunes.jpg`, `gym2.jpg`, `gym3.jpg`).
   - Interfaz limpia sin controles flotantes ni botones temporales de test.

2. **Doble Canvas 3D & Slider de Fotos (`SecondaryClothElement`):**
   - **Prueba de consumo de RAM/GPU:** Demostró que un segundo lienzo WebGL corriendo en paralelo consume solo **~16.4 MB de VRAM** a **60 FPS** estables, gracias a una subdivisión optimizada (`50x35`).
   - Carrusel de fotos subidas por el usuario (`gym-lunes.jpg`, `gym1.jpg` a `gym5.jpg`) deformadas tridimensionalmente con ondas de tela y cursor reactivo.
   - Monitor de telemetría de hardware en tiempo real en pantalla.

3. **Efectos Tipográficos Cinéticos e Interactivos (`CursorInteractiveTypography`):**
   - **01. Linterna / Spotlight Reveal:** El texto en stroke hueco se revela en color blanco sólido siguiendo la posición del cursor mediante máscara radial CSS.
   - **02. Imán Cinético:** Bloque de texto con atracción magnética y resorte elástico (*Framer Motion Spring*).
   - **03. Aberración Cromática RGB:** Glitch de canales rojo y cian desfasados en hover.
   - **04. Blur-in & Tracking Transition:** Transición de entrada y salida con desenfoque óptico (`blur(12px) -> blur(0px)`) y expansión dinámica de `letter-spacing`.

4. **Showcase de Inversión Tipográfica (`InvertedTypographyShowcase`):**
   - Toggle interactivo para comparar en vivo:
     - **Estándar:** Clash Display gigante + DM Mono micro.
     - **Invertido:** DM Mono Italic gigante (`text-8xl`, kerning `-0.1em`) como display protagónico + Clash Display micro como etiqueta técnica. Estética técnica de ingeniería y taller de costura industrial.

5. **Galería Alternativa 02: Strip Accordion & Contact Sheet (`EditorialAccordionGallery`):**
   - **Modo Accordion Strip:** Tiras fotográficas verticales que se expanden a pantalla ancha al pasar el mouse o tocar, mostrando metadatos de cámara, repeticiones e intensidad.
   - **Modo Contact Sheet:** Cuadrícula de 6 paneles estilo hoja de contactos analógica con modal Lightbox a pantalla completa.

6. **Galería 01 con Micro-Física Tilt (`CursorInteractiveCard`):**
   - 6 tarjetas con textos poéticos sobre el sudor, la disciplina y el peso muerto.
   - Inclinación 3D magnética en base a las coordenadas del puntero, paralaje inverso de imagen y destello especular superior. Consumo de GPU nulo (CSS 3D Transforms).

7. **Manifiesto del Hierro y Tabla Comparativa:**
   - 3 pilares conceptuales (*Inmutabilidad*, *Fisiología del Sudor*, *Moldería de Combate 280G*).
   - Tabla comparativa técnica para decidir qué elementos trasladar a la web de producción oficial.

---

## 5. Inventario de Imágenes del Proyecto
- **Imágenes de Catálogo:** `/images/1.jpg` a `/images/7.jpg`, `model-489-preview.jpg`.
- **Fondos Ambientales:** `/images/fondo.jpg`, `/images/fondo2.jpg`, `/images/fondo3.jpg`.
- **Colección Gym / Disciplina (Nuevas):**
  - `gym-lunes.jpg`: Barra olímpica en piso de goma ("LUNES // NO ONE CARES. WORK HARDER.").
  - `gym1.jpg`: Atleta industrial en sesión de fatiga y sombras.
  - `gym2.jpg`: Manos con magnesio aferradas a mancuernas de acero moleteado.
  - `gym3.jpg`: Hoja de contactos fotográfica de 5 fotogramas ("BY ANY MEANS NECESSARY // IRONWILLED").
  - `gym4.jpg`: Tríptico de cuerdas de batalla, assault bike y slam ball.
  - `gym5.jpg`: Retrato con gorra y pump cover ("CONDITIONS CHANGE // YOU REMAIN STEADY").
- **Logos:** `/images/logo-m.png`, `/images/logo-M-b.png`.

*Nota:* Las imágenes se encuentran sincronizadas tanto en `/public/images/` como en `/dist/images/`.

---

## 6. Configuración de Cuentas, Git & Despliegue
- **Cuenta Oficial:** Siempre utilizar la cuenta **`5arboles`** para GitHub y Vercel.
- **Cuenta Desactivada:** **Nunca** utilizar la cuenta `lagranalma` para evitar conflictos de credenciales.
- **Repositorio Remoto:** `https://github.com/5arboles/M-Web` (Rama: `main`).
- **Build & Despliegue:**
  - Vercel detecta automáticamente los pushes en `main`.
  - Configuración multi-página: `index.html` (principal) y `gym.html` (experimentos).
  - Comando de build: `npm run build` (`tsc && vite build`).
