/*
 * ─── ESCENA 3D DE FONDO (Three.js + React Three Fiber) ─────────────────────
 * Una nube de 1600 partículas FIJA detrás de toda la página. Al hacer scroll
 * cambia de forma según la sección visible:
 *
 *   inicio → esfera · sobre-mi → anillo · experiencia → cubo
 *   proyectos → doble hélice · habilidades → ola · contacto → esfera
 *
 * Cómo funciona el "morph":
 *  1. Al empezar calculamos las posiciones de cada forma (mismo nº de puntos).
 *  2. En cada fotograma (useFrame) vemos qué sección está en pantalla y
 *     cuánto se ha avanzado en ella, y mezclamos la forma actual con la
 *     siguiente.
 *  3. Cada punto se acerca poco a poco a su destino (lerp) → transición suave.
 *
 * Además la nube se desplaza a izquierda/derecha por sección (SECTIONS),
 * baja su opacidad fuera de la portada para no tapar el texto y se inclina
 * hacia el ratón.
 *
 * Rendimiento y accesibilidad:
 *  - Se carga aparte (lazy en App.tsx): Three.js no frena la carga inicial.
 *  - Con "reducir movimiento" se muestra una esfera quieta.
 *  - Si no hay WebGL, no se muestra nada (la página funciona igual).
 *
 * 👉 Para adaptarla: cambia COUNT, COLORS, las formas en SHAPES o el lado
 *    y la opacidad de cada sección en SECTIONS.
 */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import { Component, useEffect, useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'

const COUNT = 1600
const COLORS = ['#4f8dff', '#3ddbc0'] // mismos tonos que --accent y --accent-2
const GOLDEN = Math.PI * (3 - Math.sqrt(5))

/** Número "aleatorio" determinista entre 0 y 1 (mismo resultado siempre). */
const hash = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

/* Cada forma devuelve la posición [x, y, z] del punto i */
type Shape = (i: number) => [number, number, number]

const sphere: Shape = (i) => {
  const y = 1 - (i / (COUNT - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const a = GOLDEN * i
  const R = 1.7 * (1 + (hash(i) - 0.5) * 0.06)
  return [Math.cos(a) * r * R, y * R, Math.sin(a) * r * R]
}

const torus: Shape = (i) => {
  const a = (i / COUNT) * Math.PI * 2 * 1 // alrededor del anillo
  const b = GOLDEN * i * 7 // alrededor del tubo
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
  const side = 40 // 40 × 40 = 1600 puntos
  const x = ((i % side) / (side - 1) - 0.5) * 4.2
  const z = (Math.floor(i / side) / (side - 1) - 0.5) * 4.2
  const y = Math.sin(x * 1.6) * Math.cos(z * 1.6) * 0.35
  return [x, y, z]
}

/* Sección → forma, lado de la pantalla (-1 izq, 0 centro, 1 der) y opacidad */
const SECTIONS = [
  { id: 'inicio', shape: sphere, side: 0, opacity: 0.75, tilt: 0.3 },
  { id: 'sobre-mi', shape: torus, side: 1, opacity: 0.55, tilt: 1.1 },
  { id: 'experiencia', shape: cube, side: -1, opacity: 0.45, tilt: 0.5 },
  { id: 'proyectos', shape: helix, side: 1, opacity: 0.5, tilt: 0.2 },
  { id: 'habilidades', shape: wave, side: -1, opacity: 0.5, tilt: 0.6 },
  { id: 'contacto', shape: sphere, side: 0, opacity: 0.6, tilt: 0.3 },
]

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function Particles({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  const geometry = useRef<THREE.BufferGeometry>(null)
  const material = useRef<THREE.PointsMaterial>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  // Precalculamos las posiciones de cada forma una sola vez
  const { shapes, initial, colors } = useMemo(() => {
    const shapes = SECTIONS.map(({ shape }) => {
      const arr = new Float32Array(COUNT * 3)
      for (let i = 0; i < COUNT; i++) arr.set(shape(i), i * 3)
      return arr
    })
    const colors = new Float32Array(COUNT * 3)
    const from = new THREE.Color(COLORS[0])
    const to = new THREE.Color(COLORS[1])
    const c = new THREE.Color()
    for (let i = 0; i < COUNT; i++) {
      c.copy(from).lerp(to, i / COUNT)
      colors.set([c.r, c.g, c.b], i * 3)
    }
    return { shapes, initial: shapes[0].slice(), colors }
  }, [])

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

    // 1) ¿Qué sección está en el centro de la pantalla y cuánto llevamos de ella?
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
    // La transición a la siguiente forma ocurre en el último 35% de la sección
    const mix = smoothstep(0.65, 1, progress)

    // 2) Cada punto se acerca a su destino (mezcla de forma actual y siguiente)
    const a = shapes[index]
    const b = shapes[next]
    const k = 1 - Math.pow(0.001, delta) // suavizado independiente de los FPS
    // Escribimos directamente en el buffer de la geometría (sin re-renderizar React)
    const position = geo.attributes.position
    const pos = position.array as Float32Array
    for (let i = 0; i < COUNT * 3; i++) {
      const target = a[i] + (b[i] - a[i]) * mix
      pos[i] += (target - pos[i]) * k
    }
    position.needsUpdate = true

    // 3) Posición lateral, opacidad e inclinación por sección
    const S = SECTIONS[index]
    const N = SECTIONS[next]
    const side = S.side + (N.side - S.side) * mix
    const narrow = viewport.width < 6 // pantallas estrechas (móvil): menos desplazamiento
    const targetX = side * viewport.width * (narrow ? 0.18 : 0.26)
    g.position.x += (targetX - g.position.x) * k
    const opacity = (S.opacity + (N.opacity - S.opacity) * mix) * (narrow && index > 0 ? 0.6 : 1)
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
        <pointsMaterial ref={material} size={0.03} vertexColors transparent opacity={1} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  )
}

/** Si WebGL falla (navegador antiguo, GPU bloqueada…), no mostramos nada. */
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

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <WebGLBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          // "demand" = solo dibuja una vez (esfera quieta) si se pidió menos movimiento
          frameloop={animate ? 'always' : 'demand'}
        >
          <Particles animate={animate} />
        </Canvas>
      </WebGLBoundary>
    </div>
  )
}
