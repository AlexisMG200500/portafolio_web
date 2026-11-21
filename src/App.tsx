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

const scene3d: Promise<{ default: () => ReactNode }> = import('./components/Scene3D').catch(() => ({ default: () => null }))
const Scene3D = lazy(() => scene3d)

const MIN_MS = 1500
const MAX_MS = 2500

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

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

  useEffect(() => {
    const root = document.documentElement
    if (!ready) {
      root.style.overflow = 'hidden'
      return
    }
    root.style.overflow = ''
    if (location.hash) history.replaceState(null, '', location.pathname + location.search)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [ready])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Loader key="loader" />}</AnimatePresence>

      <a
        href="#sobre-mi"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Saltar al contenido
      </a>

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
