import { motion } from 'motion/react'
import { ThinkingOrb } from 'thinking-orbs'
import { profile } from '../data/profile'
import { ease } from '../lib/motion'
import { GlowOrbs } from './GlowOrbs'

export function Loader() {
  return (
    <motion.div
      role="status"
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6, ease } }}
    >
      <span className="sr-only">Cargando portafolio…</span>

      <div className="pointer-events-none absolute opacity-25 blur-2xl" aria-hidden>
        <GlowOrbs scale={1.6} />
      </div>

      <div className="relative flex flex-col items-center gap-8" aria-hidden>
        <div className="grid size-32 place-items-center">
          <ThinkingOrb state="working" size={64} color="#4f8dff" style={{ transform: 'scale(2)' }} />
        </div>
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.3em] text-muted"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease }}
        >
          {profile.name}
        </motion.p>
      </div>
    </motion.div>
  )
}
