import { motion } from 'motion/react'
import { GlowOrbs } from '../components/GlowOrbs'
import { ArrowDownIcon, ArrowUpRightIcon, GithubIcon, LinkedinIcon, MailIcon } from '../components/icons'
import { StatusBadge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { profile } from '../data/profile'
import { fadeUp, stagger } from '../lib/motion'

/*
 * El Hero NO usa whileInView: está visible desde el inicio, así que su
 * animación arranca cuando `ready` es true (cuando se va el loader).
 */
export function Hero({ ready }: { ready: boolean }) {
  const socials = [
    { href: profile.links.github, label: 'GitHub', icon: GithubIcon },
    { href: profile.links.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
    { href: `mailto:${profile.email}`, label: 'Correo', icon: MailIcon },
  ]

  return (
    <section id="inicio" className="relative isolate flex min-h-svh items-center overflow-hidden">
      {/* Fondo: cuadrícula sutil + orbes grandes y desenfocados */}
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-2xl sm:left-[75%]">
        <GlowOrbs scale={3} />
      </div>

      <motion.div
        variants={stagger(0.1, 0.15)}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        className="mx-auto w-full max-w-5xl px-5 pt-28 pb-16 sm:px-8"
      >
        {profile.available && (
          <motion.div variants={fadeUp} className="mb-6">
            <StatusBadge>Disponible para trabajar · {profile.location}</StatusBadge>
          </motion.div>
        )}

        <motion.h1
          variants={fadeUp}
          className="text-[clamp(2rem,8.5vw,4.5rem)] leading-[1.05] font-semibold tracking-tighter text-balance"
        >
          Hola, soy {profile.name.split(' ')[0]}.
          <br />
          <span className="bg-gradient-to-r from-accent via-accent-2 to-accent bg-clip-text text-transparent">
            {profile.role}.
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-muted text-pretty">
          {profile.tagline}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href="#proyectos">
            Ver proyectos <ArrowDownIcon width={16} height={16} />
          </ButtonLink>
          <ButtonLink href="#contacto" variant="secondary">
            Contactar
          </ButtonLink>
          <ButtonLink href={profile.links.cv} variant="ghost">
            CV <ArrowUpRightIcon width={14} height={14} />
          </ButtonLink>

          <span className="mx-2 hidden h-6 w-px bg-line sm:block" aria-hidden />

          <ul className="flex items-center gap-1">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <ButtonLink href={href} variant="ghost" aria-label={label} size="icon">
                  <Icon />
                </ButtonLink>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
