import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Sparkles, Eye, Columns, Grid } from 'lucide-react'

interface AccordionItem {
  id: string
  number: string
  title: string
  subtitle: string
  image: string
  badge: string
  tagline: string
  poem: string
  specs: {
    lens: string
    reps: string
    intensity: string
  }
}

const ACCORDION_DATA: AccordionItem[] = [
  {
    id: 'lunes-01',
    number: '01',
    title: 'LUNES // NO ONE CARES',
    subtitle: 'WORK HARDER IN SILENCE',
    image: '/images/gym-lunes.jpg',
    badge: 'DAY ONE / DISCIPLINE',
    tagline: 'BARBELL FLOOR VIEW // 280 GSM',
    poem: 'El piso de goma fría no pregunta por tus excusas. La semana arranca en el suelo cargando el primer disco de hierro.',
    specs: {
      lens: '35MM RAW',
      reps: '5x5 HEAVY',
      intensity: 'RPE 9.5',
    },
  },
  {
    id: 'gym-02',
    number: '02',
    title: 'CORE & SUFFERING',
    subtitle: 'INDUSTRIAL SHADOWS',
    image: '/images/gym1.jpg',
    badge: 'POST-SET FATIGUE',
    tagline: 'ATLETA INDUSTRIAL // CARGA MENTAL',
    poem: 'La oscuridad del gimnasio vacío después de la última serie. Respiración agitada, ácido láctico y la calma absoluta de quien lo dio todo.',
    specs: {
      lens: '50MM T1.5',
      reps: 'HASTA EL FALLO',
      intensity: 'RPE 10',
    },
  },
  {
    id: 'gym-03',
    number: '03',
    title: 'KNURLED STEEL & CHALK',
    subtitle: 'MOLETEADO DE ACERO',
    image: '/images/gym2.jpg',
    badge: 'CALLO & MAGNESIO',
    tagline: 'MANOS EN TIZADA // GRIP FORZADO',
    poem: 'El polvo blanco del magnesio en el aire. La piel que se agarra al acero sin guantes ni protecciones. La pureza del agarre.',
    specs: {
      lens: '85MM MACRO',
      reps: 'PESO MUERTO',
      intensity: 'MÁXIMA ADHESIÓN',
    },
  },
  {
    id: 'gym-04',
    number: '04',
    title: 'BY ANY MEANS // IRONWILLED',
    subtitle: '5-PANEL CONTACT SHEET',
    image: '/images/gym3.jpg',
    badge: 'BRUTALIST ARCHIVE',
    tagline: 'HOJA DE CONTACTO FOTOGRÁFICA',
    poem: 'Cinco fotogramas continuos de una misma batalla. No hay edición, no hay poses falsas. La fatiga real documentada en plata sobre gelatina.',
    specs: {
      lens: 'CONTACT STRIP',
      reps: 'CIRCUITO COMPLETO',
      intensity: 'NON-STOP',
    },
  },
  {
    id: 'gym-05',
    number: '05',
    title: 'ROPES, BIKE & SLAM',
    subtitle: 'TRÍPTICO DE COMBATE',
    image: '/images/gym4.jpg',
    badge: 'AERÓBICO PESADO',
    tagline: 'SUDOR, VELOCIDAD Y CHOQUE',
    poem: 'Cuerdas de batalla que azotan el piso. El ventilador ensordecedor de la assault bike. El estruendo seco de la bola de 30 kilos contra el suelo.',
    specs: {
      lens: 'ACTION 24MM',
      reps: 'INTERVALOS TABATA',
      intensity: 'ZONA 5',
    },
  },
  {
    id: 'gym-06',
    number: '06',
    title: 'STEADY UNDER PRESSURE',
    subtitle: 'CONDITIONS CHANGE // YOU REMAIN',
    image: '/images/gym5.jpg',
    badge: 'PUMP COVER CAP',
    tagline: 'MIRADA FIJA // GORRA & HOODIE',
    poem: 'El exterior es caótico e inestable. Las condiciones mutan. La presión aumenta. Vos te mantenés frío, constante e indestructible.',
    specs: {
      lens: 'PORTRAIT 50MM',
      reps: 'SERIE FINAL',
      intensity: 'ENFOQUE TOTAL',
    },
  },
]

export const EditorialAccordionGallery: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('lunes-01')
  const [viewMode, setViewMode] = useState<'accordion' | 'grid'>('accordion')
  const [lightboxImage, setLightboxImage] = useState<AccordionItem | null>(null)

  return (
    <section className="space-y-8">
      {/* Encabezado de la galería */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>GALERÍA DE IMÁGENES ALTERNATIVA // FORMATO 02</span>
          </div>
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
              EDITORIAL ACCORDION &amp; CONTACT SHEET
            </motion.h2>
          </div>
          <p className="text-zinc-400 font-mono text-xs max-w-xl mt-2 italic">
            Inspeccioná las 6 imágenes recién subidas: paneo horizontal interactivo con expansión suave en hover/clic,
            metadatos fotográficos, notas poéticas y modo hoja de contacto.
          </p>
        </div>

        {/* Toggle de modo visual: Acordeón vs Grilla */}
        <div className="flex items-center gap-2 font-mono text-xs self-start md:self-auto">
          <button
            onClick={() => setViewMode('accordion')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded uppercase transition-colors ${
              viewMode === 'accordion'
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>STRIP ACCORDION</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded uppercase transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>CONTACT GRID</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          MODO 1: ACCORDION STRIP EXPANSIVO
         ======================================================== */}
      {viewMode === 'accordion' && (
        <div className="relative w-full h-[580px] sm:h-[620px] flex flex-col md:flex-row gap-2 overflow-hidden rounded-lg bg-black/40 border border-white/10 p-2">
          {ACCORDION_DATA.map((item) => {
            const isActive = activeId === item.id

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                className={`relative cursor-pointer overflow-hidden rounded transition-all duration-500 ease-out flex-shrink-0 ${
                  isActive
                    ? 'md:flex-[4] flex-[3] ring-1 ring-white/30'
                    : 'md:flex-[1] flex-[1] opacity-60 hover:opacity-100'
                }`}
              >
                {/* Imagen de fondo */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                    isActive ? 'scale-105 filter-none' : 'scale-100 grayscale brightness-75'
                  }`}
                />

                {/* Overlays de gradiente para legibilidad */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-black via-black/30 to-black/20'
                      : 'bg-black/50 hover:bg-black/30'
                  }`}
                />

                {/* CONTENIDO CUANDO ESTÁ COLAPSADO (TIRA VERTICAL) */}
                {!isActive && (
                  <div className="hidden md:flex absolute inset-0 p-4 flex-col justify-between items-center text-center">
                    <span className="font-mono text-xs font-bold text-white bg-black/60 px-2 py-1 rounded border border-white/10">
                      {item.number}
                    </span>
                    <span
                      className="font-display font-black text-xs uppercase tracking-widest text-zinc-300 transform -rotate-90 whitespace-nowrap"
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      {item.title}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                      {item.specs.reps}
                    </span>
                  </div>
                )}

                {/* CONTENIDO CUANDO ESTÁ EXPANDIDO */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10"
                    >
                      {/* Top Bar del panel */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-white text-black font-mono font-black text-xs rounded">
                            {item.number}
                          </span>
                          <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md border border-white/20 font-mono text-[10px] text-zinc-300 uppercase tracking-wider rounded">
                            {item.badge}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setLightboxImage(item)
                          }}
                          className="p-2 bg-black/60 hover:bg-white text-white hover:text-black rounded-full border border-white/20 transition-colors"
                          title="Ver en pantalla completa"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Bottom Info del panel */}
                      <div className="space-y-4 max-w-xl">
                        <div>
                          <span className="font-mono text-[11px] text-zinc-400 tracking-wider block">
                            {item.tagline}
                          </span>
                          <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-0.5 leading-none">
                            {item.title}
                          </h3>
                        </div>

                        {/* Párrafo poético */}
                        <p className="font-mono italic text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/60 backdrop-blur-md p-3.5 rounded border-l-2 border-white">
                          "{item.poem}"
                        </p>

                        {/* Ficha técnica del disparo */}
                        <div className="grid grid-cols-3 gap-2 font-mono text-[10px] pt-1">
                          <div className="p-2 bg-black/50 border border-white/10 rounded">
                            <span className="text-zinc-500 block">LENTE</span>
                            <span className="text-white font-bold">{item.specs.lens}</span>
                          </div>
                          <div className="p-2 bg-black/50 border border-white/10 rounded">
                            <span className="text-zinc-500 block">RITUAL</span>
                            <span className="text-white font-bold">{item.specs.reps}</span>
                          </div>
                          <div className="p-2 bg-black/50 border border-white/10 rounded">
                            <span className="text-zinc-500 block">INTENSIDAD</span>
                            <span className="text-white font-bold">{item.specs.intensity}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* ========================================================
          MODO 2: GRILLA CONTACT SHEET (6 PANELES)
         ======================================================== */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACCORDION_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative bg-black/40 border border-white/10 hover:border-white/40 rounded overflow-hidden transition-all duration-300"
            >
              {/* Contenedor imagen */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-70" />

                <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 font-mono text-[10px] text-zinc-300 uppercase tracking-widest border border-white/20 rounded">
                  {item.number} // {item.badge}
                </span>

                <button
                  onClick={() => setLightboxImage(item)}
                  className="absolute top-3 right-3 p-1.5 bg-black/70 hover:bg-white text-white hover:text-black rounded border border-white/20 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Contenido editorial */}
              <div className="p-5 space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-zinc-400 italic text-[11px] leading-relaxed line-clamp-3">
                  "{item.poem}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-zinc-500">
                  <span>{item.specs.reps}</span>
                  <span className="text-white font-bold">{item.specs.intensity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal para ampliar imagen */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/20 rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="p-6 bg-black border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 uppercase text-[10px] tracking-wider block">
                    {lightboxImage.number} // {lightboxImage.badge}
                  </span>
                  <h4 className="font-display font-black text-lg text-white uppercase">
                    {lightboxImage.title}
                  </h4>
                  <p className="italic text-zinc-400 mt-1 max-w-xl">"{lightboxImage.poem}"</p>
                </div>

                <button
                  onClick={() => setLightboxImage(null)}
                  className="px-4 py-2 bg-white text-black font-bold uppercase rounded hover:bg-zinc-200 transition-colors self-start sm:self-auto text-xs"
                >
                  CERRAR [ESC]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
