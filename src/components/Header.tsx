import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { nav, profile } from '../data/profile'
import { useActiveSection } from '../lib/hooks'
import { ease, fadeUp, spring, stagger } from '../lib/motion'
import { MenuIcon, PlusIcon } from './icons'
import { ThemeToggle } from './ThemeToggle'

const SPY_IDS = ['inicio', ...nav.map((n) => n.id)]

export function Header({ ready }: { ready: boolean }) {
  const active = useActiveSection(SPY_IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open ? 'border-line bg-bg/75 backdrop-blur-lg' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <a href="#inicio" className="text-lg font-semibold tracking-tight" onClick={() => setOpen(false)}>
            {profile.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative block px-3 py-2 text-sm transition-colors ${isActive ? 'text-fg' : 'text-muted hover:text-fg'}`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span layoutId="nav-line" transition={spring} className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
            >
              {open ? <PlusIcon className="rotate-45" /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Principal"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg/95 px-5 pt-6 backdrop-blur-lg lg:hidden"
          >
            <motion.ol variants={stagger(0.05, 0.05)} initial="hidden" animate="show" className="border-t border-line">
              {nav.map((item, i) => (
                <motion.li key={item.id} variants={fadeUp} className="border-b border-line">
                  <a href={`#${item.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-5">
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    <span className="text-3xl font-semibold tracking-tight">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
