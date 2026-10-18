import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { BACKGROUND_IMAGES } from '@/data/catalog'

interface ClothPlaneModelProps {
  fondoIndex?: number
  waveIntensity?: number
  mouseStrength?: number
  radiusX?: number
  radiusY?: number
}

export const ClothPlaneModel: React.FC<ClothPlaneModelProps> = ({
  fondoIndex = 0,
  waveIntensity = 0.85,
  mouseStrength = 0.38,
  radiusX = 0.48,
  radiusY = 1.35,
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const shadowMeshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const scrollTiltRef = useRef(0)

  // 1. Cargar las 3 imágenes JPG de fondo del usuario directamente como textura de la tela 3D
  const textures = useTexture(BACKGROUND_IMAGES)

  useEffect(() => {
    textures.forEach((tex) => {
      tex.anisotropy = 16
      tex.colorSpace = THREE.SRGBColorSpace
      tex.wrapS = THREE.ClampToEdgeWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
      tex.generateMipmaps = true
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.needsUpdate = true
    })
  }, [textures])

  const safeIndex = Number.isFinite(fondoIndex) ? Math.abs(fondoIndex) % textures.length : 0
  const currentTexture = textures[safeIndex]
  const prevTextureRef = useRef<THREE.Texture>(textures[0])

  // 2. Detección de scroll y rueda del mouse para inclinar la tela
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const impulse = (e.deltaY > 0 ? 1 : -1) * Math.min(Math.abs(e.deltaY) * 0.0022, 0.4)
      scrollTiltRef.current = THREE.MathUtils.clamp(
        scrollTiltRef.current + impulse,
        -0.55,
        0.55
      )
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY
      touchStartY = e.touches[0].clientY
      const impulse = (deltaY > 0 ? 1 : -1) * Math.min(Math.abs(deltaY) * 0.003, 0.45)
      scrollTiltRef.current = THREE.MathUtils.clamp(
        scrollTiltRef.current + impulse,
        -0.55,
        0.55
      )
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  // 3. Textura de sombra de contacto y profundidad suave
  const shadowTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.clearRect(0, 0, 512, 512)
      const gradient = ctx.createRadialGradient(256, 256, 10, 256, 256, 240)
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.88)')
      gradient.addColorStop(0.35, 'rgba(0, 0, 0, 0.65)')
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.22)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.ellipse(256, 256, 240, 140, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // 4. Uniforms con parámetros para el shader de tela + crossfade suave por opacidad
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouseSphereLocal: { value: new THREE.Vector3(0, 0, 10) },
      uRadiusX: { value: radiusX },
      uRadiusY: { value: radiusY },
      uMouseStrength: { value: mouseStrength },
      uWaveIntensity: { value: waveIntensity },
      uPrevMap: { value: textures[0] },
      uMix: { value: 1.0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    uniforms.uRadiusX.value = radiusX
    uniforms.uRadiusY.value = radiusY
    uniforms.uMouseStrength.value = mouseStrength
    uniforms.uWaveIntensity.value = waveIntensity
  }, [radiusX, radiusY, mouseStrength, waveIntensity, uniforms])

  // 5. Material PBR de tela con transición cruzada suave (sin recrear el material)
  const clothMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: textures[0],
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
      shader.uniforms.uPrevMap = uniforms.uPrevMap
      shader.uniforms.uMix = uniforms.uMix

      shader.vertexShader = `
        uniform float uTime;
        uniform vec3 uMouseSphereLocal;
        uniform float uRadiusX;
        uniform float uRadiusY;
        uniform float uMouseStrength;
        uniform float uWaveIntensity;
        varying vec2 vClothUv;
        ${shader.vertexShader}
      `

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vClothUv = uv;

        // Máscara de bordes anclados estáticos
        float pinMask = sin(uv.x * 3.14159265) * sin(uv.y * 3.14159265);
        pinMask = pow(clamp(pinMask, 0.0, 1.0), 0.55);

        // Ondas fluidas de tela armónicas
        float wave1 = sin(transformed.x * 3.2 + uTime * 1.5) * cos(transformed.y * 2.8 + uTime * 1.2) * 0.055;
        float wave2 = sin(transformed.x * 6.8 - transformed.y * 5.2 + uTime * 2.0) * 0.022;
        float wave3 = cos(transformed.y * 8.5 + uTime * 2.5) * 0.014;
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
        uniform sampler2D uPrevMap;
        uniform float uMix;
        varying vec2 vClothUv;
        ${shader.fragmentShader}
      `

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        #ifdef USE_MAP
          vec4 texPrev = texture2D( uPrevMap, vMapUv );
          vec4 texCurr = texture2D( map, vMapUv );
          float fadeFactor = smoothstep( 0.0, 1.0, clamp( uMix, 0.0, 1.0 ) );
          vec4 sampledDiffuseColor = mix( texPrev, texCurr, fadeFactor );
          diffuseColor *= sampledDiffuseColor;
        #endif
        `
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        #include <dithering_fragment>

        // Sensación de profundidad en la parte trasera superior
        float backDepth = smoothstep(0.35, 1.0, vClothUv.y);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), backDepth * 0.46);
        `
      )
    }

    return mat
  }, [textures, uniforms])

  // Activar fundido suave por opacidad cada vez que cambia la imagen de fondo
  useEffect(() => {
    if (currentTexture && currentTexture !== prevTextureRef.current) {
      uniforms.uPrevMap.value = prevTextureRef.current
      clothMaterial.map = currentTexture
      uniforms.uMix.value = 0.0
      prevTextureRef.current = currentTexture
    }
  }, [currentTexture, clothMaterial, uniforms])

  // 6. Intersección del mouse con el plano de la tela
  const rayPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const worldMouse = useMemo(() => new THREE.Vector3(), [])
  const localMouse = useMemo(() => new THREE.Vector3(), [])

  const basePosX = 0.75
  const basePosY = 0.04
  const basePosZ = 0.02

  const baseRotX = -0.35
  const baseRotY = -0.14
  const baseRotZ = 0.02

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const t = state.clock.getElapsedTime()
    uniforms.uTime.value = t

    // Avanzar suavemente el fundido cruzado entre texturas (~1.8 segundos)
    if (uniforms.uMix.value < 1.0) {
      uniforms.uMix.value = Math.min(1.0, uniforms.uMix.value + delta * 0.55)
    }

    // Raycast a la superficie del paño
    raycaster.setFromCamera(state.pointer, camera)
    raycaster.ray.intersectPlane(rayPlane, worldMouse)

    if (worldMouse) {
      meshRef.current.updateMatrixWorld()
      localMouse.copy(worldMouse)
      meshRef.current.worldToLocal(localMouse)

      uniforms.uMouseSphereLocal.value.lerp(localMouse, 0.22)
    }

    // Retorno elástico suave cuando el usuario detiene el scroll
    scrollTiltRef.current = THREE.MathUtils.damp(scrollTiltRef.current, 0, 3.8, delta)

    const tilt = scrollTiltRef.current
    const targetRotX = baseRotX - tilt * 1.35
    const targetRotY = baseRotY - tilt * 0.16
    const targetPosY = basePosY + Math.abs(tilt) * 0.10
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

    // Sombra de profundidad en la parte inferior
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

      const targetScaleX = 1.0 + absTilt * 0.25
      const targetScaleY = 1.0 + absTilt * 0.65
      const targetShadowZ = 0.35 + tilt * 0.35

      shadowMeshRef.current.scale.x = THREE.MathUtils.damp(
        shadowMeshRef.current.scale.x,
        targetScaleX,
        4.0,
        delta
      )
      shadowMeshRef.current.scale.y = THREE.MathUtils.damp(
        shadowMeshRef.current.scale.y,
        targetScaleY,
        4.0,
        delta
      )
      shadowMeshRef.current.position.z = THREE.MathUtils.damp(
        shadowMeshRef.current.position.z,
        targetShadowZ,
        4.0,
        delta
      )
    }
  })

  return (
    <group>
      {/* 1. Paño de tela en movimiento con fundido cruzado suave */}
      <mesh
        ref={meshRef}
        position={[basePosX, basePosY, basePosZ]}
        rotation={[baseRotX, baseRotY, baseRotZ]}
        material={clothMaterial}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[4.8, 3.4, 120, 90]} />
      </mesh>

      {/* 2. Sombra de profundidad inferior */}
      <mesh
        ref={shadowMeshRef}
        position={[basePosX, -1.82, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[5.2, 2.2]} />
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

useTexture.preload(BACKGROUND_IMAGES)
