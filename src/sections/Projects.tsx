import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { ArrowUpRightIcon, CodeIcon } from '../components/icons'
import { Section } from '../components/Section'
import { TechIcon } from '../components/TechIcon'
import { TiltCard } from '../components/TiltCard'
import { TechBadge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { projects } from '../data/profile'
import { ease, fadeUp, inView, spring } from '../lib/motion'

const FILTERS = ['Todos', ...new Set(projects.map((p) => p.stack[0]))]

export function Projects() {
  const [filter, setFilter] = useState('Todos')
  const visible = filter === 'Todos' ? projects : projects.filter((p) => p.stack.includes(filter))

  return (
    <Section id="proyectos" eyebrow="03 · Proyectos" title="Cosas que he construido." intro="Del CRUD universitario a plataformas en producción.">
      <motion.div variants={fadeUp} {...inView}>
        <div role="group" aria-label="Filtrar proyectos por tecnología" className="mb-6 flex flex-wrap gap-2 px-2">
          {FILTERS.map((f) => {
            const selected = filter === f
            return (
              <button
                key={f}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f)}
                className={`relative isolate flex h-9 items-center gap-2 rounded-full border px-4 text-sm backdrop-blur transition-colors ${
                  selected ? 'border-transparent text-bg' : 'border-line bg-card/50 text-muted hover:text-fg'
                }`}
              >
                {selected && <motion.span layoutId="filter-pill" transition={spring} className="absolute inset-0 -z-10 rounded-full bg-fg" />}
                {f !== 'Todos' && <TechIcon name={f} size={14} colored />}
                {f}
              </button>
            )
          })}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => {
              const number = projects.indexOf(p) + 1
              return (
                <TiltCard
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex flex-col"
                >
                  <div className="relative flex h-36 items-center justify-center gap-3 border-b border-line bg-bg/40" aria-hidden>
                    <span className="absolute top-4 left-5 font-mono text-xs text-muted">{String(number).padStart(2, '0')}</span>
                    {p.stack.slice(0, 3).map((t, i) => (
                      <span
                        key={t}
                        className="grid size-14 place-items-center rounded-2xl border border-line bg-card shadow-lg transition-transform duration-500 group-hover/tilt:-translate-y-1"
                        style={{ rotate: `${(i - 1) * 6}deg`, transitionDelay: `${i * 50}ms` }}
                      >
                        <TechIcon name={t} size={28} colored />
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-sm text-fg/90">{p.description}</p>
                    {p.detail && <p className="mt-2 text-sm text-muted">{p.detail}</p>}

                    <ul className="mt-5 mb-6 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                      {p.stack.map((tech) => (
                        <li key={tech}>
                          <TechBadge name={tech} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {p.demo && (
                        <ButtonLink href={p.demo} size="sm">
                          Demo <ArrowUpRightIcon width={14} height={14} />
                          <span className="sr-only"> de {p.title}</span>
                        </ButtonLink>
                      )}
                      {p.repo && (
                        <ButtonLink href={p.repo} variant="secondary" size="sm">
                          <CodeIcon width={14} height={14} /> Código
                          <span className="sr-only"> de {p.title}</span>
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                </TiltCard>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Section>
  )
}
