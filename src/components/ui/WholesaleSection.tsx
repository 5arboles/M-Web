import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { WHOLESALE_TIERS, createWhatsAppUrl } from '@/data/catalog'

export const WholesaleSection: React.FC = () => {
  return (
    <section id="wholesale" className="relative py-28 px-6 md:px-10 bg-[#050505]/95 backdrop-blur-2xl border-t border-white/15 z-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header con el mismo reveal cinético del Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
              VENTA MAYORISTA
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
              className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]"
            >
              SCALE YOUR BRAND.
            </motion.h2>
          </div>

          <p className="font-mono italic text-zinc-400 text-sm sm:text-base leading-relaxed">
            Abastecemos gimnasios, locales de ropa, eventos y marcas emergentes con las mejores bases de algodón pesado (280 GSM) del mercado.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {WHOLESALE_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 border flex flex-col justify-between transition-all duration-300 ${
                tier.recommended
                  ? 'border-white bg-zinc-950 shadow-[0_0_30px_rgba(255,255,255,0.08)] relative'
                  : 'border-white/10 bg-[#080808] hover:border-white/40'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3.5 left-8 px-3 py-1 bg-white text-black font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>PACK MÁS ELEGIDO</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-6">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
                    {tier.quantity}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    {tier.name}
                  </h3>
                  <div className="pt-2">
                    <span className="font-display font-black text-3xl text-white">
                      {tier.discount}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 block">
                      SOBRE PRECIO DE LISTA
                    </span>
                  </div>
                </div>

                <p className="font-mono italic text-xs text-zinc-400 leading-relaxed">
                  {tier.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3 pt-2 text-xs font-mono text-zinc-300">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp Action Button */}
              <div className="pt-8">
                <a
                  href={createWhatsAppUrl(
                    `Hola! Me interesa solicitar lista de precios para el ${tier.name} (${tier.quantity}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 text-xs font-display font-black tracking-wider uppercase transition-colors flex items-center justify-center gap-2 ${
                    tier.recommended
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'border border-white/30 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  <span>SOLICITAR COTIZACIÓN ↗</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Wholesale FAQ Box */}
        <div className="p-8 bg-zinc-950 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-lg text-white uppercase">
              ¿NECESITÁS UNA CÁPSULA ESPECIAL O MÁS DE 200 PRENDAS?
            </h4>
            <p className="font-mono italic text-xs text-zinc-400">
              Coordinamos desarrollo de moldería exclusiva, teñidos especiales y tintas de autor en Buenos Aires.
            </p>
          </div>

          <a
            href={createWhatsAppUrl('Hola! Necesito cotizar una producción especial mayorista de más de 200 prendas.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white text-white font-mono text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-colors whitespace-nowrap text-center"
          >
            HABLAR CON ASESOR
          </a>
        </div>
      </div>
    </section>
  )
}
