import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

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

      <Navbar ready={ready} />
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
