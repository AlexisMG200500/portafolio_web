import { motion } from 'motion/react'
import { CheckIcon } from '../components/icons'
import { Section } from '../components/Section'
import { about, education } from '../data/profile'
import { fadeUp, inView, stagger } from '../lib/motion'

export function About() {
  return (
    <Section id="sobre-mi" eyebrow="01 · Sobre mí" title={about.title}>
      <div className="grid gap-6 md:grid-cols-5">
        {/* Historia + qué busco */}
        <motion.div variants={stagger(0.12)} {...inView} className="space-y-4 text-muted md:col-span-3">
          {about.story.map((p, i) => (
            <motion.p key={i} variants={fadeUp} className="leading-relaxed text-pretty">
              {p}
            </motion.p>
          ))}
          <motion.div variants={fadeUp} className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
            <p className="mb-1 text-sm font-medium text-fg">Qué busco</p>
            <p className="text-sm leading-relaxed">{about.lookingFor}</p>
          </motion.div>
        </motion.div>

        {/* Formación + cómo trabajo */}
        <motion.div variants={stagger(0.12)} {...inView} className="space-y-6 md:col-span-2">
          <motion.div variants={fadeUp} className="rounded-2xl border border-line bg-card p-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">Formación</p>
            <p className="font-medium">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">{education.school}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl border border-line bg-card p-6">
            <h3 className="mb-4 font-medium">Cómo trabajo</h3>
            <ul className="space-y-3">
              {about.howIWork.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-2/15 text-accent-2">
                    <CheckIcon width={12} height={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
