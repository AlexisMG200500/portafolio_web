import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { ArrowUpRightIcon, CodeIcon } from '../components/icons'
import { Section } from '../components/Section'
import { TechIcon } from '../components/TechIcon'
import { TiltCard } from '../components/TiltCard'
import { TechBadge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { projects } from '../data/profile'
import { ease, fadeUp, inView, spring } from '../lib/motion'

const FILTERS = ['Todos', ...new Set(projects.map((p) => p.stack[0]))]

function SlideCounter({ track, total }: { track: RefObject<HTMLDivElement | null>; total: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null
      if (!first) return
      const step = first.offsetWidth + 16
      setIndex(Math.min(total - 1, Math.round(el.scrollLeft / step)))
    }
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [track, total])

  return (
    <div className="mt-4 flex items-center justify-between gap-4 px-2 md:hidden" aria-hidden>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-accent' : 'w-1.5 bg-line'}`}
          />
        ))}
      </div>
      <span className="font-mono text-xs text-muted tabular-nums">
        {index + 1} / {total} · desliza →
      </span>
    </div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState('Todos')
  const visible = filter === 'Todos' ? projects : projects.filter((p) => p.stack.includes(filter))
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    track.current?.scrollTo({ left: 0 })
  }, [filter])

  return (
    <Section id="proyectos" eyebrow="03 · Proyectos" title="Cosas que he construido." intro="Del CRUD universitario a plataformas en producción.">
      <motion.div variants={fadeUp} {...inView}>
        <div role="group" aria-label="Filtrar proyectos por tecnología" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-2 [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((f) => {
            const selected = filter === f
            return (
              <button
                key={f}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f)}
                className={`relative isolate flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm backdrop-blur transition-colors ${
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

        <motion.div
          ref={track}
          layout
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
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
                  className="flex w-[86%] shrink-0 snap-start flex-col sm:w-[60%] md:w-auto"
                >
                  <div className="relative flex h-28 md:h-36 items-center justify-center gap-3 border-b border-line bg-bg/40" aria-hidden>
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
                    {p.detail && <p className="mt-2 text-sm text-fg/75">{p.detail}</p>}

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
        <SlideCounter key={filter} track={track} total={visible.length} />
      </motion.div>
    </Section>
  )
}
