import { motion } from 'motion/react'
import { Section } from '../components/Section'
import { TechIcon } from '../components/TechIcon'
import { skills } from '../data/profile'
import { fadeUp, inView, spring, stagger } from '../lib/motion'

const totalTech = skills.reduce((n, g) => n + g.items.length, 0)

export function Skills() {
  return (
    <Section
      id="habilidades"
      eyebrow="04 · Habilidades"
      title="Mis herramientas de trabajo."
      intro={`${totalTech} tecnologías en ${skills.length} áreas, del backend a la nube y la IA.`}
    >
      <motion.div variants={stagger(0.07)} {...inView} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <motion.div key={group.category} variants={fadeUp} className="rounded-3xl border border-line bg-card/70 p-5 backdrop-blur-md">
            <div className="mb-4 flex items-baseline justify-between gap-2">
              <h3 className="font-mono text-[11px] tracking-widest text-muted uppercase">{group.category}</h3>
              <span className="font-mono text-xs text-accent">{String(group.items.length).padStart(2, '0')}</span>
            </div>
            <motion.ul variants={stagger(0.04)} className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <motion.li
                  key={skill}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={spring}
                  className="flex items-center gap-2 rounded-full border border-line bg-bg/60 py-1.5 pr-3 pl-2 text-sm transition-colors hover:border-accent/50"
                >
                  <TechIcon name={skill} size={16} colored />
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
