import { motion } from 'motion/react'
import { CopyEmailButton } from '../components/CopyEmailButton'
import { GlowOrbs } from '../components/GlowOrbs'
import { GithubIcon, LinkedinIcon, MailIcon } from '../components/icons'
import { ButtonLink } from '../components/ui/Button'
import { profile } from '../data/profile'
import { fadeUp, inView, stagger } from '../lib/motion'

/*
 * Bloque de contacto directo (sin backend).
 * 👉 ¿Quieres un formulario? Lo más sencillo es Formspree o Netlify Forms:
 *    un <form action="https://formspree.io/f/TU_ID" method="POST"> basta.
 */
export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        variants={stagger(0.1)}
        {...inView}
        className="relative isolate overflow-hidden rounded-3xl border border-line bg-card px-6 py-14 text-center sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 -translate-x-1/2 opacity-25 blur-2xl" aria-hidden>
          <GlowOrbs scale={2.2} />
        </div>

        <motion.p variants={fadeUp} className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
          05 · Contacto
        </motion.p>
        <motion.h2 variants={fadeUp} id="contacto-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          ¿Construimos algo juntos?
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-md text-muted text-pretty">
          Estoy abierto a ofertas de trabajo y colaboraciones. Escríbeme y te respondo pronto.
        </motion.p>

        <motion.p variants={fadeUp} className="mt-8 font-mono text-base break-all sm:text-lg">
          {profile.email}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href={`mailto:${profile.email}`}>
            <MailIcon width={16} height={16} /> Escribirme
          </ButtonLink>
          <CopyEmailButton email={profile.email} />
        </motion.div>

        <motion.ul variants={fadeUp} className="mt-8 flex justify-center gap-1">
          <li>
            <ButtonLink href={profile.links.github} variant="ghost" aria-label="GitHub" size="icon">
              <GithubIcon />
            </ButtonLink>
          </li>
          <li>
            <ButtonLink href={profile.links.linkedin} variant="ghost" aria-label="LinkedIn" size="icon">
              <LinkedinIcon />
            </ButtonLink>
          </li>
        </motion.ul>
      </motion.div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Hecho con React, Tailwind CSS, Motion y Thinking Orbs.</p>
      </footer>
    </section>
  )
}
