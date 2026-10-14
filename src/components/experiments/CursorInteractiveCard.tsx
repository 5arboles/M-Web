import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, ArrowUpRight } from 'lucide-react'

export interface GymCardItem {
  id: string
  number: string
  title: string
  reps: string
  subtext: string
  poeticNote: string
  image: string
  weightGsm: string
}

interface CursorInteractiveCardProps {
  item: GymCardItem
  index: number
}

export const CursorInteractiveCard: React.FC<CursorInteractiveCardProps> = ({
  item,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [imageTranslateX, setImageTranslateX] = useState(0)
  const [imageTranslateY, setImageTranslateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Coordenadas normalizadas (-1 a 1)
    const normX = (x / rect.width) * 2 - 1
    const normY = (y / rect.height) * 2 - 1

    // Inclinación 3D magnética
    setRotateX(-normY * 12)
    setRotateY(normX * 14)

    // Desplazamiento de profundidad de la imagen interna (efecto parallax inverso)
    setImageTranslateX(normX * 10)
    setImageTranslateY(normY * 10)

    // Brillo dinámico
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setImageTranslateX(0)
    setImageTranslateY(0)
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.95 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="perspective-1000 w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative group bg-[#09090c]/90 border border-white/15 hover:border-white rounded p-5 flex flex-col justify-between h-[520px] select-none overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-colors duration-300"
      >
        {/* Destello de brillo reactivo al cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
          }}
        />

        {/* Header de la tarjeta */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl text-white">
              #{item.number}
            </span>
            <span className="px-2 py-0.5 bg-white/10 text-white text-[10px] uppercase font-bold tracking-wider rounded">
              {item.reps}
            </span>
          </div>
          <span className="text-zinc-500 text-[10px] flex items-center gap-1">
            <Dumbbell className="w-3 h-3 text-white" />
            {item.weightGsm}
          </span>
        </div>

        {/* Imagen con desplazamiento de perspectiva al pasar el cursor */}
        <div className="relative flex-1 w-full my-3 bg-black border border-white/10 overflow-hidden rounded-sm">
          <motion.img
            src={item.image}
            alt={item.title}
            animate={{
              x: imageTranslateX,
              y: imageTranslateY,
              scale: glarePos.opacity > 0 ? 1.08 : 1.02,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
          />

          {/* Badge flotante de carga */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/20 font-mono text-[9px] text-zinc-300">
            {item.subtext}
          </div>
        </div>

        {/* Bloque tipográfico brutalista y poético */}
        <div className="space-y-1.5 z-10 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-base text-white tracking-tight uppercase group-hover:text-zinc-200 transition-colors">
              {item.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </div>

          {/* Texto poético sobre gimnasio, esfuerzo y sudor */}
          <p className="font-mono italic text-[11px] text-zinc-400 leading-snug">
            {item.poeticNote}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
