import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BACKGROUND_ITEMS } from '@/data/catalog'

interface BackgroundSlideshowProps {
  currentIndex: number
  onSelectIndex: (index: number) => void
}

export const BackgroundSlideshow: React.FC<BackgroundSlideshowProps> = ({
  currentIndex,
  onSelectIndex,
}) => {
  const currentItem = BACKGROUND_ITEMS[currentIndex] || BACKGROUND_ITEMS[0]

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden select-none bg-black">
      {/* 1. Fondo JPG en pantalla completa con fundido cruzado suave y cinematográfico (2.8s) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentItem.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.78 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src={currentItem.url}
            alt={currentItem.title}
            className="w-full h-full object-cover object-center md:object-[68%_center] filter contrast-105 brightness-95"
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Capas de atmósfera y profundidad hacia el fondo negro */}
      {/* Viñeta lateral izquierda para lectura limpia de textos */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />
      {/* Viñeta superior e inferior para enmarcar la escena */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/80 pointer-events-none" />

      {/* 3. Selector interactivo superior derecho con monitor de ciclo */}
      <div className="absolute top-5 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1.5 bg-black/80 backdrop-blur-md border border-white/20 rounded shadow-[0_4px_25px_rgba(0,0,0,0.8)] font-mono text-[10px]">
          <div className="flex items-center gap-1.5 px-2 text-zinc-400 border-r border-white/10 hidden sm:flex">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="tracking-widest uppercase">FONDO // 10s:</span>
          </div>

          {BACKGROUND_ITEMS.map((item, idx) => {
            const isActive = idx === currentIndex
            return (
              <button
                key={item.id}
                onClick={() => onSelectIndex(idx)}
                className={`relative px-2.5 py-1 uppercase tracking-wider rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
                title={`${item.title} (${item.subtitle})`}
              >
                <span>{`0${idx + 1}`}</span>
                {isActive && (
                  <span className="hidden md:inline ml-1 text-[9px] font-sans font-black">
                    {idx === 0 ? 'LUCK' : idx === 1 ? 'SKELETON' : 'SLINKY'}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Ficha técnica flotante del fondo activo */}
        <motion.div
          key={currentItem.title}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded border border-white/10 font-mono text-[9px] text-zinc-400"
        >
          <span className="text-white font-bold">{currentItem.title}</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-500">{currentItem.subtitle}</span>
        </motion.div>
      </div>
    </div>
  )
}
