import React, { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

interface Point {
  x: number
  y: number
  wave: { x: number; y: number }
  cursor: {
    x: number
    y: number
    vx: number
    vy: number
  }
}

interface BackgroundWavesProps {
  className?: string
  strokeColor?: string
  backgroundColor?: string
}

export const BackgroundWaves: React.FC<BackgroundWavesProps> = ({
  className = '',
  strokeColor = '#ffffff',
  backgroundColor = 'transparent',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mouseRef = useRef({
    x: -100,
    y: -100,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  })
  const pathsRef = useRef<SVGPathElement[]>([])
  const linesRef = useRef<Point[][]>([])
  const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
  const rafRef = useRef<number | null>(null)
  const boundingRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return

    noiseRef.current = createNoise2D()

    const setSize = () => {
      if (!containerRef.current || !svgRef.current) return
      boundingRef.current = containerRef.current.getBoundingClientRect()
      const { width, height } = boundingRef.current
      svgRef.current.style.width = `${width}px`
      svgRef.current.style.height = `${height}px`
    }

    const setLines = () => {
      if (!svgRef.current || !boundingRef.current) return

      const { width, height } = boundingRef.current
      linesRef.current = []

      pathsRef.current.forEach((path) => path.remove())
      pathsRef.current = []

      const xGap = 24
      const yGap = 20
      const oWidth = width + 100
      const oHeight = height + 40

      const totalLines = Math.ceil(oWidth / xGap)
      const totalPoints = Math.ceil(oHeight / yGap)

      const xStart = (width - xGap * totalLines) / 2
      const yStart = (height - yGap * totalPoints) / 2

      for (let i = 0; i < totalLines; i++) {
        const points: Point[] = []

        for (let j = 0; j < totalPoints; j++) {
          points.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          })
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('fill', 'none')
        path.setAttribute('stroke', strokeColor)
        path.setAttribute('stroke-width', '0.7')
        path.setAttribute('stroke-opacity', '0.12')

        svgRef.current.appendChild(path)
        pathsRef.current.push(path)
        linesRef.current.push(points)
      }
    }

    const updateMouse = (x: number, y: number) => {
      if (!boundingRef.current) return
      const mouse = mouseRef.current
      mouse.x = x - boundingRef.current.left
      mouse.y = y - boundingRef.current.top
      if (!mouse.set) {
        mouse.sx = mouse.x
        mouse.sy = mouse.y
        mouse.set = true
      }
    }

    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY)

    const tick = (time: number) => {
      const { current: lines } = linesRef
      const { current: noise } = noiseRef
      const mouse = mouseRef.current

      // Mouse lerp
      mouse.sx += (mouse.x - mouse.sx) * 0.1
      mouse.sy += (mouse.y - mouse.sy) * 0.1
      const dx = mouse.x - mouse.lx
      const dy = mouse.y - mouse.ly
      const d = Math.hypot(dx, dy)
      mouse.v = d
      mouse.vs += (d - mouse.vs) * 0.1
      mouse.vs = Math.min(100, mouse.vs)
      mouse.lx = mouse.x
      mouse.ly = mouse.y
      mouse.a = Math.atan2(dy, dx)

      if (noise) {
        lines.forEach((points) => {
          points.forEach((p) => {
            const move = noise((p.x + time * 0.005) * 0.002, (p.y + time * 0.003) * 0.002) * 6
            p.wave.x = Math.cos(move) * 8
            p.wave.y = Math.sin(move) * 6

            const dist = Math.hypot(p.x - mouse.sx, p.y - mouse.sy)
            if (dist < 120) {
              const force = (1 - dist / 120) * 15
              p.cursor.vx += Math.cos(mouse.a) * force * 0.05
              p.cursor.vy += Math.sin(mouse.a) * force * 0.05
            }
            p.cursor.vx += (0 - p.cursor.x) * 0.04
            p.cursor.vy += (0 - p.cursor.y) * 0.04
            p.cursor.vx *= 0.9
            p.cursor.vy *= 0.9
            p.cursor.x += p.cursor.vx
            p.cursor.y += p.cursor.vy
          })
        })
      }

      // Draw SVG paths
      lines.forEach((points, i) => {
        const path = pathsRef.current[i]
        if (!path || points.length === 0) return

        let d = `M ${points[0].x + points[0].wave.x + points[0].cursor.x} ${
          points[0].y + points[0].wave.y + points[0].cursor.y
        }`
        for (let j = 1; j < points.length; j++) {
          const pt = points[j]
          d += ` L ${pt.x + pt.wave.x + pt.cursor.x} ${pt.y + pt.wave.y + pt.cursor.y}`
        }
        path.setAttribute('d', d)
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    setSize()
    setLines()
    window.addEventListener('resize', () => {
      setSize()
      setLines()
    })
    window.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [strokeColor])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <svg ref={svgRef} className="w-full h-full block" />
    </div>
  )
}
