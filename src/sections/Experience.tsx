import { motion } from 'motion/react'
import { ArrowUpRightIcon } from '../components/icons'
import { Section } from '../components/Section'
import { TechIcon } from '../components/TechIcon'
import { Tile, TileLabel } from '../components/Tile'
import { TechBadge } from '../components/ui/Badge'
import { education, experience, type Job } from '../data/profile'
import { inView, stagger } from '../lib/motion'

/*
 *   ┌──────────────────────┬──────────┐
 *   │  trabajo actual      │          │
 *   ├──────────────────────┤ formación│
 *   │  trabajo anterior    │          │
 *   ├──────────────────────┼──────────┤
 *   │  trabajo anterior    │ ¿tu      │
 *   │                      │ equipo?  │
 *   └──────────────────────┴──────────┘
 */
function JobTile({ job, current }: { job: Job; current: boolean }) {
  return (
    <Tile className="p-7 md:col-span-2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <TileLabel>{job.period}</TileLabel>
            {current && (
              <span className="rounded-full bg-accent-2/15 px-2 py-0.5 font-mono text-[10px] text-accent-2 uppercase">Actual</span>
            )}
          </div>
          <h3 className="text-xl font-semibold tracking-tight">{job.company}</h3>
          <p className="text-sm text-accent">
            {job.role}
            {job.location && <span className="text-muted"> · {job.location}</span>}
          </p>
          {job.previousRole && (
            <p className="mt-1 font-mono text-[11px] text-muted">
              Antes: {job.previousRole} <span className="text-accent-2">→ ascendido</span>
            </p>
          )}
        </div>
        {/* Logos grandes del stack, en fila */}
        <div className="flex gap-2" aria-hidden>
          {job.stack.slice(0, 4).map((t) => (
            <span key={t} className="grid size-10 place-items-center rounded-xl border border-line bg-bg">
              <TechIcon name={t} size={20} colored />
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-muted">
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
    </Tile>
  )
}

export function Experience() {
  const [currentJob, ...pastJobs] = experience

  return (
    <Section
      id="experiencia"
      eyebrow="02 · Experiencia"
      title="Dónde he trabajado."
      intro="Sistemas reales, usados a diario por empresas e instituciones."
    >
      <motion.div variants={stagger(0.1)} {...inView} className="grid gap-4 md:grid-cols-3">
        <JobTile job={currentJob} current />

        {/* Formación: ocupa dos filas junto a los dos primeros trabajos */}
        <Tile className="flex flex-col gap-6 p-6 md:row-span-2">
          <TileLabel>Formación</TileLabel>
          <ol className="relative space-y-6 border-l border-line pl-5">
            {education.map((ed) => (
              <li key={ed.degree} className="relative">
                <span className="absolute top-1.5 -left-[25px] size-2 rounded-full bg-accent ring-4 ring-card" aria-hidden />
                <p className="font-mono text-[11px] text-accent">{ed.period}</p>
                <p className="mt-1 font-semibold leading-snug">{ed.degree}</p>
                <p className="mt-1 text-sm text-muted">{ed.school}</p>
              </li>
            ))}
          </ol>
        </Tile>

        {pastJobs.map((job) => (
          <JobTile key={job.company} job={job} current={false} />
        ))}

        {/* Llamada a la acción: el siguiente puesto */}
        <Tile className="border-dashed p-0">
          <a href="#contacto" className="group flex h-full flex-col justify-between gap-6 p-6">
            <TileLabel>Siguiente paso</TileLabel>
            <div>
              <p className="text-xl font-semibold tracking-tight">¿Tu equipo?</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-accent">
                Hablemos
                <ArrowUpRightIcon width={14} height={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </div>
          </a>
        </Tile>
      </motion.div>
    </Section>
  )
}
