import { motion } from 'motion/react'
import { ProjectCard } from '../components/ProjectCard'
import { Section } from '../components/Section'
import { projects } from '../data/profile'
import { inView, stagger } from '../lib/motion'

export function Projects() {
  return (
    <Section
      id="proyectos"
      eyebrow="03 · Proyectos"
      title="Cosas que he construido."
      intro="Del CRUD universitario a plataformas en producción."
    >
      {/* Las tarjetas entran en cascada (stagger) al hacer scroll */}
      <motion.div variants={stagger(0.1)} {...inView} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>
    </Section>
  )
}
