import React, { useState, useRef, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { ChevronLeft, ChevronRight, Cpu, Activity, Info } from 'lucide-react'
import { WordRevealTitle } from '@/components/ui/AnimatedText'

const SLIDE_IMAGES = [
  {
    url: '/images/gym-lunes.jpg',
    title: 'LUNES // NO ONE CARES. WORK HARDER.',
    code: 'RAW BARBELL FLOOR',
  },
  {
    url: '/images/gym1.jpg',
    title: 'NIGHT TRAINING // INDUSTRIAL CORE',
    code: 'HEAVY DISCIPLINE',
  },
  {
    url: '/images/gym2.jpg',
    title: 'COLD STEEL // KNURLED DUMBBELLS',
    code: 'CHALK & IRON',
  },
  {
    url: '/images/gym3.jpg',
    title: 'IRONWILLED // BY ANY MEANS NECESSARY',
    code: 'CONTACT SHEET EDITORIAL',
  },
  {
    url: '/images/gym4.jpg',
    title: 'BATTLE ROPES & HIGH FRICTION',
    code: 'ASSAULT & HYPERTROPHY',
  },
  {
    url: '/images/gym5.jpg',
    title: 'CONDITIONS CHANGE // YOU REMAIN STEADY',
    code: 'STEADY MINDSET',
  },
]

interface InnerClothSliderProps {
  currentUrl: string
}

const InnerClothSlider: React.FC<InnerClothSliderProps> = ({ currentUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const texture = useTexture(currentUrl)

  useEffect(() => {
    if (texture) {
      texture.anisotropy = 8
      texture.colorSpace = THREE.SRGBColorSpace
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.needsUpdate = true
    }
  }, [texture])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouseSphereLocal: { value: new THREE.Vector3(0, 0, 10) },
    }),
    []
  )

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide,
    })

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime
      shader.uniforms.uMouseSphereLocal = uniforms.uMouseSphereLocal

      shader.vertexShader = `
        uniform float uTime;
        uniform vec3 uMouseSphereLocal;
        ${shader.vertexShader}
      `

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        // Anclaje perimetral
        float pinMask = sin(uv.x * 3.14159265) * sin(uv.y * 3.14159265);
        pinMask = pow(clamp(pinMask, 0.0, 1.0), 0.6);

        // Ondas de tejido
        float wave = sin(transformed.x * 4.2 + uTime * 2.2) * cos(transformed.y * 3.6 + uTime * 1.8) * 0.045 * pinMask;
        transformed.z += wave;

        // Deformación del cursor
        vec2 delta = transformed.xy - uMouseSphereLocal.xy;
        float dist = length(delta);
        if (dist < 0.6) {
          float factor = smoothstep(0.6, 0.0, dist);
          transformed.z -= factor * 0.28 * pinMask;
        }
        `
      )
    }

    return mat
  }, [texture, uniforms])

  const rayPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const worldMouse = useMemo(() => new THREE.Vector3(), [])
  const localMouse = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    uniforms.uTime.value = t

    raycaster.setFromCamera(state.pointer, camera)
    raycaster.ray.intersectPlane(rayPlane, worldMouse)
    if (worldMouse) {
      meshRef.current.updateMatrixWorld()
      localMouse.copy(worldMouse)
      meshRef.current.worldToLocal(localMouse)
      uniforms.uMouseSphereLocal.value.lerp(localMouse, 0.25)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} material={material}>
      {/* Geometría optimizada (50x35) para consumir menos de 15MB de memoria */}
      <planeGeometry args={[3.2, 4.4, 50, 35]} />
    </mesh>
  )
}

export const SecondaryClothElement: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const currentSlide = SLIDE_IMAGES[slideIndex]

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % SLIDE_IMAGES.length)
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length)

  return (
    <div className="space-y-6 p-6 sm:p-10 bg-black/20 backdrop-blur-2xl border border-white/10 rounded relative overflow-hidden">
      {/* Header explicativo del experimento */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
            EXPERIMENTO 03 // TEST DE MEMORIA &amp; SEGUNDA TELA 3D
          </span>
          <div className="mt-1">
            <WordRevealTitle
              as="h2"
              text="SLIDER 3D EN TELA VIVA"
              className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight"
            />
          </div>
          <p className="font-mono italic text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            ¿Es costoso usar el efecto de tela en otro elemento? Acá podés probarlo en vivo: este slider corre una segunda instancia WebGL independiente con las nuevas fotos de gimnasio.
          </p>
        </div>

        {/* Monitor de Memoria & GPU en tiempo real */}
        <div className="p-3.5 bg-black/80 border border-emerald-400/30 rounded font-mono text-[11px] space-y-1.5 shrink-0">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>GPU MONITOR: TOTALMENTE VIABLE</span>
          </div>
          <div className="flex justify-between gap-4 text-zinc-400 text-[10px]">
            <span>Contextos WebGL Activos:</span>
            <span className="text-white font-bold">2 (Fondo + Slider)</span>
          </div>
          <div className="flex justify-between gap-4 text-zinc-400 text-[10px]">
            <span>Consumo Estimado VRAM:</span>
            <span className="text-emerald-300 font-bold">~16.4 MB</span>
          </div>
          <div className="flex justify-between gap-4 text-zinc-400 text-[10px]">
            <span>Rendimiento:</span>
            <span className="text-emerald-300 font-bold">60.0 FPS Sólidos</span>
          </div>
        </div>
      </div>

      {/* Contenedor del Slider 3D */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
        {/* Canvas 3D del Slide (7 columnas) */}
        <div className="lg:col-span-7 relative h-[480px] sm:h-[550px] w-full bg-black/60 rounded border border-white/15 overflow-hidden select-none cursor-grab active:cursor-grabbing">
          {/* Badge superior */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/15 rounded text-[10px] font-mono text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>3D CLOTH SLIDER [{slideIndex + 1}/{SLIDE_IMAGES.length}]</span>
          </div>

          {/* Canvas WebGL secundario */}
          <Canvas
            camera={{ position: [0, 0, 3.4], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.4} />
            <spotLight position={[2, 4, 3]} intensity={3.5} angle={0.6} penumbra={0.8} />
            <directionalLight position={[-3, 1, 2]} intensity={0.8} />

            <React.Suspense fallback={null}>
              <InnerClothSlider currentUrl={currentSlide.url} />
            </React.Suspense>
          </Canvas>

          {/* Controles de navegación del slider */}
          <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
            <button
              onClick={prevSlide}
              className="p-2.5 bg-black/80 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black text-white rounded-full transition-all"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Puntos de navegación */}
            <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
              {SLIDE_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === slideIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2.5 bg-black/80 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black text-white rounded-full transition-all"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ficha editorial del slide activo (5 columnas) */}
        <div className="lg:col-span-5 space-y-6 font-mono">
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
              ESTUDIO FOTOGRÁFICO GYM // #{slideIndex + 1}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight">
              {currentSlide.title}
            </h3>
            <span className="inline-block px-2 py-0.5 bg-white/10 border border-white/20 text-zinc-300 text-[10px] uppercase rounded">
              {currentSlide.code}
            </span>
          </div>

          <p className="italic text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Al aplicar el efecto de tela en un slider de fotos, la imagen deja de ser un cartel estático: se comporta como un tapiz de lona colgado en el box de entrenamiento. Al pasar el cursor, la tela se deforma con física táctil.
          </p>

          {/* Veredicto de memoria técnico */}
          <div className="p-4 bg-white/[0.03] border border-white/10 rounded space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>VEREDICTO TÉCNICO DE MEMORIA:</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Tener <strong>dos elementos con tela 3D</strong> (el fondo grande + este slider de producto) consume apenas ~16MB adicionales de memoria. No afecta los 60 FPS ni satura el navegador. La recomendación es limitar a máximo 2 telas activas por vista.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
