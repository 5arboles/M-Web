import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

interface HeroSectionProps {
  activeFondoTitle?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ activeFondoTitle }) => {
  const { scrollY } = useScroll()

  // Los textos del Hero se van suavemente a medida que el usuario hace scroll hacia abajo
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0])
  const textY = useTransform(scrollY, [0, 450], [0, -60])
  const textScale = useTransform(scrollY, [0, 450], [1, 0.96])

  // Título corto y conciso para la ficha del diseño del fondo
  const shortFondoTitle =
    activeFondoTitle?.split('//')[0]?.trim() || 'JUST TRYING MY LUCK'

  return (
    <section className="relative w-full h-screen min-h-screen flex items-center overflow-hidden select-none z-10">
      {/* Sutil viñeta degradada lateral a la izquierda para garantizar legibilidad perfecta del texto */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[48%] bg-gradient-to-r from-black/90 via-black/55 to-transparent pointer-events-none z-10" />

      {/* Contenedor de tipografía con animación de salida por scroll */}
      <motion.div
        style={{ opacity: textOpacity, y: textY, scale: textScale }}
        className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-between py-10 sm:py-12 pointer-events-none"
      >
        {/* Cabecera superior: Logo M.svg + Botones URBAN y GYM */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 pointer-events-auto">
            <a href="/" className="shrink-0">
              <img
                src="/M.svg"
                alt="Logo M"
                className="w-[72px] sm:w-[88px] h-auto object-contain filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
              />
            </a>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="px-3.5 py-1.5 font-display font-black text-xs tracking-wider uppercase rounded bg-white text-black border border-white shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all"
              >
                URBAN
              </a>
              <a
                href="/gym.html"
                className="px-3.5 py-1.5 font-display font-black text-xs tracking-wider uppercase rounded bg-black/60 text-zinc-300 hover:bg-white hover:text-black border border-white/25 hover:border-white transition-all"
              >
                GYM
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="font-mono text-[11px] tracking-widest text-zinc-400 uppercase">
              [ BS AS, ARG ]
            </span>
          </div>
        </div>

        {/* Bloque central de contenido editorial */}
        <div className="max-w-xl my-auto py-4 space-y-4">
          {/* Tag de edición */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-widest text-zinc-400 uppercase">
              [ FLAGSHIP DROP // 2026 ]
            </span>
          </div>

          {/* Titular gigante en Clash Display con animación de entrada en loop cada 3 segundos */}
          <div className="space-y-0 -space-y-1.5 sm:-space-y-3">
            <div className="overflow-hidden">
              <motion.h1
                animate={{ y: ['100%', '0%'] }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.82] sm:leading-[0.84] text-white uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
              >
                WEAR THE
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
                className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.82] sm:leading-[0.84] text-white uppercase text-transparent [-webkit-text-stroke:1px_#ffffff] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
              >
                ATTITUDE.
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
                className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.82] sm:leading-[0.84] text-white uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
              >
                NOT JUST FABRIC.
              </motion.h1>
            </div>
          </div>

          {/* Acción de navegación scroll */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="pt-4 pointer-events-auto flex items-center gap-3 font-mono text-xs text-zinc-400"
          >
            <ArrowDown className="w-4 h-4 animate-bounce text-white" />
            <span className="tracking-wider text-zinc-300 uppercase">SCROLL PARA EXPLORAR</span>
          </motion.div>
        </div>

        {/* Barra inferior: datos técnicos a la izquierda y ficha del diseño a la DERECHA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 pt-4 text-[11px] font-mono text-zinc-500">
          <span>[ ATELIER BUENOS AIRES // 100% COMBED COTTON ]</span>

          {/* Texto del diseño activo en el fondo: ubicado a la derecha, más chico y conciso */}
          <motion.div
            key={shortFondoTitle}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1 border border-white/15 rounded text-[10px]"
          >
            <span className="text-zinc-500 uppercase text-[9px]">DISEÑO:</span>
            <strong className="text-white font-display text-xs tracking-wider uppercase">
              {shortFondoTitle}
            </strong>
            <span className="text-zinc-400">// 280 GSM</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
