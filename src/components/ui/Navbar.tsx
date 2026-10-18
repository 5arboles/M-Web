import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { createWhatsAppUrl } from '@/data/catalog'
import { RollingText } from '@/components/ui/AnimatedText'

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3.5' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:tracking-normal transition-all duration-300">
            M // ARCHIVE
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono italic px-2 py-0.5 border border-white/20 rounded text-zinc-400">
            280 GSM STREETWEAR
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[12px] font-mono tracking-wider text-zinc-400">
          <a href="#lines" className="hover:text-white transition-colors duration-200">
            [ COLECCIÓN ]
          </a>
          <a href="#slider" className="hover:text-white transition-colors duration-200">
            [ ARCHIVO DISEÑOS ]
          </a>
          <a href="#wholesale" className="hover:text-white transition-colors duration-200">
            [ VENTA MAYORISTA ]
          </a>
        </nav>

        {/* WhatsApp Action Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={createWhatsAppUrl('Hola! Quiero consultar por las remeras de MATSEI.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 bg-white text-black font-display font-bold text-xs tracking-wider rounded-none hover:bg-zinc-200 transition-all duration-200"
          >
            <RollingText text="WHATSAPP DIRECT" />
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10"
          aria-label="Abrir Menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-4">
          <a
            href="#lines"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono tracking-wider text-zinc-300 py-2 border-b border-white/5"
          >
            [ COLECCIÓN ]
          </a>
          <a
            href="#slider"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono tracking-wider text-zinc-300 py-2 border-b border-white/5"
          >
            [ ARCHIVO DISEÑOS ]
          </a>
          <a
            href="#wholesale"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono tracking-wider text-zinc-300 py-2 border-b border-white/5"
          >
            [ VENTA MAYORISTA ]
          </a>
          <a
            href={createWhatsAppUrl('Hola! Quiero consultar por las remeras de MATSEI.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-display font-bold text-xs tracking-wider"
          >
            <RollingText text="CONTACTO WHATSAPP" />
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  )
}
