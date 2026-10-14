import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

export interface ClothParams {
  waveIntensity: number
  waveSpeed: number
  mouseStrength: number
  radiusX: number
  radiusY: number
  baseRotX: number
  backDarkness: number
}

interface ClothMeshProps {
  textureUrl: string
  params: ClothParams
}

const ClothMesh: React.FC<ClothMeshProps> = ({ textureUrl, params }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const shadowMeshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const scrollTiltRef = useRef(0)

  // Carga optimizada de textura con mipmaps y anisotropic filtering
  const texture = useTexture(textureUrl)

  useEffect(() => {
    if (texture) {
      texture.anisotropy = 16
      texture.colorSpace = THREE.SRGBColorSpace
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.generateMipmaps = true
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.needsUpdate = true
    }
  }, [texture])

  // Uniforms reactivos a los parámetros
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouseSphereLocal: { value: new THREE.Vector3(0, 0, 10) },
      uRadiusX: { value: params.radiusX },
      uRadiusY: { value: params.radiusY },
      uMouseStrength: { value: params.mouseStrength },
      uWaveIntensity: { value: params.waveIntensity },
      uWaveSpeed: { value: params.waveSpeed },
      uBackDarkness: { value: params.backDarkness },
    }),
    []
  )

  // Sincronizar uniforms cuando cambian los params
  useEffect(() => {
    uniforms.uRadiusX.value = params.radiusX
    uniforms.uRadiusY.value = params.radiusY
    uniforms.uMouseStrength.value = params.mouseStrength
    uniforms.uWaveIntensity.value = params.waveIntensity
    uniforms.uWaveSpeed.value = params.waveSpeed
    uniforms.uBackDarkness.value = params.backDarkness
  }, [params, uniforms])

  // Detección de scroll para inclinación reactiva
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const impulse = (e.deltaY > 0 ? 1 : -1) * Math.min(Math.abs(e.deltaY) * 0.002, 0.4)
      scrollTiltRef.current = THREE.MathUtils.clamp(
        scrollTiltRef.current + impulse,
        -0.55,
        0.55
      )
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  // Textura radial para la sombra de profundidad
  const shadowTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, 512, 512)
      const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 240)
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.92)')
      grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.65)')
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.2)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(256, 256, 240, 140, 0, 0, Math.PI * 2)
      ctx.fill()
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  // Material PBR con shader inyectado
  const clothMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.72,
      metalness: 0.04,
      side: THREE.DoubleSide,
    })

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime
      shader.uniforms.uMouseSphereLocal = uniforms.uMouseSphereLocal
      shader.uniforms.uRadiusX = uniforms.uRadiusX
      shader.uniforms.uRadiusY = uniforms.uRadiusY
      shader.uniforms.uMouseStrength = uniforms.uMouseStrength
      shader.uniforms.uWaveIntensity = uniforms.uWaveIntensity
      shader.uniforms.uWaveSpeed = uniforms.uWaveSpeed
      shader.uniforms.uBackDarkness = uniforms.uBackDarkness

      shader.vertexShader = `
        uniform float uTime;
        uniform vec3 uMouseSphereLocal;
        uniform float uRadiusX;
        uniform float uRadiusY;
        uniform float uMouseStrength;
        uniform float uWaveIntensity;
        uniform float uWaveSpeed;
        varying vec2 vClothUv;
        ${shader.vertexShader}
      `

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vClothUv = uv;

        // Máscara de anclaje perimetral
        float pinMask = sin(uv.x * 3.14159265) * sin(uv.y * 3.14159265);
        pinMask = pow(clamp(pinMask, 0.0, 1.0), 0.55);

        // Ondas fluidas armónicas con velocidad ajustable
        float wave1 = sin(transformed.x * 3.2 + uTime * uWaveSpeed) * cos(transformed.y * 2.8 + uTime * (uWaveSpeed * 0.8)) * 0.055;
        float wave2 = sin(transformed.x * 6.8 - transformed.y * 5.2 + uTime * (uWaveSpeed * 1.3)) * 0.022;
        float wave3 = cos(transformed.y * 8.5 + uTime * (uWaveSpeed * 1.6)) * 0.014;
        float totalWave = (wave1 + wave2 + wave3) * uWaveIntensity * pinMask;
        transformed.z += totalWave;

        // Deformación del cursor con ELIPSE VERTICAL
        vec2 delta = transformed.xy - uMouseSphereLocal.xy;
        float ellipDist = length(vec2(delta.x / uRadiusX, delta.y / uRadiusY));

        if (ellipDist < 1.0) {
          float factor = smoothstep(1.0, 0.0, ellipDist);
          float pushZ = factor * factor * uMouseStrength * pinMask;
          transformed.z -= pushZ;
          transformed.x += (delta.x / uRadiusX) * factor * (uMouseStrength * 0.12) * pinMask;
        }
        `
      )

      shader.fragmentShader = `
        uniform float uBackDarkness;
        varying vec2 vClothUv;
        ${shader.fragmentShader}
      `

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        #include <dithering_fragment>

        // Oscurecimiento físico en la parte superior/trasera para sensación de profundidad
        float backDepth = smoothstep(0.35, 1.0, vClothUv.y);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), backDepth * uBackDarkness);
        `
      )
    }

    return mat
  }, [texture, uniforms])

  // Raycaster para el cursor
  const rayPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const worldMouse = useMemo(() => new THREE.Vector3(), [])
  const localMouse = useMemo(() => new THREE.Vector3(), [])

  const basePosX = 0.72
  const basePosY = 0.04
  const basePosZ = 0.02

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const t = state.clock.getElapsedTime()
    uniforms.uTime.value = t

    raycaster.setFromCamera(state.pointer, camera)
    raycaster.ray.intersectPlane(rayPlane, worldMouse)

    if (worldMouse) {
      meshRef.current.updateMatrixWorld()
      localMouse.copy(worldMouse)
      meshRef.current.worldToLocal(localMouse)
      uniforms.uMouseSphereLocal.value.lerp(localMouse, 0.22)
    }

    scrollTiltRef.current = THREE.MathUtils.damp(scrollTiltRef.current, 0, 3.8, delta)
    const tilt = scrollTiltRef.current
    const targetRotX = params.baseRotX - tilt * 1.35
    const targetRotY = -0.14 - tilt * 0.16
    const targetPosY = basePosY + Math.abs(tilt) * 0.1
    const targetPosZ = basePosZ + tilt * 0.32

    meshRef.current.rotation.x = THREE.MathUtils.damp(
      meshRef.current.rotation.x,
      targetRotX,
      4.2,
      delta
    )
    meshRef.current.rotation.y = THREE.MathUtils.damp(
      meshRef.current.rotation.y,
      targetRotY,
      4.2,
      delta
    )
    meshRef.current.position.y = THREE.MathUtils.damp(
      meshRef.current.position.y,
      targetPosY,
      4.2,
      delta
    )
    meshRef.current.position.z = THREE.MathUtils.damp(
      meshRef.current.position.z,
      targetPosZ,
      4.2,
      delta
    )

    if (shadowMeshRef.current) {
      const shadowMaterial = shadowMeshRef.current.material as THREE.MeshBasicMaterial
      const absTilt = Math.abs(tilt)
      const targetOpacity = 0.45 + absTilt * 0.45 + Math.sin(t * 1.5) * 0.05
      shadowMaterial.opacity = THREE.MathUtils.damp(
        shadowMaterial.opacity,
        targetOpacity,
        4.0,
        delta
      )
      shadowMeshRef.current.position.z = THREE.MathUtils.damp(
        shadowMeshRef.current.position.z,
        0.35 + tilt * 0.35,
        4.0,
        delta
      )
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[basePosX, basePosY, basePosZ]}
        rotation={[params.baseRotX, -0.14, 0.02]}
        material={clothMaterial}
      >
        <planeGeometry args={[4.8, 3.4, 120, 90]} />
      </mesh>

      <mesh
        ref={shadowMeshRef}
        position={[basePosX, -1.82, 0.35]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[5.2, 2.4]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

interface GymClothCanvasProps {
  textureUrl: string
  params: ClothParams
}

export const GymClothCanvas: React.FC<GymClothCanvasProps> = ({ textureUrl, params }) => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 select-none overflow-hidden pointer-events-auto">
      {/* Luz focal ambiental */}
      <div className="absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-white/[0.04] blur-[130px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <spotLight
          position={[1.8, 3.8, 3.2]}
          angle={0.56}
          penumbra={0.9}
          intensity={3.8}
          color="#ffffff"
        />
        <directionalLight position={[-3.2, 2.2, 1.5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[4.2, -1, 1.2]} intensity={0.8} color="#e5e5e5" />
        <ambientLight intensity={0.42} />

        <React.Suspense fallback={null}>
          <ClothMesh textureUrl={textureUrl} params={params} />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
