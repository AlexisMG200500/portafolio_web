import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'

const COUNT = 1600
const COLORS = {
  dark: ['#4f8dff', '#3ddbc0'],
  light: ['#e11d1d', '#be123c'],
}

function useIsDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => setDark(root.classList.contains('dark')))
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  return dark
}
const GOLDEN = Math.PI * (3 - Math.sqrt(5))

const hash = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

type Shape = (i: number) => [number, number, number]

const torus: Shape = (i) => {
  const a = (i / COUNT) * Math.PI * 2 * 1
  const b = GOLDEN * i * 7
  const R = 1.35
  const r = 0.45
  return [(R + r * Math.cos(b)) * Math.cos(a), r * Math.sin(b), (R + r * Math.cos(b)) * Math.sin(a)]
}

const cube: Shape = (i) => {
  const face = i % 6
  const u = hash(i) * 2 - 1
  const v = hash(i + 0.5) * 2 - 1
  const s = 1.15
  const faces: [number, number, number][] = [
    [s, u, v], [-s, u, v], [u, s, v], [u, -s, v], [u, v, s], [u, v, -s],
  ]
  const [x, y, z] = faces[face]
  return [x * s, y * s, z * s]
}

const helix: Shape = (i) => {
  const t = i / COUNT
  const strand = i % 2
  const a = t * Math.PI * 10 + strand * Math.PI
  const r = 0.75 + (hash(i) - 0.5) * 0.12
  return [Math.cos(a) * r, (t - 0.5) * 4, Math.sin(a) * r]
}

const wave: Shape = (i) => {
  const side = 40
  const x = ((i % side) / (side - 1) - 0.5) * 4.2
  const z = (Math.floor(i / side) / (side - 1) - 0.5) * 4.2
  const y = Math.sin(x * 1.6) * Math.cos(z * 1.6) * 0.35
  return [x, y, z]
}

const galaxy: Shape = (i) => {
  const arms = 3
  const r = 0.12 + 1.8 * Math.sqrt(hash(i + 0.11))
  const twist = r * 2.4
  const spread = ((hash(i + 0.23) - 0.5) * 0.6) / (r + 0.4)
  const a = ((i % arms) / arms) * Math.PI * 2 + twist + spread
  const y = (hash(i + 0.91) - 0.5) * 0.18 * (2 - r)
  return [Math.cos(a) * r, y, Math.sin(a) * r]
}

const knot: Shape = (i) => {
  const t = (i / COUNT) * Math.PI * 2
  const p = 2
  const q = 3
  const r = 0.55 * (2 + Math.cos(q * t))
  const j = 0.12
  return [
    r * Math.cos(p * t) + (hash(i) - 0.5) * j * 2,
    r * Math.sin(p * t) + (hash(i + 0.3) - 0.5) * j * 2,
    -0.55 * Math.sin(q * t) + (hash(i + 0.7) - 0.5) * j * 2,
  ]
}

const SECTIONS = [
  { id: 'inicio', shape: galaxy, side: 1, opacity: 0.8, tilt: 1.05 },
  { id: 'sobre-mi', shape: torus, side: 1, opacity: 0.55, tilt: 1.1 },
  { id: 'experiencia', shape: cube, side: -1, opacity: 0.45, tilt: 0.5 },
  { id: 'proyectos', shape: helix, side: 1, opacity: 0.5, tilt: 0.2 },
  { id: 'habilidades', shape: wave, side: -1, opacity: 0.5, tilt: 0.6 },
  { id: 'contacto', shape: knot, side: -1, opacity: 0.6, tilt: 0.4 },
]

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function Particles({ animate, dark }: { animate: boolean; dark: boolean }) {
  const group = useRef<THREE.Group>(null)
  const geometry = useRef<THREE.BufferGeometry>(null)
  const material = useRef<THREE.PointsMaterial>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const { viewport, invalidate } = useThree()

  const { shapes, initial, colors } = useMemo(() => {
    const shapes = SECTIONS.map(({ shape }) => {
      const arr = new Float32Array(COUNT * 3)
      for (let i = 0; i < COUNT; i++) arr.set(shape(i), i * 3)
      return arr
    })
    return { shapes, initial: shapes[0].slice(), colors: new Float32Array(COUNT * 3) }
  }, [])

  useEffect(() => {
    const [a, b] = dark ? COLORS.dark : COLORS.light
    const from = new THREE.Color(a)
    const to = new THREE.Color(b)
    const c = new THREE.Color()
    for (let i = 0; i < COUNT; i++) {
      c.copy(from).lerp(to, i / COUNT)
      colors.set([c.r, c.g, c.b], i * 3)
    }
    const attr = geometry.current?.attributes.color
    if (attr) attr.needsUpdate = true
    invalidate()
  }, [dark, colors, invalidate])

  useEffect(() => {
    if (!animate) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [animate])

  useFrame((state, delta) => {
    const g = group.current
    const geo = geometry.current
    const mat = material.current
    if (!g || !geo || !mat || !animate) return

    const mid = window.innerHeight * 0.5
    let index = 0
    let progress = 0
    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id)
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (r.top <= mid) {
        index = i
        progress = (mid - r.top) / Math.max(r.height, 1)
      }
    }
    const next = Math.min(index + 1, SECTIONS.length - 1)
    const mix = smoothstep(0.65, 1, progress)

    const a = shapes[index]
    const b = shapes[next]
    const k = 1 - Math.pow(0.001, delta)
    const position = geo.attributes.position
    const pos = position.array as Float32Array
    for (let i = 0; i < COUNT * 3; i++) {
      const target = a[i] + (b[i] - a[i]) * mix
      pos[i] += (target - pos[i]) * k
    }
    position.needsUpdate = true

    const S = SECTIONS[index]
    const N = SECTIONS[next]
    const side = S.side + (N.side - S.side) * mix
    const narrow = viewport.width < 6
    const targetX = side * viewport.width * (narrow ? 0.18 : 0.26)
    g.position.x += (targetX - g.position.x) * k
    const boost = dark ? 1 : 1.5
    const opacity = Math.min(1, (S.opacity + (N.opacity - S.opacity) * mix) * (narrow && index > 0 ? 0.6 : 1) * boost)
    mat.opacity += (opacity - mat.opacity) * k

    const tilt = S.tilt + (N.tilt - S.tilt) * mix
    g.rotation.y += delta * 0.12
    g.rotation.x += (tilt + pointer.current.y * 0.35 - g.rotation.x) * k * 0.6
    g.rotation.z += (-pointer.current.x * 0.2 - g.rotation.z) * k * 0.6
    g.scale.setScalar((narrow ? 0.8 : 1) * (1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.025))
  })

  return (
    <group ref={group} rotation={[0.3, 0, 0]}>
      <points>
        <bufferGeometry ref={geometry}>
          <bufferAttribute attach="attributes-position" args={[initial, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={material} size={dark ? 0.03 : 0.036} vertexColors transparent opacity={1} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  )
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function Scene3D() {
  const reduceMotion = useReducedMotion()
  const animate = !reduceMotion
  const dark = useIsDark()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <WebGLBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          frameloop={animate ? 'always' : 'demand'}
        >
          <Particles animate={animate} dark={dark} />
        </Canvas>
      </WebGLBoundary>
    </div>
  )
}
