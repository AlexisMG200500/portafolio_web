/*
 * ─── PORTADA ───────────────────────────────────────────────────────────────
 * Pantalla completa con tu nombre gigante ENCIMA de la escena 3D
 * (Scene3D.tsx, que está fija detrás de toda la página).
 * El nombre aparece palabra por palabra desde detrás de una "máscara".
 * Su animación arranca cuando `ready` es true (cuando se va el loader).
 */
import { motion } from 'motion/react'
import { ArrowDownIcon } from '../components/icons'
import { TechIcon } from '../components/TechIcon'
import { StatusBadge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { mainStack, profile } from '../data/profile'
import { fadeUp, stagger, wordUp } from '../lib/motion'

export function Hero({ ready }: { ready: boolean }) {
  // Logos estilo go-skill-icons (public/icons/social/)
  const socials = [
    { href: profile.links.github, label: 'GitHub', icon: '/icons/social/github.svg' },
    { href: profile.links.linkedin, label: 'LinkedIn', icon: '/icons/social/linkedin.svg' },
    { href: profile.links.whatsapp, label: 'WhatsApp', icon: '/icons/social/whatsapp.svg' },
    { href: `mailto:${profile.email}`, label: 'Correo', icon: '/icons/social/gmail.svg' },
    { href: profile.links.cv, label: 'Currículum (CV)', icon: '/icons/social/cv.svg' },
  ]
  const words = profile.name.split(' ')

  return (
    <section id="inicio" className="relative flex min-h-svh flex-col items-center justify-center px-5 pt-20 pb-24 text-center">
      {/* Halo suave detrás del texto para que se lea bien sobre las partículas */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_38%_at_50%_50%,var(--bg)_30%,transparent_100%)] opacity-85" aria-hidden />

      <motion.div variants={stagger(0.1, 0.1)} initial="hidden" animate={ready ? 'show' : 'hidden'} className="flex flex-col items-center">
        {profile.available && (
          <motion.div variants={fadeUp} className="mb-8">
            <StatusBadge>Disponible para trabajar · {profile.location}</StatusBadge>
          </motion.div>
        )}

        <h1 className="text-halo text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[1] font-semibold tracking-tight">
          <span className="sr-only">{profile.name}</span>
          <motion.span variants={stagger(0.08)} aria-hidden className="flex flex-wrap justify-center gap-x-[0.22em]">
            {words.map((w, i) => (
              // pb/-mb: deja sitio a las letras con rabito (g, j…) dentro de la máscara
              <span key={w} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em]">
                <motion.span
                  variants={wordUp}
                  className={`inline-block ${i === words.length - 1 ? 'bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent' : ''}`}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h1>

        <motion.p variants={fadeUp} className="text-halo mt-5 font-mono text-xs tracking-[0.25em] text-fg/80 uppercase sm:text-sm">
          {profile.role}
        </motion.p>
        <motion.p variants={fadeUp} className="text-halo mt-5 max-w-xl text-base text-fg/85 text-pretty sm:text-lg">
          {profile.tagline}
        </motion.p>

        <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Stack principal">
          {mainStack.map((t) => (
            <li key={t} title={t} className="grid size-10 place-items-center rounded-xl border border-line bg-card/70 backdrop-blur">
              <TechIcon name={t} size={20} colored />
              <span className="sr-only">{t}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="#proyectos">
            Ver proyectos <ArrowDownIcon width={16} height={16} />
          </ButtonLink>
          <ButtonLink href="#contacto" variant="secondary" className="backdrop-blur">
            Contactar
          </ButtonLink>
        </motion.div>

        <motion.ul variants={fadeUp} className="mt-7 flex gap-3">
          {socials.map(({ href, label, icon }) => (
            <li key={label}>
              <ButtonLink href={href} variant="ghost" size="icon" aria-label={label} title={label} className="hover:bg-transparent">
                <img src={icon} alt="" width={36} height={36} className="rounded-[10px] shadow-lg" />
              </ButtonLink>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Indicador de scroll: ratón con un punto que baja */}
      <motion.a
        href="#sobre-mi"
        aria-label="Bajar a Sobre mí"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 flex h-10 w-6 justify-center rounded-full border-2 border-line pt-2"
      >
        <motion.span
          className="size-1.5 rounded-full bg-accent"
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.a>
    </section>
  )
}
