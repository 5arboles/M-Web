import React, { useState, useEffect } from 'react'
import { BackgroundSlideshow } from '@/components/ui/BackgroundSlideshow'
import { ClothPlaneScene } from '@/components/3d/ClothPlaneScene'
import { HeroSection } from '@/components/ui/HeroSection'
import { ScrollGallerySection } from '@/components/ui/ScrollGallerySection'
import { WholesaleSection } from '@/components/ui/WholesaleSection'
import { Footer } from '@/components/ui/Footer'
import { MessageCircle } from 'lucide-react'
import { createWhatsAppUrl, BACKGROUND_ITEMS } from '@/data/catalog'

export const App: React.FC = () => {
  // Estado sincronizado del fondo activo (fondo.jpg = 0, fondo2.jpg = 1, fondo3.jpg = 2)
  const [currentFondoIndex, setCurrentFondoIndex] = useState(0)

  // Rotación automática cada 10 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFondoIndex((prev) => (prev + 1) % BACKGROUND_ITEMS.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [currentFondoIndex])

  const activeItem = BACKGROUND_ITEMS[currentFondoIndex] || BACKGROUND_ITEMS[0]

  return (
    <div className="relative min-h-screen bg-black text-[#f4f4f4] font-sans selection:bg-white selection:text-black">
      {/* 1. Fondos JPG del usuario (fondo.jpg, fondo2.jpg, fondo3.jpg) visibles en pantalla completa y rotando cada 10s */}
      <BackgroundSlideshow
        currentIndex={currentFondoIndex}
        onSelectIndex={setCurrentFondoIndex}
      />

      {/* 2. Paño 3D en movimiento que también proyecta la textura del JPG activo y responde al scroll y cursor */}
      <ClothPlaneScene fondoIndex={currentFondoIndex} />

      {/* 3. Secciones en cascada guiadas por scroll:
          - Hero: Los textos se desvanecen suavemente al hacer scroll hacia abajo.
          - Galería horizontal: 10 tarjetas con las imágenes 1.jpg a 7.jpg.
          - Sección Mayorista: Aparece inmediatamente al finalizar el recorrido de los 10 diseños. */}
      <main className="relative z-10 w-full">
        {/* Sección 01: Hero con fade out al scrollear */}
        <HeroSection activeFondoTitle={`${activeItem.title} // ${activeItem.subtitle}`} />

        {/* Sección 02: Galería horizontal guiada por scroll con 10 diseños */}
        <ScrollGallerySection />

        {/* Sección 03: Información y packs mayoristas */}
        <WholesaleSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Botón flotante permanente de WhatsApp */}
      <aside aria-label="Contacto Rápido" className="fixed bottom-6 right-6 z-50">
        <a
          href={createWhatsAppUrl('Hola! Estoy navegando M ARCHIVE y quiero hacer una consulta.')}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-white text-black font-display font-bold text-xs tracking-wider uppercase rounded-full shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:bg-zinc-200 hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          <span className="hidden sm:inline">WHATSAPP DIRECT</span>
        </a>
      </aside>
    </div>
  )
}

export default App
