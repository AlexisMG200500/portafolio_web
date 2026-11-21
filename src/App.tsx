import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { Header } from './components/Header'
import { Loader } from './components/Loader'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

/*
 * La escena 3D (Three.js) se descarga en un archivo aparte. Empezamos a
 * pedirla YA (no cuando React la monte) para que esté lista al terminar
 * el loader, pero sin bloquear la carga del resto de la página.
 */
// Si el archivo no llega a descargarse (red caída, deploy nuevo…), la página
// sigue funcionando sin el fondo 3D en lugar de quedarse en blanco.
const scene3d: Promise<{ default: () => ReactNode }> = import('./components/Scene3D').catch(() => ({ default: () => null }))
const Scene3D = lazy(() => scene3d)

/*
 * ─── DURACIÓN DEL LOADER ───────────────────────────────────────────────────
 * El loader se va cuando las fuentes están listas, pero:
 *  - se muestra al menos MIN_MS (para que se aprecie el orbe y no sea un "flash")
 *  - nunca más de MAX_MS (para no bloquear a nadie con conexión lenta)
 * 👉 Ajusta estos números a tu gusto. Con 0 / 0 desactivas el loader.
 */
const MIN_MS = 1500
const MAX_MS = 2500

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Que el navegador NO recuerde la posición del scroll al recargar:
// la página siempre arranca en la portada.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

export default function App() {
  const [ready, setReady] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let cancelled = false
    const minimum = wait(reduceMotion ? 300 : MIN_MS)
    const assets = Promise.race([document.fonts.ready, wait(MAX_MS)])

    Promise.all([minimum, assets]).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [reduceMotion])

  // Mientras está el loader no se puede hacer scroll; al terminar, arriba del todo
  useEffect(() => {
    const root = document.documentElement
    if (!ready) {
      root.style.overflow = 'hidden'
      return
    }
    root.style.overflow = ''
    // Quitamos el #seccion de la URL para que al recargar no salte a ella
    if (location.hash) history.replaceState(null, '', location.pathname + location.search)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [ready])

  return (
    // reducedMotion="user": si el sistema pide menos movimiento, Motion
    // desactiva automáticamente las animaciones de transform (x, y, scale…)
    // y deja solo los fundidos de opacidad.
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Loader key="loader" />}</AnimatePresence>

      {/* Enlace "saltar al contenido" para usuarios de teclado */}
      <a
        href="#sobre-mi"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Saltar al contenido
      </a>

      {/* Escena 3D fija detrás de toda la página */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      <Header ready={ready} />
      <main aria-busy={!ready}>
        <Hero ready={ready} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </MotionConfig>
  )
}
