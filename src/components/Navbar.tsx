import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data/profile'
import { ease, spring } from '../lib/motion'
import { useTheme } from '../lib/useTheme'
import { MoonIcon, SunIcon } from './icons'

const LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#contacto', label: 'Contacto' },
]

export function Navbar({ ready }: { ready: boolean }) {
  const { theme, toggle } = useTheme()

  return (
    <motion.header
      // Entra deslizándose desde arriba cuando termina el loader
      initial={{ y: -24, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-line bg-bg/70 pr-2 pl-5 backdrop-blur-md"
      >
        <a href="#inicio" className="font-semibold tracking-tight">
          {profile.name.split(' ')[0]}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-fg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          {/* En móvil, solo mostramos el acceso a Contacto para no saturar */}
          <a href="#contacto" className="rounded-full px-3 py-2 text-sm text-muted hover:text-fg md:hidden">
            Contacto
          </a>
          <motion.button
            type="button"
            onClick={toggle}
            whileTap={{ scale: 0.9, rotate: -15 }}
            transition={spring}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-card hover:text-fg"
          >
            {/* El icono gira al cambiar (AnimatePresence anima la salida del anterior) */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>
    </motion.header>
  )
}
