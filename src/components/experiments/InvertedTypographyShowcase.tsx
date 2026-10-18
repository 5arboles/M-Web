import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeftRight, Check } from 'lucide-react'

export const InvertedTypographyShowcase: React.FC = () => {
  const [isInverted, setIsInverted] = useState(true)

  return (
    <div className="space-y-8 p-6 sm:p-10 bg-[#08080b]/90 border border-white/20 rounded relative overflow-hidden">
      {/* Header del comparador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
            EXPERIMENTO 02 // JERARQUÍA TIPOGRÁFICA INVERTIDA
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
              className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight"
            >
              {isInverted
                ? 'DM MONO GIGANTE + CLASH DISPLAY COMPACTA'
                : 'CLASH DISPLAY GIGANTE + DM MONO COMPACTA'}
            </motion.h2>
          </div>
        </div>

        {/* Botón de alternancia instantánea */}
        <button
          onClick={() => setIsInverted(!isInverted)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-black font-display font-black text-xs uppercase tracking-wider rounded shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-zinc-200 transition-all shrink-0"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>INVERTIR JERARQUÍA AHORA</span>
        </button>
      </div>

      {/* Contenedor del showcase */}
      <motion.div
        key={isInverted ? 'inverted' : 'standard'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 py-6"
      >
        {isInverted ? (
          /* =========================================================
             MODO INVERTIDO: DM MONO GIGANTE + CLASH PEQUEÑA
             ========================================================= */
          <div className="space-y-6">
            {/* Tag pequeño en Clash Display */}
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xs sm:text-sm tracking-widest text-white uppercase px-2.5 py-1 bg-white/10 border border-white/20 rounded">
                [ ATELIER BUENOS AIRES // CLASH DISPLAY LABEL 12PX ]
              </span>
              <span className="font-display font-black text-xs tracking-wider text-zinc-400 uppercase">
                DROP TEXTIL 280 GSM
              </span>
            </div>

            {/* TITULAR GIGANTE EN DM MONO ITALIC (-0.1em) */}
            <div className="space-y-0 -space-y-2 sm:-space-y-4">
              <h1 className="font-mono italic font-bold text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.88] text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                DISCIPLINA
              </h1>
              <h1 className="font-mono italic font-bold text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.88] text-white uppercase text-transparent [-webkit-text-stroke:1px_#ffffff] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                INQUEBRANTABLE.
              </h1>
              <h1 className="font-mono italic font-bold text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.88] text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                EL CUERPO OBEDECE.
              </h1>
            </div>

            {/* Bajada y ficha técnica en Clash Display compacta */}
            <div className="max-w-xl space-y-3 pt-2">
              <p className="font-display font-bold text-sm sm:text-base text-zinc-200 leading-snug uppercase tracking-wide border-l-2 border-white pl-4">
                CONDITIONS CHANGE. PRESSURE SHIFTS. YOU REMAIN STEADY. 280 GRAMOS DE ALGODÓN PEINADO PESADO PARA LA RUTINA MÁS DURA.
              </p>
              <div className="flex items-center gap-3 text-xs font-display font-black text-zinc-400 uppercase">
                <span className="text-white">SERIES: 10X10</span>
                <span>//</span>
                <span className="text-white">VOLUMEN MÁXIMO</span>
                <span>//</span>
                <span className="text-white">TINTAS DE ALTA DENSIDAD</span>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================
             MODO ESTÁNDAR: CLASH DISPLAY GIGANTE + DM MONO PEQUEÑA
             ========================================================= */
          <div className="space-y-6">
            {/* Tag pequeño en DM Mono */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase px-2.5 py-1 bg-white/10 border border-white/20 rounded">
                [ ATELIER BUENOS AIRES // DM MONO LABEL 11PX ]
              </span>
              <span className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
                DROP TEXTIL 280 GSM
              </span>
            </div>

            {/* TITULAR GIGANTE EN CLASH DISPLAY */}
            <div className="space-y-0 -space-y-2 sm:-space-y-4">
              <h1 className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.84] text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                DISCIPLINA
              </h1>
              <h1 className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.84] text-white uppercase text-transparent [-webkit-text-stroke:1px_#ffffff] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                INQUEBRANTABLE.
              </h1>
              <h1 className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.84] text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                EL CUERPO OBEDECE.
              </h1>
            </div>

            {/* Bajada en DM Mono Italic */}
            <div className="max-w-xl space-y-3 pt-2">
              <p className="font-mono italic text-sm sm:text-base text-zinc-300 leading-relaxed border-l-2 border-white pl-4">
                Conditions change. Pressure shifts. You remain steady. 280 gramos de algodón peinado pesado para la rutina más dura.
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                <span className="text-white font-bold">Series: 10x10</span>
                <span>//</span>
                <span className="text-white font-bold">Volumen Máximo</span>
                <span>//</span>
                <span className="text-white font-bold">Tintas de Alta Densidad</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Nota técnica de diseño */}
      <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-zinc-400 gap-2">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <Check className="w-3.5 h-3.5 text-white" />
          <span>DM Mono gigante da un aire más brutalista, técnico y de terminal de carga.</span>
        </span>
        <span className="text-zinc-500 italic">Hacé clic en el botón arriba para comparar ambas opciones.</span>
      </div>
    </div>
  )
}
