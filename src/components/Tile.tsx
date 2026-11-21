/*
 * ─── TILE (bloque del diseño bento) ────────────────────────────────────────
 * Es la pieza base de todo el sitio: una tarjeta redondeada con un brillo
 * que sigue al cursor (estilo "spotlight card" de 21st.dev).
 *
 * - Por defecto entra con la animación `fadeUp` del contenedor padre.
 *   Pasa reveal={false} si quieres controlar tú la animación (ej. Proyectos).
 * - Usa className para darle tamaño en la cuadrícula: "md:col-span-2", etc.
 *
 * Truco de rendimiento: la posición del ratón se guarda en variables CSS
 * (--x, --y) directamente en el elemento, SIN useState, así React no
 * vuelve a renderizar en cada movimiento del ratón.
 */
import { motion, type HTMLMotionProps } from 'motion/react'
import type { MouseEvent, ReactNode } from 'react'
import { fadeUp } from '../lib/motion'

type TileProps = Omit<HTMLMotionProps<'div'>, 'children'> & { reveal?: boolean; children?: ReactNode }

export function Tile({ reveal = true, className = '', children, onMouseMove, ...props }: TileProps) {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
    onMouseMove?.(e)
  }

  return (
    <motion.div
      variants={reveal ? fadeUp : undefined}
      onMouseMove={handleMove}
      className={`group/tile relative isolate overflow-hidden rounded-3xl border border-line bg-card transition-colors hover:border-muted/30 ${className}`}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
        style={{
          background:
            'radial-gradient(380px circle at var(--x) var(--y), color-mix(in oklab, var(--accent) 13%, transparent), transparent 60%)',
        }}
      />
      {children}
    </motion.div>
  )
}

/** Etiqueta pequeña en mayúsculas que encabeza cada bloque. */
export function TileLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] tracking-widest text-muted uppercase">{children}</p>
}
