/*
 * ─── TARJETA DE PROYECTO ───────────────────────────────────────────────────
 * Estilo inspirado en las "spotlight cards" de 21st.dev:
 * un brillo suave sigue al cursor por encima de la tarjeta.
 *
 * Truco de rendimiento: la posición del ratón se guarda en variables CSS
 * (--x, --y) directamente en el elemento, SIN useState. Así React no vuelve
 * a renderizar en cada movimiento del ratón.
 */
import { motion } from 'motion/react'
import type { MouseEvent } from 'react'
import type { Project } from '../data/profile'
import { fadeUp, spring } from '../lib/motion'
import { ArrowUpRightIcon, CodeIcon } from './icons'
import { TechBadge } from './ui/Badge'
import { ButtonLink } from './ui/Button'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={spring}
      onMouseMove={handleMove}
      className="group/card relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card p-6"
    >
      {/* Capa de brillo que sigue al cursor (solo visible en hover) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--x) var(--y), color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%)',
        }}
      />

      <div className="relative flex flex-1 flex-col">
        <p className="mb-1 font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="mb-3 text-xl font-semibold tracking-tight">{project.title}</h3>
        <p className="text-sm text-fg/90">{project.description}</p>
        {project.detail && <p className="mt-2 text-sm text-muted">{project.detail}</p>}

        <ul className="mt-5 mb-6 flex flex-wrap gap-1.5" aria-label="Tecnologías">
          {project.stack.map((tech) => (
            <li key={tech}>
              <TechBadge name={tech} />
            </li>
          ))}
        </ul>

        {/* mt-auto empuja los botones al fondo para que todas las tarjetas se alineen */}
        <div className="mt-auto flex flex-wrap gap-2">
          {project.demo && (
            <ButtonLink href={project.demo} size="sm">
              Demo <ArrowUpRightIcon width={14} height={14} />
              <span className="sr-only"> de {project.title}</span>
            </ButtonLink>
          )}
          {project.repo && (
            <ButtonLink href={project.repo} variant="secondary" size="sm">
              <CodeIcon width={14} height={14} /> Código
              <span className="sr-only"> de {project.title}</span>
            </ButtonLink>
          )}
        </div>
      </div>
    </motion.article>
  )
}
