import { motion } from 'motion/react'
import { Section } from '../components/Section'
import { TechIcon } from '../components/TechIcon'
import { skills } from '../data/profile'
import { fadeUp, inView, spring, stagger } from '../lib/motion'

export function Skills() {
  return (
    <Section id="habilidades" eyebrow="04 · Habilidades" title="Mis herramientas de trabajo.">
      <motion.div variants={stagger(0.1)} {...inView} className="grid gap-5 sm:grid-cols-2">
        {skills.map((group) => (
          <motion.div key={group.category} variants={fadeUp} className="rounded-2xl border border-line bg-card p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                // Cada habilidad lleva su logo a color; al pasar el ratón sube un poco
                <motion.li
                  key={skill}
                  whileHover={{ y: -2 }}
                  transition={spring}
                  className="flex items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2 text-sm transition-colors hover:border-accent/50"
                >
                  <TechIcon name={skill} size={16} colored />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
