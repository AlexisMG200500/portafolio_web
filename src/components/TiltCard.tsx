import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform, type HTMLMotionProps } from 'motion/react'
import type { MouseEvent, ReactNode } from 'react'

type TiltCardProps = Omit<HTMLMotionProps<'article'>, 'children'> & { children?: ReactNode; max?: number }

export function TiltCard({ children, className = '', max = 8, style, ...props }: TiltCardProps) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springCfg = { stiffness: 220, damping: 22 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springCfg)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springCfg)
  const glowX = useTransform(px, (v) => `${v * 100}%`)
  const glowY = useTransform(py, (v) => `${v * 100}%`)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, color-mix(in oklab, var(--accent) 16%, transparent), transparent 60%)`

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      className={`group/tilt relative isolate overflow-hidden rounded-3xl border border-line bg-card/70 backdrop-blur-md transition-colors hover:border-accent/40 ${className}`}
      {...props}
    >
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
      {children}
    </motion.article>
  )
}
