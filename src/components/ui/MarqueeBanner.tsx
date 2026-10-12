import React from 'react'

export const MarqueeBanner: React.FC = () => {
  const content = (
    <div className="flex items-center gap-8 text-xs sm:text-sm font-mono tracking-widest uppercase text-zinc-400 whitespace-nowrap">
      <span>RAW STREETWEAR</span>
      <span className="text-white">✦</span>
      <span className="text-white font-bold">OVERSIZED FIT 280 GSM</span>
      <span className="text-white">✦</span>
      <span>HEAVY PUMP COVERS</span>
      <span className="text-white">✦</span>
      <span className="text-white font-bold">DARK ROCK UNDERGROUND</span>
      <span className="text-white">✦</span>
      <span>BLOKECORE ARCHIVE</span>
      <span className="text-white">✦</span>
      <span className="text-white font-bold">VENTA MAYORISTA DISPONIBLE</span>
      <span className="text-white">✦</span>
    </div>
  )

  return (
    <div className="relative w-full border-y border-white/10 bg-black/90 py-3.5 overflow-hidden z-20">
      <div className="flex w-max animate-marquee">
        {content}
        {content}
        {content}
      </div>
    </div>
  )
}
