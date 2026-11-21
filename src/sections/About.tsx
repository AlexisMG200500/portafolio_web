/*
 * ─── SOBRE MÍ ──────────────────────────────────────────────────────────────
 * El primer párrafo es una "declaración" grande cuyas palabras se iluminan
 * una a una al hacer scroll (useScroll + useTransform de Motion).
 * Solo cambia la opacidad, así que el texto siempre es legible y accesible.
 */
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Section } from '../components/Section'
import { about } from '../data/profile'
import { fadeUp, inView, stagger } from '../lib/motion'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}

function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  // 0 cuando el párrafo entra por abajo · 1 cuando llega a la mitad de la pantalla
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className="text-halo text-xl leading-snug font-medium tracking-tight sm:text-2xl">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

export function About() {
  const [statement, ...rest] = about.story

  return (
    <Section id="sobre-mi" eyebrow="01 · Sobre mí" title={about.title}>
      <div className="px-2">
        <div className="max-w-4xl">
          <ScrollRevealText text={statement} />
        </div>

        <motion.div variants={stagger(0.1)} {...inView} className="mt-14 grid gap-4 md:grid-cols-3">
          {/* Resto de la historia */}
          <motion.div variants={fadeUp} className="space-y-4 leading-relaxed text-muted md:col-span-2">
            {rest.map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
            <blockquote className="mt-6 rounded-2xl border border-accent/30 bg-card/70 p-6 backdrop-blur">
              <p className="mb-2 font-mono text-[11px] tracking-widest text-accent uppercase">Qué busco</p>
              <p className="leading-snug font-medium text-fg text-pretty">“{about.lookingFor}”</p>
            </blockquote>
          </motion.div>

          {/* Cómo trabajo */}
          <motion.div variants={fadeUp} className="rounded-2xl border border-line bg-card/70 p-6 backdrop-blur">
            <p className="mb-5 font-mono text-[11px] tracking-widest text-muted uppercase">Cómo trabajo</p>
            <ol className="space-y-4">
              {about.howIWork.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="bg-gradient-to-b from-accent to-accent-2 bg-clip-text font-mono text-xl leading-none font-medium text-transparent">
                    0{i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
