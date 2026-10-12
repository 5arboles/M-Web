import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Dumbbell, Flame, Trophy } from 'lucide-react'
import { PRODUCTS_DATA, ProductItem, createWhatsAppUrl } from '@/data/catalog'

export const CollectionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'GYM' | 'ROCK' | 'BLOKECORE'>('ALL')

  const filteredProducts = activeTab === 'ALL'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.category === activeTab)

  return (
    <section id="lines" className="relative py-24 px-6 md:px-10 border-b border-white/10 z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
              THE 3 DIVISIONS // B&amp;W STREETWEAR
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
            LAS LÍNEAS DE PRODUCTO
          </h2>

          <p className="font-mono italic text-zinc-400 text-sm sm:text-base leading-relaxed">
            “Tres universos conectados por el mismo estándar: 280 GSM de puro algodón peinado, caída pesada y costuras indestructibles.”
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
              activeTab === 'ALL'
                ? 'bg-white text-black font-bold'
                : 'text-zinc-400 hover:text-white border border-transparent hover:border-white/20'
            }`}
          >
            [ TODAS LAS LÍNEAS ]
          </button>
          <button
            onClick={() => setActiveTab('GYM')}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
              activeTab === 'GYM'
                ? 'bg-white text-black font-bold'
                : 'text-zinc-400 hover:text-white border border-transparent hover:border-white/20'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>01. GYM &amp; PUMP COVERS</span>
          </button>
          <button
            onClick={() => setActiveTab('ROCK')}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
              activeTab === 'ROCK'
                ? 'bg-white text-black font-bold'
                : 'text-zinc-400 hover:text-white border border-transparent hover:border-white/20'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>02. DARK ROCK UNDERGROUND</span>
          </button>
          <button
            onClick={() => setActiveTab('BLOKECORE')}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
              activeTab === 'BLOKECORE'
                ? 'bg-white text-black font-bold'
                : 'text-zinc-400 hover:text-white border border-transparent hover:border-white/20'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>03. BLOKECORE / FÚTBOL</span>
          </button>
        </div>

        {/* Category Description Banner */}
        <div className="bg-zinc-950 p-6 md:p-8 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 border-l-2 border-white pl-4">
            <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
              DIVISIÓN 01 // GYM
            </span>
            <h3 className="font-display font-black text-xl text-white uppercase">
              HEAVY WEIGHT. NO EXCUSES.
            </h3>
            <p className="font-mono italic text-xs text-zinc-400">
              Cortes oversize diseñados para caer perfecto sobre el físico en cada serie.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-zinc-600 pl-4">
            <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
              DIVISIÓN 02 // ROCK
            </span>
            <h3 className="font-display font-black text-xl text-white uppercase">
              LOUD &amp; UNAPOLOGETIC.
            </h3>
            <p className="font-mono italic text-xs text-zinc-400">
              Inspirado en el punk, el grunge y las noches sin dormir. Negro sobre negro.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-zinc-600 pl-4">
            <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
              DIVISIÓN 03 // BLOKECORE
            </span>
            <h3 className="font-display font-black text-xl text-white uppercase">
              FROM THE PITCH TO THE CONCRETE.
            </h3>
            <p className="font-mono italic text-xs text-zinc-400">
              El fútbol antes de ser corporativo. Diseños retro-modernos de tablón.
            </p>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group bg-[#080808] border border-white/10 hover:border-white transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image / Mockup preview */}
                <div className="relative aspect-square overflow-hidden bg-black border-b border-white/10 flex items-center justify-center p-8">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 bg-white text-black font-mono text-[10px] font-black tracking-wider">
                      {prod.badge}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2 py-1 bg-black/80 border border-white/20 font-mono text-[10px] text-zinc-300">
                      {prod.weight}
                    </span>
                  </div>

                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>{prod.category}</span>
                    <span>{prod.fit}</span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-xl text-white tracking-tight uppercase group-hover:text-zinc-200">
                      {prod.title}
                    </h3>
                    <p className="font-mono italic text-xs text-zinc-400 mt-1">
                      {prod.subtitle}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 pt-2 text-xs font-mono text-zinc-400">
                    {prod.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & WhatsApp Action */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                      PRECIO RETAIL
                    </span>
                    <strong className="font-display font-black text-xl text-white">
                      {prod.price}
                    </strong>
                  </div>

                  <a
                    href={createWhatsAppUrl(
                      `Hola! Quiero pedir la remera ${prod.title} (${prod.price}) en talle...`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-white text-black font-display font-bold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors flex items-center gap-2"
                  >
                    <span>PEDIR POR WHATSAPP</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
