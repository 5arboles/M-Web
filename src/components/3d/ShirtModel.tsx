import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Decal, Float } from '@react-three/drei'
import { PRINTS_DATA } from '@/data/catalog'

interface ShirtModelProps {
  currentPrintIndex: number
  onPrintChange?: (index: number) => void
  isDiagonal?: boolean
  clothPhysicsIntensity?: number
}

export const ShirtModel: React.FC<ShirtModelProps> = ({
  currentPrintIndex,
  onPrintChange,
  isDiagonal = true,
  clothPhysicsIntensity = 1.0,
}) => {
  const shirtGroup = useRef<THREE.Group>(null)
  const innerMeshRef = useRef<THREE.Mesh>(null)
  const decalMeshRef = useRef<THREE.Mesh>(null)
  const { nodes } = useGLTF('/shirt_baked.glb') as any
  const { viewport, camera } = useThree()

  // Uniforms compartidos para el shader de simulación de tela (Offscreen Canvas Inspired)
  const clothUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouseSphereLocal: { value: new THREE.Vector3(0, 0, 10) },
      uMouseRadius: { value: 0.38 },
      uMouseStrength: { value: 0.14 * clothPhysicsIntensity },
      uWindStrength: { value: 0.03 * clothPhysicsIntensity },
    }),
    [clothPhysicsIntensity]
  )

  // Generador de texturas de alta resolución mediante Canvas 2D en memoria
  const textures = useMemo(() => {
    return PRINTS_DATA.map((print) => {
      const canvas = document.createElement('canvas')
      canvas.width = 1024
      canvas.height = 1024
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.clearRect(0, 0, 1024, 1024)

        if (print.category === 'GYM') {
          ctx.strokeStyle = '#FFFFFF'
          ctx.fillStyle = '#FFFFFF'
          ctx.textAlign = 'center'
          ctx.font = '900 62px "Clash Display", Impact, sans-serif'
          ctx.letterSpacing = '6px'
          ctx.fillText('HEAVY DISCIPLINE', 512, 310)

          ctx.lineWidth = 8
          ctx.beginPath()
          ctx.moveTo(180, 360)
          ctx.lineTo(844, 360)
          ctx.stroke()

          ctx.font = '700 32px "DM Mono", monospace'
          ctx.letterSpacing = '8px'
          ctx.fillText('NO SHORTCUTS // NO WEAKNESS', 512, 430)

          ctx.setLineDash([16, 10])
          ctx.lineWidth = 5
          ctx.strokeRect(320, 500, 384, 160)
          ctx.setLineDash([])

          ctx.font = '900 50px "Clash Display", sans-serif'
          ctx.fillText('RAW IRON', 512, 570)

          ctx.font = 'italic 24px "DM Mono", monospace'
          ctx.fillText('[ 280 GSM // EDITION 01 ]', 512, 620)
        } else if (print.category === 'ROCK') {
          ctx.fillStyle = '#FFFFFF'
          ctx.strokeStyle = '#FFFFFF'
          ctx.textAlign = 'center'
          ctx.font = '900 90px "Clash Display", Impact, sans-serif'
          ctx.letterSpacing = '8px'
          ctx.fillText('DISTORTION', 512, 290)

          ctx.font = '800 52px "Clash Display", sans-serif'
          ctx.letterSpacing = '14px'
          ctx.fillText('UNDERGROUND', 512, 390)

          ctx.lineWidth = 14
          ctx.beginPath()
          ctx.moveTo(140, 440)
          ctx.lineTo(884, 440)
          ctx.stroke()

          ctx.font = '900 140px "Clash Display", sans-serif'
          ctx.fillText('1994', 512, 590)

          ctx.font = 'italic 26px "DM Mono", monospace'
          ctx.fillText('LIVE FAST // NOTHING LASTS FOREVER', 512, 670)
        } else if (print.category === 'BLOKECORE') {
          ctx.fillStyle = '#FFFFFF'
          ctx.strokeStyle = '#FFFFFF'
          ctx.textAlign = 'center'
          ctx.lineWidth = 8
          ctx.beginPath()
          ctx.moveTo(512, 190)
          ctx.lineTo(720, 270)
          ctx.lineTo(690, 580)
          ctx.lineTo(512, 690)
          ctx.lineTo(334, 580)
          ctx.lineTo(304, 270)
          ctx.closePath()
          ctx.stroke()

          ctx.font = '900 44px "Clash Display", sans-serif'
          ctx.fillText('AGAINST', 512, 350)

          ctx.font = '700 34px "Clash Display", sans-serif'
          ctx.fillText('MODERN FOOTBALL', 512, 410)

          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.moveTo(390, 450)
          ctx.lineTo(634, 450)
          ctx.stroke()

          ctx.font = '900 68px "Clash Display", sans-serif'
          ctx.fillText('TERRACE', 512, 530)

          ctx.font = 'italic 24px "DM Mono", monospace'
          ctx.fillText('ARCHIVE // DIVISION 01', 512, 630)
        } else {
          ctx.fillStyle = '#FFFFFF'
          ctx.strokeStyle = '#FFFFFF'
          ctx.textAlign = 'center'
          ctx.font = '900 220px "Clash Display", sans-serif'
          ctx.fillText('M', 512, 440)

          ctx.lineWidth = 8
          ctx.beginPath()
          ctx.moveTo(260, 510)
          ctx.lineTo(764, 510)
          ctx.stroke()

          ctx.font = '700 46px "Clash Display", sans-serif'
          ctx.letterSpacing = '18px'
          ctx.fillText('ARCHIVE', 512, 590)
        }
      }

      const texture = new THREE.CanvasTexture(canvas)
      texture.anisotropy = 16
      texture.needsUpdate = true
      return texture
    })
  }, [])

  const currentTexture = textures[currentPrintIndex % textures.length]

  // Función modificadora de Shader para simulación de tela interactiva
  const attachClothShader = (shader: any) => {
    shader.uniforms.uTime = clothUniforms.uTime
    shader.uniforms.uMouseSphereLocal = clothUniforms.uMouseSphereLocal
    shader.uniforms.uMouseRadius = clothUniforms.uMouseRadius
    shader.uniforms.uMouseStrength = clothUniforms.uMouseStrength
    shader.uniforms.uWindStrength = clothUniforms.uWindStrength

    shader.vertexShader = `
      uniform float uTime;
      uniform vec3 uMouseSphereLocal;
      uniform float uMouseRadius;
      uniform float uMouseStrength;
      uniform float uWindStrength;
      ${shader.vertexShader}
    `

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>

      // 1. Simulación de ondas de viento en tela (Cloth Wind Waves)
      float wind1 = sin(transformed.y * 6.5 + uTime * 2.4) * cos(transformed.x * 5.2 + uTime * 1.8) * uWindStrength;
      float wind2 = sin(transformed.y * 14.0 + transformed.x * 10.0 + uTime * 4.2) * (uWindStrength * 0.35);
      transformed += normal * (wind1 + wind2);

      // 2. Colisión física con la esfera de mouse invisible (Offscreen Canvas Cloth Sim)
      float mouseDist = distance(transformed, uMouseSphereLocal);
      if (mouseDist < uMouseRadius) {
        float pushFactor = smoothstep(uMouseRadius, 0.0, mouseDist);
        // Empujar la tela hacia adentro y a lo largo de su normal
        vec3 pushDir = normalize(transformed - uMouseSphereLocal);
        transformed += (pushDir * 0.4 - vec3(0.0, 0.0, 0.6)) * (pushFactor * pushFactor * uMouseStrength);
      }
      `
    )
  }

  // Material de algodón negro lavado con shader de tela inyectado
  const blackCottonMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0c0c0e'), // Washed deep black
      roughness: 0.85,
      metalness: 0.06,
    })
    mat.onBeforeCompile = attachClothShader
    return mat
  }, [clothUniforms])

  // Material del Decal para que comparta exactamente la deformación física de la tela
  const decalMaterial = useMemo(() => {
    if (!currentTexture) return null
    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
    })
    mat.onBeforeCompile = attachClothShader
    return mat
  }, [currentTexture, clothUniforms])

  // Tracking de mouse en 3D para la esfera invisible de colisión
  const rayPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  )
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const worldMouse3D = useMemo(() => new THREE.Vector3(), [])
  const localMouse3D = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    if (!shirtGroup.current || !innerMeshRef.current) return

    const t = state.clock.getElapsedTime()
    clothUniforms.uTime.value = t

    // Calcular posición 3D del puntero para la esfera invisible de colisión
    raycaster.setFromCamera(state.pointer, camera)
    raycaster.ray.intersectPlane(rayPlane, worldMouse3D)

    if (worldMouse3D) {
      // Convertir coordenadas del mouse de espacio mundo a espacio local de la remera
      innerMeshRef.current.updateMatrixWorld()
      localMouse3D.copy(worldMouse3D)
      innerMeshRef.current.worldToLocal(localMouse3D)
      
      clothUniforms.uMouseSphereLocal.value.lerp(localMouse3D, 0.25)
    }

    // Inclinación diagonal amplia (75% hero position)
    const baseRotX = isDiagonal ? 0.14 : 0.04
    const baseRotY = isDiagonal ? -0.38 : 0
    const baseRotZ = isDiagonal ? 0.08 : 0

    // Movimiento orgánico global (balanceo suave de prenda colgada)
    const waveY = Math.sin(t * 1.5) * 0.03
    const waveRotZ = Math.cos(t * 1.8) * 0.025
    const waveRotX = Math.sin(t * 1.2) * 0.015

    const mouseX = state.pointer.x
    const mouseY = state.pointer.y

    const targetRotX = baseRotX + waveRotX - mouseY * 0.2
    const targetRotY = baseRotY + mouseX * 0.28
    const targetRotZ = baseRotZ + waveRotZ - mouseX * 0.08

    shirtGroup.current.rotation.x = THREE.MathUtils.damp(
      shirtGroup.current.rotation.x,
      targetRotX,
      3.2,
      delta
    )
    shirtGroup.current.rotation.y = THREE.MathUtils.damp(
      shirtGroup.current.rotation.y,
      targetRotY,
      3.2,
      delta
    )
    shirtGroup.current.rotation.z = THREE.MathUtils.damp(
      shirtGroup.current.rotation.z,
      targetRotZ,
      3.2,
      delta
    )

    shirtGroup.current.position.y = THREE.MathUtils.damp(
      shirtGroup.current.position.y,
      waveY,
      3.2,
      delta
    )
  })

  return (
    <group ref={shirtGroup} dispose={null}>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.2}>
        <mesh
          ref={innerMeshRef}
          castShadow
          receiveShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={blackCottonMaterial}
          scale={1.58} // Escala ampliada para ocupar el 75%
          position={[0, -0.06, 0]}
        >
          {/* Decal con la estampa frontal */}
          {currentTexture && (
            <Decal
              position={[0, 0.045, 0.145]}
              rotation={[0, 0, 0]}
              scale={0.165}
              map={currentTexture}
            />
          )}
        </mesh>
      </Float>
    </group>
  )
}

useGLTF.preload('/shirt_baked.glb')
