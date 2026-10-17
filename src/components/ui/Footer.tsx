import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { createWhatsAppUrl } from '@/data/catalog'

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#020202] border-t border-white/10 pt-20 pb-12 px-6 md:px-10 z-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Giant Brand Sign-off */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            {/* Logo M.svg */}
            <img
              src="/M.svg"
              alt="Logo M Archive"
              className="w-[110px] sm:w-[140px] h-auto object-contain filter drop-shadow-[0_4px_25px_rgba(255,255,255,0.15)]"
            />

            {/* Frase de ropa al lado, tipo streetwear */}
            <div className="space-y-1 border-l-0 sm:border-l border-white/20 sm:pl-6">
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
              href={createWhatsAppUrl('Hola! Quiero hacer una consulta general sobre M ARCHIVE.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white text-black font-display font-black text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors flex items-center gap-2"
            >
              <span>ESCRIBINOS AL WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Technical Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono text-zinc-400">
          <div className="space-y-2">
            <span className="text-white font-bold block uppercase tracking-wider">
              LÍNEAS ACTIVAS
            </span>
            <ul className="space-y-1">
              <li>01. Heavy Gym &amp; Pump Covers</li>
              <li>02. Dark Rock Underground</li>
              <li>03. Blokecore / Fútbol de Culto</li>
              <li className="text-zinc-600">04. Hoodies &amp; Cargos (Pronto)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold block uppercase tracking-wider">
              ESTÁNDARES
            </span>
            <ul className="space-y-1">
              <li>Algodón Peinado 280 GSM</li>
              <li>Cuello Ribb Alto 2x1</li>
              <li>Costura Reforzada 4 Hilos</li>
              <li>Tintas de Alta Densidad</li>
            </ul>
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
              Atelier &amp; Producción Textil.<br />
              Horario de atención: 09:00 - 19:00 hs.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-600">
          <span>&copy; {new Date().getFullYear()} M ARCHIVE. TODOS LOS DERECHOS RESERVADOS.</span>
          <span>[ BS AS, ARG ]</span>
        </div>
      </div>
    </footer>
  )
}
