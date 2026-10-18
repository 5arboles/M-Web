import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowDown, Sparkles, Layers, Activity, Flame, Shield } from 'lucide-react'
import { GymClothCanvas, ClothParams } from '@/components/experiments/GymClothCanvas'
import { CursorInteractiveCard, GymCardItem } from '@/components/experiments/CursorInteractiveCard'
import { SecondaryClothElement } from '@/components/experiments/SecondaryClothElement'
import { CursorInteractiveTypography } from '@/components/experiments/CursorInteractiveTypography'
import { InvertedTypographyShowcase } from '@/components/experiments/InvertedTypographyShowcase'
import { EditorialAccordionGallery } from '@/components/experiments/EditorialAccordionGallery'

// Estilo fijado: SUDOR & TENSIÓN
const SUDOR_TENSION_PARAMS: ClothParams = {
  waveIntensity: 1.15,
  waveSpeed: 2.2,
  mouseStrength: 0.52,
  radiusX: 0.42,
  radiusY: 1.55,
  baseRotX: -0.38,
  backDarkness: 0.55,
}

// 3 imágenes de gym para los fondos rotativos de gym.html
const GYM_BACKGROUNDS = [
  {
    url: '/images/gym-lunes.jpg',
    title: 'LUNES // NO ONE CARES. WORK HARDER.',
  },
  {
    url: '/images/gym2.jpg',
    title: 'KNURLED STEEL & CHALK // HEAVY GRIP',
  },
  {
    url: '/images/gym3.jpg',
    title: 'BY ANY MEANS NECESSARY // IRONWILLED',
  },
]

// Datos de las tarjetas con fotos de gimnasio y textos poéticos sobre esfuerzo, disciplina y sudor
const GYM_CARDS_DATA: GymCardItem[] = [
  {
    id: 'gym-01',
    number: '01',
    title: 'CALLO & PALMA',
    reps: '10x10 RITUAL',
    subtext: 'HEAVY DISCIPLINE',
    weightGsm: '280 GSM',
    image: '/images/gym-lunes.jpg',
    poeticNote:
      'La mano que sangra hoy sostiene el peso del mundo mañana. La fricción del moleteado de acero es el primer bautismo de la disciplina.',
  },
  {
    id: 'gym-02',
    number: '02',
    title: 'RITUAL DE LAS 5 AM',
    reps: 'SERIE DESTRUCTIVA',
    subtext: 'COLD MORNING',
    weightGsm: '280 GSM',
    image: '/images/gym1.jpg',
    poeticNote:
      'Nadie te mira. No hay público ni aplausos. Solo el vapor de tu aliento contra el espejo helado y el peso muerto esperando en la tarima.',
  },
  {
    id: 'gym-03',
    number: '03',
    title: 'HIPERTROFIA & SILENCIO',
    reps: 'HASTA EL FALLO',
    subtext: 'DEEP PRESSURE',
    weightGsm: '280 GSM',
    image: '/images/gym2.jpg',
    poeticNote:
      'La fibra muscular se quiebra microscópicamente para reconstruirse más densa. Lo mismo le ocurre al carácter que rehúsa rendirse.',
  },
  {
    id: 'gym-04',
    number: '04',
    title: 'EL PESO DE LA CONSTANCIA',
    reps: 'CARGA PROGRESIVA',
    subtext: 'HEAVY RAW FIT',
    weightGsm: '280 GSM',
    image: '/images/gym3.jpg',
    poeticNote:
      'La motivación dura tres minutos frente al espejo. La disciplina dura trescientas repeticiones pesadas cuando el cuerpo implora frenar.',
  },
  {
    id: 'gym-05',
    number: '05',
    title: 'ARMADURA TEXTIL',
    reps: 'PUMP COVER DROP',
    subtext: 'PEINADO 280G',
    weightGsm: '280 GSM',
    image: '/images/gym4.jpg',
    poeticNote:
      'Caída recta y rígida. Algodón peinado denso para absorber el sudor de la última serie forzada y resistir el roce violento de la barra en la espalda.',
  },
  {
    id: 'gym-06',
    number: '06',
    title: 'GRAVEDAD IMPARCIAL',
    reps: '1RM MÁXIMO',
    subtext: 'RAW CONCRETE',
    weightGsm: '280 GSM',
    image: '/images/gym5.jpg',
    poeticNote:
      'Descender con control milimétrico. Explotar hacia arriba con furia disciplinada. El hierro es el único juez del mundo que nunca te miente.',
  },
]

export const GymExperimentPage: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0)

  // Rotación automática de los 3 fondos de gym cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % GYM_BACKGROUNDS.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const activeGymBg = GYM_BACKGROUNDS[bgIndex]

  return (
    <div className="relative min-h-screen bg-black text-[#f4f4f4] font-sans selection:bg-white selection:text-black">
      {/* 0. Capa ambiental de los 3 fondos de gym con crossfade */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={activeGymBg.url}
            src={activeGymBg.url}
            alt={activeGymBg.title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.22, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
          />
        </AnimatePresence>
      </div>

      {/* 1. Fondo 3D interactivo fijado con física "SUDOR & TENSIÓN" y los 3 fondos de gym */}
      <GymClothCanvas textureUrl={activeGymBg.url} params={SUDOR_TENSION_PARAMS} />

      {/* 2. Capa ambiental y viñetas */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-black/80 via-transparent to-black/90" />

      {/* 3. Barra Superior de Navegación del Laboratorio */}
      <header className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <a href="/" className="shrink-0">
            <img
              src="/M.svg"
              alt="Logo M"
              className="w-9 h-9 object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
            />
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="px-3.5 py-1.5 font-display font-black text-xs tracking-wider uppercase rounded bg-black/60 text-zinc-300 hover:bg-white hover:text-black border border-white/25 hover:border-white transition-all"
            >
              URBAN
            </a>
            <a
              href="/gym.html"
              className="px-3.5 py-1.5 font-display font-black text-xs tracking-wider uppercase rounded bg-white text-black border border-white shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all"
            >
              GYM
            </a>
          </div>
        </div>

        {/* Quick section links */}
        <nav className="hidden lg:flex items-center gap-3 text-[11px] text-zinc-400">
          <a href="#secondary-cloth" className="hover:text-white transition-colors">
            [ 1. TELA 3D SLIDER & RAM ]
          </a>
          <a href="#typo-effects" className="hover:text-white transition-colors">
            [ 2. EFECTOS TIPOGRÁFICOS ]
          </a>
          <a href="#inverted-typo" className="hover:text-white transition-colors">
            [ 3. INVERTIR DM MONO ]
          </a>
          <a href="#accordion-gallery" className="hover:text-white transition-colors">
            [ 4. ACCORDION FOTOS ]
          </a>
          <a href="#cards-gallery" className="hover:text-white transition-colors">
            [ 5. TILT CARDS ]
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/15 rounded text-[10px] text-zinc-300">
            <Activity className="w-3 h-3 text-white animate-pulse" />
            <span>SUDOR &amp; TENSIÓN</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest">[ 60 FPS ]</span>
          </div>
        </div>
      </header>

      {/* 4. Contenido Modular Scrolleable */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-36">
        {/* ========================================================
            SECCIÓN 01: HERO POÉTICO // BITÁCORA DE HIERRO
           ======================================================== */}
        <section className="min-h-[85vh] flex flex-col justify-between py-8">
          {/* Header de la sección con Logo M.svg y botones URBAN / GYM */}
          <div className="flex items-center justify-between gap-4 font-mono text-xs text-zinc-500">
            <div className="flex items-center gap-3">
              <a href="/" className="shrink-0">
                <img
                  src="/M.svg"
                  alt="Logo M"
                  className="w-[68px] sm:w-[82px] h-auto object-contain filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
                />
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="/"
                  className="px-3.5 py-1.5 font-display font-black text-xs tracking-wider uppercase rounded bg-black/60 text-zinc-300 hover:bg-white hover:text-black border border-white/25 hover:border-white transition-all"
                >
                  URBAN
                </a>
                <a
                  href="/gym.html"
                  className="px-3.5 py-1.5 font-display font-black text-xs tracking-wider uppercase rounded bg-white text-black border border-white shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all"
                >
                  GYM
                </a>
              </div>
            </div>
            <span className="hidden md:inline text-[10px] text-zinc-500 uppercase tracking-widest">
              [ FONDO ACTIVO {bgIndex + 1}/3: {activeGymBg.title} ]
            </span>
          </div>

          {/* Bloque central de contenido editorial y poético */}
          <div className="max-w-2xl space-y-6 my-auto">
            {/* Tag de disciplina */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded font-mono text-[11px] text-white">
              <Flame className="w-3.5 h-3.5 fill-white text-white" />
              <span>BITÁCORA DE HIERRO // VOLUMEN 01</span>
            </div>

            {/* Titular gigante en Clash Display con animación de entrada en loop cada 3s */}
            <div className="space-y-0 -space-y-2 sm:-space-y-3.5">
              <div className="overflow-hidden">
                <motion.h1
                  animate={{ y: ['100%', '0%'] }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.82] text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]"
                >
                  EL HIERRO
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  animate={{ y: ['100%', '0%'] }}
                  transition={{
                    duration: 0.8,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1],
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.82] text-white uppercase text-transparent [-webkit-text-stroke:1px_#ffffff] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]"
                >
                  NO NEGOCIA.
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  animate={{ y: ['100%', '0%'] }}
                  transition={{
                    duration: 0.8,
                    delay: 0.16,
                    ease: [0.16, 1, 0.3, 1],
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.82] text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]"
                >
                  LA GRAVEDAD NO MIENTE.
                </motion.h1>
              </div>
            </div>

            {/* Texto poético sobre el gimnasio, el sudor y la disciplina */}
            <p className="font-mono italic text-sm sm:text-base text-zinc-300 leading-relaxed border-l-2 border-white/50 pl-4 max-w-xl bg-black/40 backdrop-blur-sm py-1.5">
              El dolor voluntario no busca aplausos ni cámaras. A las cinco de la mañana, cuando el metal quema las palmas frías y el sudor gotea sobre el cemento, solo queda la verdad pura del esfuerzo. La barra cargada a doscientos kilos no conoce de excusas. El tejido 280 GSM actúa como una armadura: sostiene el sudor, resiste el tirón y viste el volumen del músculo exhausto.
            </p>

            {/* Ficha técnica del ritual */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-black/70 backdrop-blur-md border border-white/15 rounded font-mono text-xs text-zinc-300 max-w-lg">
              <div>
                <span className="text-zinc-500 block text-[9px] uppercase">CONSTANTE:</span>
                <strong className="text-white text-sm">9.80 m/s²</strong>
              </div>
              <div>
                <span className="text-zinc-500 block text-[9px] uppercase">RITUAL:</span>
                <strong className="text-white text-sm">HIPERTROFIA</strong>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-zinc-500 block text-[9px] uppercase">TEJIDO:</span>
                <strong className="text-white text-sm">280 GSM RAW</strong>
              </div>
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 pt-8 border-t border-white/10">
            <ArrowDown className="w-4 h-4 text-white animate-bounce" />
            <span className="uppercase tracking-wider">
              SCROLL HACIA ABAJO PARA EXPLORAR LOS NUEVOS EXPERIMENTOS ↓
            </span>
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 02: SLIDER 3D CON FÍSICA DE TELA & BENCHMARK DE RAM
           ======================================================== */}
        <section id="secondary-cloth" className="scroll-mt-24">
          <SecondaryClothElement />
        </section>

        {/* ========================================================
            SECCIÓN 03: EFECTOS EN TEXTOS & TIPOGRAFÍAS CON EL CURSOR
           ======================================================== */}
        <section id="typo-effects" className="scroll-mt-24">
          <CursorInteractiveTypography />
        </section>

        {/* ========================================================
            SECCIÓN 04: INVERSIÓN TIPOGRÁFICA (DM MONO GIGANTE VS CLASH)
           ======================================================== */}
        <section id="inverted-typo" className="scroll-mt-24">
          <InvertedTypographyShowcase />
        </section>

        {/* ========================================================
            SECCIÓN 05: GALERÍA ALTERNATIVA // STRIP ACCORDION & CONTACT GRID
           ======================================================== */}
        <section id="accordion-gallery" className="scroll-mt-24">
          <EditorialAccordionGallery />
        </section>

        {/* ========================================================
            SECCIÓN 06: GALERÍA CON MICRO-FÍSICA AL PASAR EL CURSOR (CARDS TILT)
           ======================================================== */}
        <section id="cards-gallery" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="uppercase tracking-widest">
                  SECCIÓN 06 // MICRO-FÍSICA: TARJETAS CON PARALAJE INVERSO AL PASAR EL CURSOR
                </span>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  animate={{ y: ['100%', '0%'] }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight"
                >
                  GALERÍA DE DISCIPLINA 01
                </motion.h2>
              </div>
              <p className="font-mono italic text-sm text-zinc-400 max-w-xl">
                Cada tarjeta reacciona al cursor con inclinación magnética 3D y desplazamiento de profundidad. Animaciones de entrada y salida fluidas según el viewport.
              </p>
            </div>

            <div className="p-3 bg-black/60 border border-white/15 rounded font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="text-white font-bold flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                <span>RENDIMIENTO: ZERO GPU LAG</span>
              </div>
              <span>CSS 3D Transforms + Framer Motion Spring Physics</span>
            </div>
          </div>

          {/* Grid de tarjetas interactivas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {GYM_CARDS_DATA.map((item, idx) => (
              <CursorInteractiveCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 07: FONDO 2 // WE ARE PRESSED BUT NOT CRUSHED
           ======================================================== */}
        <section className="min-h-[70vh] flex flex-col justify-center border-t border-b border-white/10 py-16">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="uppercase tracking-widest">
                SECCIÓN 07 // RESISTENCIA: WE ARE PRESSED BUT NOT CRUSHED
              </span>
            </div>

            <div className="space-y-0 -space-y-2 sm:-space-y-3">
              <div className="overflow-hidden">
                <motion.h2
                  animate={{ y: ['100%', '0%'] }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="font-display font-black text-4xl sm:text-6xl xl:text-7xl text-white uppercase leading-[0.85]"
                >
                  WE ARE PRESSED.
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  animate={{ y: ['100%', '0%'] }}
                  transition={{
                    duration: 0.8,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1],
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="font-display font-black text-4xl sm:text-6xl xl:text-7xl text-white uppercase text-transparent [-webkit-text-stroke:1px_#ffffff] leading-[0.85]"
                >
                  NOT CRUSHED.
                </motion.h2>
              </div>
            </div>

            <p className="font-mono italic text-sm sm:text-base text-zinc-300 leading-relaxed border-l-2 border-white/50 pl-4 bg-black/50 backdrop-blur-sm py-2">
              El ácido láctico arde en los cuádriceps en la última repetición. La respiración se quiebra en la garganta. Hay una belleza salvaje en llevar el cuerpo al límite exacto antes del colapso, donde la mente deja de razonar y solo queda el instinto del levantador. La tela ondea con mayor frecuencia, reflejando el pulso cardíaco acelerado.
            </p>
          </div>
        </section>

        {/* ========================================================
            SECCIÓN 08: BLOQUE INFERIOR // MÁS TEXTOS & MANIFIESTO
           ======================================================== */}
        <section id="manifesto" className="space-y-12 pb-16 scroll-mt-24">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
              SECCIÓN 08 // ANÁLISIS EDITORIAL Y TEXTIL
            </span>
            <div className="overflow-hidden mt-1">
              <motion.h2
                animate={{ y: ['100%', '0%'] }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight"
              >
                MANIFIESTO DEL HIERRO
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono">
            {/* Manifiesto 01 */}
            <div className="space-y-3 p-5 bg-white/[0.02] border border-white/10 rounded">
              <div className="flex items-center justify-between text-zinc-500">
                <span>[ PUNTO 01 ]</span>
                <span className="text-white font-bold">INMUTABILIDAD</span>
              </div>
              <h3 className="font-display font-black text-lg text-white uppercase">
                EL DOGMA DEL HIERRO
              </h3>
              <p className="font-mono italic text-zinc-400 leading-relaxed">
                Los discos de fundición pesan exactamente lo mismo hoy que hace cien años. No conocen algoritmos, tendencias de TikTok ni atajos. Cien kilos son cien kilos en cualquier época del mundo.
              </p>
            </div>

            {/* Manifiesto 02 */}
            <div className="space-y-3 p-5 bg-white/[0.02] border border-white/10 rounded">
              <div className="flex items-center justify-between text-zinc-500">
                <span>[ PUNTO 02 ]</span>
                <span className="text-white font-bold">FISIOLOGÍA</span>
              </div>
              <h3 className="font-display font-black text-lg text-white uppercase">
                LA FÍSICA DEL SUDOR
              </h3>
              <p className="font-mono italic text-zinc-400 leading-relaxed">
                El sudor no es un desecho biológico; es el recibo firmado de una deuda que elegiste contraer voluntariamente contra la comodidad. Cada gota en el suelo es un centímetro ganado al cansancio.
              </p>
            </div>

            {/* Manifiesto 03 */}
            <div className="space-y-3 p-5 bg-white/[0.02] border border-white/10 rounded">
              <div className="flex items-center justify-between text-zinc-500">
                <span>[ PUNTO 03 ]</span>
                <span className="text-white font-bold">TEXTIL 280G</span>
              </div>
              <h3 className="font-display font-black text-lg text-white uppercase">
                MOLDERÍA DE COMBATE
              </h3>
              <p className="font-mono italic text-zinc-400 leading-relaxed">
                El corte drop-shoulder en algodón peinado de 280 gramos no se pega al cuerpo. Cae con aplomo arquitectónico, resiste el tirón del press de banca y mantiene su estructura lavado tras lavado.
              </p>
            </div>
          </div>

          {/* Tabla comparativa de parámetros para decidir qué aplicar */}
          <div className="p-6 bg-black/80 border border-white/15 rounded space-y-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-white" />
              <h4 className="font-display font-black text-sm text-white uppercase tracking-wider">
                TABLA COMPARATIVA DE EFECTOS // PARA DECIDIR QUÉ LLEVAR A LA WEB OFICIAL
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-zinc-400 text-[10px] uppercase">
                    <th className="py-2 pr-4">Efecto / Preset</th>
                    <th className="py-2 pr-4">Sensación Visual</th>
                    <th className="py-2 pr-4">Consumo GPU</th>
                    <th className="py-2">Recomendación de Aplicación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-zinc-300 text-[11px]">
                  <tr>
                    <td className="py-2.5 font-bold text-white">01. SUDOR &amp; TENSIÓN (3D)</td>
                    <td className="py-2.5 italic">Micro-ondas vivas, caída tensa y sombreado profundo</td>
                    <td className="py-2.5 text-emerald-400">Muy bajo (&lt; 2.5%)</td>
                    <td className="py-2.5">Fondo y atmósfera principal activa</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">02. SEGUNDO CANVAS 3D (SLIDER)</td>
                    <td className="py-2.5 italic">Ripples al pasar el cursor + slide de fotos</td>
                    <td className="py-2.5 text-emerald-400">~16.4 MB VRAM (Totalmente viable)</td>
                    <td className="py-2.5">Excelente para tarjeta de producto destacada</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">03. LINTERNA / REVEAL TIPOGRÁFICO</td>
                    <td className="py-2.5 italic">Efecto linterna radial al pasar el cursor</td>
                    <td className="py-2.5 text-emerald-400">Cero GPU (CSS Mask)</td>
                    <td className="py-2.5">Títulos de colecciones y drops especiales</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">04. IMÁN CINÉTICO TIPOGRÁFICO</td>
                    <td className="py-2.5 italic">El texto sigue al cursor con rebote elástico</td>
                    <td className="py-2.5 text-emerald-400">60 FPS (Framer Motion Spring)</td>
                    <td className="py-2.5">Botones de compra / Call-to-actions principales</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">05. INVERSIÓN DM MONO GIGANTE</td>
                    <td className="py-2.5 italic">DM Mono -0.1em gigante + Clash Display micro</td>
                    <td className="py-2.5 text-emerald-400">0% GPU (Puro CSS)</td>
                    <td className="py-2.5">Look técnico / Brutalismo industrial de gimnasio</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">06. STRIP ACCORDION GALLERY</td>
                    <td className="py-2.5 italic">Expansión suave al pasar el cursor</td>
                    <td className="py-2.5 text-emerald-400">Ultraligero</td>
                    <td className="py-2.5">Lookbook de campaña o galería de fotos</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">07. MICRO-TILT TARJETAS</td>
                    <td className="py-2.5 italic">Inclinación 3D + brillo al pasar el mouse</td>
                    <td className="py-2.5 text-emerald-400">Cero WebGL (CSS Puro)</td>
                    <td className="py-2.5">Todas las tarjetas de productos de la tienda</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer del Lab */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto font-mono text-[11px] text-zinc-500">
        <div className="flex items-center gap-4">
          <img
            src="/M.svg"
            alt="Logo M Archive"
            className="w-10 h-10 object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
          />
          <span>M ARCHIVE // LAB DE EXPERIMENTACIÓN GYM // BUENOS AIRES 2026</span>
        </div>
        <a
          href="/"
          className="text-zinc-400 hover:text-white transition-colors uppercase tracking-wider"
        >
          [ ← VOLVER A INDEX.HTML ]
        </a>
      </footer>
    </div>
  )
}
