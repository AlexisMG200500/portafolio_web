import { motion } from 'motion/react'
import { CheckIcon } from '../components/icons'
import { Section } from '../components/Section'
import { StatusBadge } from '../components/ui/Badge'
import { about, profile } from '../data/profile'
import { fadeUp, inView, stagger } from '../lib/motion'

export function About() {
  const years = new Date().getFullYear() - about.devSince

  return (
    <Section id="sobre-mi" eyebrow="01 · Sobre mí" title={about.title} fill>
      <motion.div
        variants={stagger(0.1)}
        {...inView}
        className="grid items-center gap-12 px-2 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-10 lg:gap-16"
      >
        <div className="text-halo flex min-w-0 flex-col gap-6">
          <motion.p variants={fadeUp} className="text-2xl leading-snug font-medium tracking-tight text-balance lg:text-[1.75rem]">
            {about.statement}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-3 text-base leading-relaxed text-fg/90 lg:text-lg">
            {about.story.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Cómo trabajo</p>
            <ul className="flex flex-wrap gap-2">
              {about.howIWork.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-line bg-card/80 py-1.5 pr-4 pl-2 text-sm backdrop-blur"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-fg">
                    <CheckIcon width={12} height={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.blockquote variants={fadeUp} className="flex flex-col gap-2 border-l-2 border-accent pl-5">
            <p className="font-mono text-[11px] tracking-widest text-accent uppercase">Qué busco</p>
            <p className="text-lg leading-snug font-medium text-pretty">“{about.lookingFor}”</p>
          </motion.blockquote>
        </div>

        <motion.figure
          variants={fadeUp}
          className="relative order-first mx-auto w-full max-w-sm md:order-last md:w-auto md:max-w-none md:justify-self-center"
        >
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent to-accent-2 opacity-30 blur-2xl"
          />
          <img
            src="/images/alexis.webp"
            alt={`Foto de ${profile.name}`}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-[2rem] border border-line object-cover shadow-2xl md:h-[min(62svh,540px)] md:w-auto"
          />

          {profile.available && (
            <div className="absolute top-4 right-4">
              <StatusBadge>Disponible</StatusBadge>
            </div>
          )}

          <figcaption className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-xl sm:-left-6">
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
              {years}
            </span>
            <span className="text-xs leading-tight text-muted">
              años de
              <br />
              experiencia
            </span>
          </figcaption>
        </motion.figure>
      </motion.div>
    </Section>
  )
}
