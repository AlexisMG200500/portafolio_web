/*
 * Orbes de luz difuminados para los FONDOS (panel de perfil y loader).
 * Son decorativos: cada orbe gira sobre un "brazo" (rotate = transform,
 * barato) y pulsa con scale. El blur del contenedor les da aspecto de luz.
 *
 * (El loader usa otra cosa: Thinking Orbs, ver Loader.tsx)
 */
import { motion } from 'motion/react'

const ORBS = [
  { color: 'var(--accent)', size: 72, radius: 26, duration: 2.4, delay: 0 },
  { color: 'var(--accent-2)', size: 60, radius: 30, duration: 3.1, delay: -1 },
  { color: '#f472b6', size: 52, radius: 22, duration: 2.8, delay: -2 },
]

export function GlowOrbs({ scale = 1, className = '' }: { scale?: number; className?: string }) {
  return (
    <div className={`relative size-40 ${className}`} style={{ transform: `scale(${scale})` }} aria-hidden>
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: orb.duration * 2, repeat: Infinity, ease: 'linear', delay: orb.delay }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full mix-blend-screen blur-xl dark:mix-blend-plus-lighter"
            style={{
              width: orb.size,
              height: orb.size,
              marginLeft: -orb.size / 2,
              marginTop: -orb.size / 2 - orb.radius,
              background: `radial-gradient(circle at 35% 35%, white, ${orb.color} 45%, transparent 72%)`,
            }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
          />
        </motion.div>
      ))}
    </div>
  )
}
