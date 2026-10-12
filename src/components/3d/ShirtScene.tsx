import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ShirtModel } from './ShirtModel'
import { PRINTS_DATA } from '@/data/catalog'

interface ShirtSceneProps {
  currentPrintIndex: number
  onPrintChange: (index: number) => void
}

export const ShirtScene: React.FC<ShirtSceneProps> = ({
  currentPrintIndex,
  onPrintChange,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(10)

  // Temporizador de ciclo automático cada 10 segundos
  useEffect(() => {
    setSecondsLeft(10)
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onPrintChange((currentPrintIndex + 1) % PRINTS_DATA.length)
          return 10
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentPrintIndex, onPrintChange])

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center select-none overflow-hidden">
      {/* Luz ambiental radial sutil en el fondo centrada sobre la camiseta */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] lg:w-[750px] h-[550px] lg:h-[750px] rounded-full bg-white/[0.045] blur-[110px] pointer-events-none" />

      {/* Canvas 3D que ocupa el 100% de este contenedor (el cual representa el 75% del ancho de la pantalla) */}
      <Canvas
        camera={{ position: [0, 0, 2.05], fov: 33 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={['transparent']} />

        {/* 1. LUZ SUTIL EN EL MEDIO (Spotlight central suave para resaltar las ondas de la tela) */}
        <spotLight
          position={[0, 4.6, 2.4]}
          angle={0.46}
          penumbra={0.92}
          intensity={3.6}
          color="#ffffff"
          castShadow
        />

        {/* 2. Luces de recorte (Rim lights) para definir los hombros y pliegues de la tela en la oscuridad */}
        <directionalLight position={[-3.8, 2.8, -1.8]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[3.8, 2.2, -1.8]} intensity={1.2} color="#f2f2f2" />
        <ambientLight intensity={0.42} />

        <Suspense fallback={null}>
          <ShirtModel
            currentPrintIndex={currentPrintIndex}
            onPrintChange={onPrintChange}
            isDiagonal={true}
            clothPhysicsIntensity={1.0}
          />
        </Suspense>
      </Canvas>

      {/* Floating Info Pill: Cloth simulation hint & 10s autocycle */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-[10px] font-mono text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span>SIMULACIÓN DE TELA ACTIVA // PASÁ EL MOUSE</span>
      </div>

      {/* Selector e indicador de cambio cada 10 segundos */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-20">
        {/* Barra de progreso de 10s */}
        <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>AUTOCYCLE: <strong className="text-white">{secondsLeft}s</strong></span>
          <span className="text-zinc-600">|</span>
          <span className="text-white uppercase font-bold tracking-wider">
            {PRINTS_DATA[currentPrintIndex]?.category}
          </span>
        </div>

        {/* Botones de selección rápida */}
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
          {PRINTS_DATA.map((print, idx) => (
            <button
              key={print.id}
              onClick={() => {
                onPrintChange(idx)
                setSecondsLeft(10)
              }}
              className={`relative px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider transition-all duration-300 ${
                currentPrintIndex === idx
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {print.category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
