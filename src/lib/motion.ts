import type { Transition, Variants } from 'motion/react'

/*
 * ─── ANIMACIONES COMPARTIDAS (Motion) ──────────────────────────────────────
 * Centralizar las variantes aquí mantiene el sitio coherente.
 * Regla de oro de rendimiento: anima solo `opacity` y `transform`
 * (x, y, scale, rotate…). No animes width/height/top/left.
 */

/** Curva suave tipo "ease-out" (arranca rápido y frena suave). */
export const ease = [0.22, 1, 0.36, 1] as const

export const spring: Transition = { type: 'spring', stiffness: 400, damping: 28 }

/** Aparece subiendo un poco. Úsalo con initial="hidden" y whileInView="show". */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

/**
 * Palabra que sube desde detrás de una "máscara" (efecto titular de revista).
 * El padre debe tener overflow-hidden para que no se vea antes de subir.
 */
export const wordUp: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease } },
}

/** Contenedor que anima a sus hijos uno detrás de otro (efecto cascada). */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Props listas para "animar al entrar en vista, una sola vez". */
export const inView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
} as const
