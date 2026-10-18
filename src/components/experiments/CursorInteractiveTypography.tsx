import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointer, Eye, Zap, Type } from 'lucide-react'
import { WordRevealTitle, RollingText } from '@/components/ui/AnimatedText'

export const CursorInteractiveTypography: React.FC = () => {
  // Estado para el spotlight flashlight
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50, active: false })

  // Estado para el texto magnético
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 })

  // Estado para la palabra en glitch/hover
  const [hoveredGlitch, setHoveredGlitch] = useState(false)

  // Estado para alternar animación de entrada/salida
  const [textToggle, setTextToggle] = useState(0)

  const textVariations = [
    {
      line1: 'LA VOLUNTAD ES UN MÚSCULO.',
      line2: 'EL SUDOR NO NEGOCIA.',
      sub: 'Animación Tipo A // Blur In & Contracción de Tracking',
    },
    {
      line1: 'FRACTURA HOY. ARQUITECTURA MAÑANA.',
      line2: 'DISCIPLINA DE SILICIO Y ACERO.',
      sub: 'Animación Tipo B // Reveal Cinético por Líneas',
    },
    {
      line1: 'NO HAY ESTÉTICA SIN DOLOR REPETIDO.',
      line2: 'EL ALGODÓN 280G COMO ARMADURA.',
      sub: 'Animación Tipo C // Expansión Monolítica',
    },
  ]

  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlightRef.current) return
    const rect = spotlightRef.current.getBoundingClientRect()
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    })
  }

  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setMagneticOffset({ x: x * 0.25, y: y * 0.25 })
  }

  return (
    <div className="space-y-16">
      {/* Header del módulo */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest">
          <Type className="w-3.5 h-3.5 text-white" />
          <span>EXPERIMENTO 01 // FÍSICA & EFECTOS EN TIPOGRAFÍA</span>
        </div>
        <div className="mt-1">
          <WordRevealTitle
            as="h2"
            text="LABORATORIO DE TEXTOS &amp; CURSOR"
            className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight"
          />
        </div>
        <p className="font-mono italic text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl">
          Probando diferentes respuestas cinéticas al cursor, transiciones de entrada/salida y modos de interacción directa sobre las palabras.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* =========================================================
            EFECTO 01: SPOTLIGHT / LINTERNA REVELADORA
           ========================================================= */}
        <div className="p-6 sm:p-8 bg-black/80 border border-white/15 rounded relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-4 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Eye className="w-3.5 h-3.5" />
              <span>01. SPOTLIGHT REVEAL // LINTERNA</span>
            </span>
          </div>

          <div
            ref={spotlightRef}
            onMouseMove={handleSpotlightMove}
            onMouseLeave={() => setSpotlightPos((p) => ({ ...p, active: false }))}
            className="relative py-12 select-none cursor-crosshair overflow-hidden"
          >
            {/* Capa de fondo: texto en contorno hueco */}
            <h3 className="font-display font-black text-4xl sm:text-6xl text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] uppercase leading-none tracking-tight">
              EL CUERPO SE RINDE.
              <br />
              EL HIERRO ESPERA.
            </h3>

            {/* Capa superior revelada solo bajo el foco del cursor */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                opacity: spotlightPos.active ? 1 : 0,
                WebkitMaskImage: `radial-gradient(circle 140px at ${spotlightPos.x}px ${spotlightPos.y}px, black 30%, transparent 80%)`,
                maskImage: `radial-gradient(circle 140px at ${spotlightPos.x}px ${spotlightPos.y}px, black 30%, transparent 80%)`,
              }}
            >
              <h3 className="font-display font-black text-4xl sm:text-6xl text-white uppercase leading-none tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]">
                EL CUERPO SE RINDE.
                <br />
                EL HIERRO ESPERA.
              </h3>
            </div>
          </div>

          <p className="font-mono italic text-[11px] text-zinc-500 border-t border-white/10 pt-3">
            El cursor actúa como un reflector táctico: revela la masa sólida blanca sobre el esqueleto de contorno.
          </p>
        </div>

        {/* =========================================================
            EFECTO 02: TEXTO MAGNÉTICO CON DESPLAZAMIENTO 3D
           ========================================================= */}
        <div className="p-6 sm:p-8 bg-black/80 border border-white/15 rounded flex flex-col justify-between group">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-4 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <MousePointer className="w-3.5 h-3.5" />
              <span>02. MAGNÉTICO CINÉTICO // RESORTE</span>
            </span>
            <span className="text-[10px] text-zinc-500 uppercase">[ ARRASTRÁ EL MOUSE ]</span>
          </div>

          <div
            onMouseMove={handleMagneticMove}
            onMouseLeave={() => setMagneticOffset({ x: 0, y: 0 })}
            className="py-12 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              animate={{ x: magneticOffset.x, y: magneticOffset.y }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="text-center space-y-1"
            >
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase block">
                [ 280 GSM HEAVY PUMP ]
              </span>
              <h3 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter uppercase leading-none">
                REPULSION // PULL
              </h3>
              <p className="font-mono italic text-xs text-zinc-400">
                La tipografía sigue el cursor con inercia elástica de tejido.
              </p>
            </motion.div>
          </div>

          <p className="font-mono italic text-[11px] text-zinc-500 border-t border-white/10 pt-3">
            Efecto magnético suave para botones clave o frases de impacto editorial.
          </p>
        </div>

        {/* =========================================================
            EFECTO 03: GLITCH CROMÁTICO & DISTORSIÓN TÁCTICA
           ========================================================= */}
        <div className="p-6 sm:p-8 bg-black/80 border border-white/15 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-4 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>03. DISTORSIÓN &amp; ABERRACIÓN CROMÁTICA</span>
            </span>
            <span className="text-[10px] text-zinc-500 uppercase">[ ROLLOVER SOBRE EL TEXTO ]</span>
          </div>

          <div
            onMouseEnter={() => setHoveredGlitch(true)}
            onMouseLeave={() => setHoveredGlitch(false)}
            className="py-12 relative cursor-pointer select-none"
          >
            <div className="relative">
              {/* Texto duplicado desfasado en rojo */}
              {hoveredGlitch && (
                <span className="absolute inset-0 font-display font-black text-4xl sm:text-6xl text-red-600 uppercase tracking-tight -translate-x-1.5 translate-y-0.5 opacity-80 mix-blend-screen pointer-events-none">
                  SUDOR &amp; TINTA
                </span>
              )}
              {/* Texto duplicado desfasado en cyan */}
              {hoveredGlitch && (
                <span className="absolute inset-0 font-display font-black text-4xl sm:text-6xl text-cyan-400 uppercase tracking-tight translate-x-1.5 -translate-y-0.5 opacity-80 mix-blend-screen pointer-events-none">
                  SUDOR &amp; TINTA
                </span>
              )}
              <h3 className="relative font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
                SUDOR &amp; TINTA
              </h3>
            </div>
            <p className="font-mono italic text-xs text-zinc-400 mt-2">
              Desplazamiento RGB que imita la serigrafía con desfasaje de registro manual.
            </p>
          </div>

          <p className="font-mono italic text-[11px] text-zinc-500 border-t border-white/10 pt-3">
            Inspirado en fanzines noventeros y afiches callejeros de recitales underground.
          </p>
        </div>

        {/* =========================================================
            EFECTO 04: ANIMACIÓN DE ENTRADA / SALIDA CONMUTABLE
           ========================================================= */}
        <div className="p-6 sm:p-8 bg-black/80 border border-white/15 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-4 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Type className="w-3.5 h-3.5" />
              <span>04. ENTRADA &amp; SALIDA CINÉTICA</span>
            </span>
            <button
              onClick={() => setTextToggle((prev) => (prev + 1) % textVariations.length)}
              className="group px-2.5 py-1 bg-white text-black font-bold text-[10px] rounded uppercase hover:bg-zinc-200 transition-colors"
            >
              <RollingText text="PROBAR SIGUIENTE ↓" />
            </button>
          </div>

          <div className="py-8 min-h-[160px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={textToggle}
                initial={{ opacity: 0, y: 35, filter: 'blur(8px)', letterSpacing: '0.08em' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '-0.02em' }}
                exit={{ opacity: 0, y: -35, filter: 'blur(8px)', letterSpacing: '-0.06em' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-1"
              >
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase leading-tight">
                  {textVariations[textToggle].line1}
                </h3>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase text-transparent [-webkit-text-stroke:1px_#ffffff] leading-tight">
                  {textVariations[textToggle].line2}
                </h3>
                <span className="font-mono italic text-[11px] text-zinc-500 block pt-1">
                  {textVariations[textToggle].sub}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="font-mono italic text-[11px] text-zinc-500 border-t border-white/10 pt-3">
            Fusión de desenfoque gaussian suave con contracción de espaciado al entrar.
          </p>
        </div>
      </div>
    </div>
  )
}
