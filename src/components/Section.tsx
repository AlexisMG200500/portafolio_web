/*
 * Envoltorio común para todas las secciones:
 * - mismo ancho y espaciado en todas las secciones
 * - encabezado con número + título, animado al entrar en vista
 * - `children` suele ser una cuadrícula de <Tile>
 */
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, inView, stagger } from '../lib/motion'

type SectionProps = {
  id: string
  eyebrow: string // texto pequeño encima del título, ej. "03 · Proyectos"
  title: string
  intro?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.header
        variants={stagger(0.1)}
        {...inView}
        className="text-halo mb-8 flex flex-col gap-3 px-2 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <motion.p variants={fadeUp} className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
            {eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp} id={`${id}-title`} className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {title}
          </motion.h2>
        </div>
        {intro && (
          <motion.p variants={fadeUp} className="max-w-sm text-sm text-muted text-pretty md:text-right">
            {intro}
          </motion.p>
        )}
      </motion.header>
      {children}
    </section>
  )
}
