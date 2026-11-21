import { AnimatePresence, motion } from 'motion/react'
import { spring } from '../lib/motion'
import { useTheme } from '../lib/useTheme'
import { MoonIcon, SunIcon } from './icons'

/** Botón claro/oscuro: el icono gira al cambiar. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.9, rotate: -15 }}
      transition={spring}
      aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      className={`grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-muted/50 hover:text-fg ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? <SunIcon width={16} height={16} /> : <MoonIcon width={16} height={16} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
