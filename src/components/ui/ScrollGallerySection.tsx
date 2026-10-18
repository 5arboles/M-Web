import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PRINTS_DATA, PrintItem, createWhatsAppUrl } from '@/data/catalog'

// Tarjeta individual de la galería:
// - La imagen de la camiseta ocupa todo el espacio
// - Se eliminó todo el texto inferior estático
// - El tooltip tiene fondo negro con opacidad 0.1 casi transparente y tipografía blanca
// - El título está dentro del tooltip
// - El botón ocupa el 70% del ancho fijo y se anima suavemente de abajo hacia arriba en rollover
const GalleryCard: React.FC<{ item: PrintItem }> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative w-[320px] sm:w-[380px] h-[500px] bg-[#08080a]/90 backdrop-blur-lg border border-white/15 hover:border-white transition-all duration-300 flex flex-col justify-between p-5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] group select-none overflow-hidden"
    >
      {/* Tooltip flotante con tipografía blanca y fondo negro opacidad 0.1 casi transparente */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.15 }}
            style={{
              left: mousePos.x,
              top: mousePos.y - 12,
            }}
            className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-full w-64 bg-black/10 backdrop-blur-md text-white p-3.5 rounded border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.9)] space-y-1.5"
          >
            <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-zinc-300 border-b border-white/15 pb-1">
              <span>{item.category}</span>
              <span>{item.code}</span>
            </div>
            {/* Título integrado dentro del tooltip */}
            <h4 className="font-display font-black text-sm text-white uppercase tracking-tight">
              {item.title}
            </h4>
            {/* Descripción en DM Mono Italic */}
            <p className="font-mono italic text-[11px] text-zinc-200 leading-snug">
              {item.desc}
            </p>
            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1 border-t border-white/15">
              <span>{item.aspect}</span>
              <span className="text-white font-bold">{item.weight}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header superior de la tarjeta */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs font-mono z-10">
        <span className="font-display font-black text-xl text-white">
          #{item.number}
        </span>
        <span className="px-2 py-0.5 bg-white/10 text-white font-bold tracking-wider rounded text-[10px]">
          {item.category}
        </span>
        <span className="text-zinc-500 text-[10px]">{item.code}</span>
      </div>

      {/* Imagen ampliada que ocupa todo el cuerpo de la tarjeta */}
      <div className="relative flex-1 w-full my-2 bg-black border border-white/10 flex items-center justify-center p-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/20 font-mono text-[9px] text-zinc-300">
          {item.weight}
        </div>
      </div>

      {/* Botón blanco fijo al 70% del ancho: aparece de abajo hacia arriba en rollover y luego desaparece */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[70%] max-w-[70%] z-30"
          >
            <a
              href={createWhatsAppUrl(
                `Hola! Quiero pedir la remera con el diseño #${item.number} ${item.title} (${item.code}) en 280 GSM.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-white text-black font-display font-bold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(255,255,255,0.25)] whitespace-nowrap"
            >
              <span>PEDIR ESTE DISEÑO</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const ScrollGallerySection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null)

  // Track scroll progress inside this 380vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // Horizontal translation: moves to the left as vertical scroll goes down
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['10%', '100%'])

  return (
    <section ref={targetRef} className="relative h-[380vh] bg-transparent">
      {/* Contenedor sticky que se queda fijo en pantalla durante el recorrido horizontal */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-10 px-6 sm:px-10 lg:px-12 overflow-hidden z-20">
        {/* Cabecera superior con la misma animación de reveal cinético del Hero */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 bg-black/60 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                THE ARCHIVE GALLERY // 10 EDICIONES
              </span>
            </div>

            {/* Reveal cinético en loop cada 3 segundos */}
            <div className="overflow-hidden">
              <motion.h2
                animate={{ y: ['100%', '0%'] }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase"
              >
                DISEÑOS
              </motion.h2>
            </div>

            <p className="font-mono italic text-xs sm:text-sm text-zinc-400">
              Deslizá hacia abajo para ver todos.
            </p>
          </div>

          {/* Barra de progreso de scroll horizontal */}
          <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-64 font-mono text-xs text-zinc-400">
            <div className="flex justify-between w-full text-[11px]">
              <span>[ 01 / 10 ]</span>
              <span className="text-white uppercase">SCROLL DRIVEN</span>
            </div>
            <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-white"
              />
            </div>
          </div>
        </div>

        {/* Track horizontal continuo con las 10 tarjetas (se mueve a la izquierda) */}
        <div className="my-auto py-6 overflow-visible">
          <motion.div
            style={{ x }}
            className="flex gap-8 w-max pl-4 pr-16"
          >
            {PRINTS_DATA.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Footer indicador inferior */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/10 bg-black/60 backdrop-blur-md">
          <span>AL FINALIZAR EL RECORRIDO ACCEDÉS A LA INFORMACIÓN MAYORISTA ↓</span>
          <span className="italic text-zinc-400">100% COMBED COTTON // B&amp;W STREETWEAR</span>
        </div>
      </div>
    </section>
  )
}
