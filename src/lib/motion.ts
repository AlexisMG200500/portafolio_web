import type { Transition, Variants } from 'motion/react'


export const ease = [0.22, 1, 0.36, 1] as const

export const spring: Transition = { type: 'spring', stiffness: 400, damping: 28 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export const wordUp: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const inView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
} as const
