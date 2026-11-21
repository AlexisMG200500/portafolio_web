import { motion } from 'motion/react'
import { Section } from '../components/Section'
import { TechBadge } from '../components/ui/Badge'
import { experience } from '../data/profile'
import { fadeUp, inView, spring, stagger } from '../lib/motion'

/*
 * Experiencia como línea de tiempo vertical:
 * una línea a la izquierda con un punto por trabajo, y una tarjeta por puesto.
 */
export function Experience() {
  return (
    <Section
      id="experiencia"
      eyebrow="02 · Experiencia"
      title="Dónde he trabajado."
      intro="Sistemas reales, usados a diario por empresas e instituciones."
    >
      <motion.ol variants={stagger(0.15)} {...inView} className="relative space-y-6 border-l border-line pl-6 sm:pl-8">
        {experience.map((job, i) => (
          <motion.li key={job.company} variants={fadeUp} className="relative">
            {/* Punto de la línea de tiempo (el primero, el más reciente, en color) */}
            <span
              aria-hidden
              className={`absolute top-7 -left-[calc(1.5rem+5px)] size-2.5 rounded-full ring-4 ring-bg sm:-left-[calc(2rem+5px)] ${
                i === 0 ? 'bg-accent' : 'bg-line'
              }`}
            />

            <motion.article
              whileHover={{ y: -3 }}
              transition={spring}
              className="rounded-2xl border border-line bg-card p-6 transition-colors hover:border-muted/40"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">{job.company}</h3>
                <p className="font-mono text-xs text-muted">{job.period}</p>
              </div>
              <p className="mt-1 text-sm text-accent">
                {job.role}
                {job.location && <span className="text-muted"> · {job.location}</span>}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-2" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                {job.stack.map((tech) => (
                  <li key={tech}>
                    <TechBadge name={tech} />
                  </li>
                ))}
              </ul>
            </motion.article>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  )
}
