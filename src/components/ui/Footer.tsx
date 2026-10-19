import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { createWhatsAppUrl } from '@/data/catalog'
import { RollingText } from '@/components/ui/AnimatedText'

// Iconos vectoriales oficiales para Redes Sociales
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const TwitterXIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const SOCIAL_NETWORKS = [
  { name: 'Instagram', id: 'ig', icon: InstagramIcon },
  { name: 'Facebook', id: 'fb', icon: FacebookIcon },
  { name: 'Twitter (X)', id: 'tw', icon: TwitterXIcon },
]

interface FooterProps {
  currentSection?: 'urban' | 'gym'
}

export const Footer: React.FC<FooterProps> = ({ currentSection = 'urban' }) => {
  const isGym = currentSection === 'gym'

  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-12 px-6 md:px-10 z-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Giant Brand Sign-off */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            {/* Logo M.svg */}
            <a href="/" className="shrink-0">
              <img
                src="/M.svg"
                alt="Logo MATSEI"
                className="w-[110px] sm:w-[140px] h-auto object-contain filter drop-shadow-[0_4px_25px_rgba(255,255,255,0.15)]"
              />
            </a>

            {/* Frase de ropa al lado, sin línea izquierda */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase block">
                [ 280 GSM HEAVYWEIGHT DROP ]
              </span>
              <p className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-tight">
                RAW STREETWEAR FORGED IN DISCIPLINE.
              </p>
              <p className="font-mono italic text-xs text-zinc-400">
                Algodón pesado 280g para la cultura de calle, el hierro y el underground.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <span className="font-mono italic text-xs text-zinc-400">
              Venta minorista y abastecimiento mayorista.
            </span>
            <a
              href={createWhatsAppUrl('Hola! Quiero hacer una consulta general sobre MATSEI.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3.5 bg-white text-black font-display font-black text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors flex items-center gap-2"
            >
              <RollingText text="ESCRIBINOS AL WHATSAPP" />
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Technical Grid (3 columnas: Acceso & Redes, Comercial, Ubicación) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-xs font-mono text-zinc-400">
          <div className="space-y-5">
            <a
              href={isGym ? "/" : "/gym.html"}
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white rounded font-display font-black text-xs uppercase tracking-wider transition-all"
            >
              <RollingText text={isGym ? "Ver Línea URBANO" : "Ver Línea GYM"} />
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Solo iconos uno al lado del otro, sin título, con rollover PRÓXIMAMENTE */}
            <div className="flex items-center gap-2.5 pt-1">
              {SOCIAL_NETWORKS.map((social) => {
                const Icon = social.icon
                return (
                  <div key={social.id} className="group relative">
                    <div
                      className="w-9 h-9 rounded bg-white/5 hover:bg-white text-zinc-400 hover:text-black border border-white/15 hover:border-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-105"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    </div>

                    {/* Tooltip badge en rollover: PRÓXIMAMENTE */}
                    <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-9 transition-all duration-200 z-30">
                      <span className="px-2 py-0.5 bg-white text-black font-mono font-black text-[9px] uppercase tracking-wider rounded shadow-[0_4px_15px_rgba(255,255,255,0.35)] whitespace-nowrap">
                        PRÓXIMAMENTE
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold block uppercase tracking-wider">
              COMERCIAL
            </span>
            <ul className="space-y-1">
              <li>Venta Minorista</li>
              <li>Packs Mayoristas (10 a 100+ u)</li>
              <li>Envíos a todo el país</li>
              <li>Atención directa por WhatsApp</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold block uppercase tracking-wider">
              UBICACIÓN
            </span>
            <p className="leading-relaxed">
              Buenos Aires, Argentina.<br />
              Longchamps Producción Textil<br />
              Horario de atención: 09:00 - 19:00 hs.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-600">
          <span>&copy; {new Date().getFullYear()} MATSEI. TODOS LOS DERECHOS RESERVADOS.</span>
          <span>[ BS AS, ARG ]</span>
        </div>
      </div>
    </footer>
  )
}
