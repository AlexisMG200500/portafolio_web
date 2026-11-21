/*
 * ─── CONTACTO ──────────────────────────────────────────────────────────────
 * Centrado, sobre la esfera 3D que vuelve al centro de la pantalla.
 * Correo grande + copiar, y un panel de cristal con el resto de canales.
 * 👉 ¿Quieres un formulario? Lo más sencillo es Formspree o Netlify Forms:
 *    un <form action="https://formspree.io/f/TU_ID" method="POST"> basta.
 */
import { motion } from 'motion/react'
import { CopyEmailButton } from '../components/CopyEmailButton'
import { ArrowUpRightIcon, MailIcon } from '../components/icons'
import { ButtonLink } from '../components/ui/Button'
import { profile } from '../data/profile'
import { fadeUp, inView, stagger } from '../lib/motion'

export function Contact() {
  const channels = [
    { label: 'WhatsApp', detail: profile.phoneDisplay, href: profile.links.whatsapp, icon: '/icons/social/whatsapp.svg' },
    { label: 'LinkedIn', detail: 'Conectemos', href: profile.links.linkedin, icon: '/icons/social/linkedin.svg' },
    { label: 'GitHub', detail: `@${profile.links.github.split('/').pop()}`, href: profile.links.github, icon: '/icons/social/github.svg' },
    { label: 'Currículum', detail: 'Google Drive', href: profile.links.cv, icon: '/icons/social/cv.svg' },
  ]

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative px-5 pt-24 pb-10 sm:pt-32">
      {/* Halo para que el texto se lea sobre la esfera */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_35%_at_50%_35%,var(--bg)_0%,transparent_100%)] opacity-70" aria-hidden />

      <motion.div variants={stagger(0.08)} {...inView} className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p variants={fadeUp} className="text-halo mb-3 font-mono text-xs tracking-widest text-accent uppercase">
          05 · Contacto
        </motion.p>
        <motion.h2 variants={fadeUp} id="contacto-title" className="text-halo text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          ¿Construimos algo <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">juntos?</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-halo mt-5 max-w-md text-fg/80 text-pretty">
          Estoy abierto a ofertas de trabajo y colaboraciones. Escríbeme por donde prefieras.
        </motion.p>

        <motion.a
          variants={fadeUp}
          href={`mailto:${profile.email}`}
          className="text-halo mt-8 font-mono text-base break-all underline decoration-line decoration-1 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-lg"
        >
          {profile.email}
        </motion.a>
        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href={`mailto:${profile.email}`}>
            <MailIcon width={16} height={16} /> Escribirme
          </ButtonLink>
          <CopyEmailButton email={profile.email} />
        </motion.div>

        {/* Panel de canales */}
        <motion.ul variants={fadeUp} className="mt-12 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ label, detail, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-line bg-card/70 p-4 text-left backdrop-blur-md transition-colors hover:border-accent/40"
              >
                <img src={icon} alt="" width={40} height={40} className="shrink-0 rounded-[11px]" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block truncate text-xs text-muted">{detail}</span>
                </span>
                <ArrowUpRightIcon width={16} height={16} className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <footer className="mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Hecho con React, Tailwind CSS, Motion, Three.js y Thinking Orbs.</p>
      </footer>
    </section>
  )
}
