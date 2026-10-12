import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye } from 'lucide-react'
import { PRINTS_DATA, createWhatsAppUrl } from '@/data/catalog'

interface DesignsSliderProps {
  currentPrintIndex: number
  onSelectPrint: (index: number) => void
}

export const DesignsSlider: React.FC<DesignsSliderProps> = ({
  currentPrintIndex,
  onSelectPrint,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section id="slider" className="relative py-24 px-6 md:px-10 border-b border-white/10 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                THE ARCHIVE GALLERY
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              TODOS LOS DISEÑOS
            </h2>
            <p className="font-mono italic text-zinc-400 text-sm max-w-lg">
              “Explorá el catálogo de gráficos activos. Hacé click en cualquier diseño para previsualizarlo en vivo sobre la remera 3D.”
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 border border-white/20 hover:border-white hover:bg-white/10 transition-colors text-white"
              aria-label="Anterior diseño"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 border border-white/20 hover:border-white hover:bg-white/10 transition-colors text-white"
              aria-label="Siguiente diseño"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {PRINTS_DATA.map((print, index) => {
            const isActive = currentPrintIndex === index
            return (
              <motion.div
                key={print.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`flex-none w-[300px] sm:w-[360px] snap-start border transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'border-white bg-zinc-950 shadow-[0_0_25px_rgba(255,255,255,0.1)]'
                    : 'border-white/10 bg-[#080808] hover:border-white/40'
                }`}
              >
                {/* Print Preview Card */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/10 pb-3">
                    <span className="font-bold text-white tracking-wider">
                      [{print.category}]
                    </span>
                    <span>{print.code}</span>
                  </div>

                  {/* Graphic Card Visual Container */}
                  <div className="relative h-64 bg-black border border-white/10 flex items-center justify-center p-6 overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
                    <img
                      src={print.svgGraphic}
                      alt={print.title}
                      className="max-h-full max-w-full object-contain filter invert opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    {isActive && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 bg-white text-black font-mono text-[10px] font-bold tracking-wider">
                        EN 3D HERO
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-xl text-white tracking-tight uppercase">
                      {print.title}
                    </h3>
                    <p className="font-mono italic text-xs text-zinc-400 leading-relaxed">
                      {print.desc}
                    </p>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-500">
                    <span>UBICACIÓN: </span>
                    <strong className="text-zinc-300">{print.aspect}</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onSelectPrint(index)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`py-2.5 px-3 text-[11px] font-mono font-bold tracking-wider uppercase border transition-colors flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-black border-white'
                        : 'border-white/20 text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VER EN 3D</span>
                  </button>

                  <a
                    href={createWhatsAppUrl(
                      `Hola! Me interesa pedir una remera con la estampa ${print.title} (${print.code}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 text-[11px] font-mono tracking-wider uppercase border border-white/20 text-zinc-300 hover:text-white hover:border-white transition-colors flex items-center justify-center gap-1"
                  >
                    <span>CONSULTAR</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
