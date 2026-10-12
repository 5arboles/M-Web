import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ClothPlaneModel } from './ClothPlaneModel'

interface ClothPlaneSceneProps {
  fondoIndex?: number
}

export const ClothPlaneScene: React.FC<ClothPlaneSceneProps> = ({ fondoIndex = 0 }) => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 select-none overflow-hidden pointer-events-auto">
      {/* Luz ambiental focal sobre la tela */}
      <div className="absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-white/[0.04] blur-[130px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Spotlight central sobre el tejido para proyectar sombras en las arrugas */}
        <spotLight
          position={[1.8, 3.8, 3.2]}
          angle={0.56}
          penumbra={0.9}
          intensity={3.8}
          color="#ffffff"
          castShadow
        />

        {/* Luces de recorte laterales */}
        <directionalLight position={[-3.2, 2.2, 1.5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[4.2, -1, 1.2]} intensity={0.8} color="#e5e5e5" />
        <ambientLight intensity={0.42} />

        <Suspense fallback={null}>
          <ClothPlaneModel
            fondoIndex={fondoIndex}
            waveIntensity={0.85}
            mouseStrength={0.38}
            radiusX={0.48}
            radiusY={1.35}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
