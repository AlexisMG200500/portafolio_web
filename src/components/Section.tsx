/*
 * Envoltorio común para todas las secciones:
 * - da el mismo ancho, espaciado y encabezado a cada una
 * - anima el encabezado al entrar en vista (una sola vez)
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
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <motion.header variants={stagger(0.1)} {...inView} className="mb-12 max-w-2xl">
        <motion.p variants={fadeUp} className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </motion.p>
        <motion.h2 variants={fadeUp} id={`${id}-title`} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </motion.h2>
        {intro && (
          <motion.p variants={fadeUp} className="mt-4 text-muted text-pretty">
            {intro}
          </motion.p>
        )}
      </motion.header>
      {children}
    </section>
  )
}
