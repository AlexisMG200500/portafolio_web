import type { ReactNode } from 'react'
import { TechIcon } from '../TechIcon'

/**
 * Etiqueta pequeña de tecnología, con su logo.
 * El logo está en gris y toma el color de la marca al pasar el ratón.
 */
export function TechBadge({ name }: { name: string }) {
  return (
    <span className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-muted/40 hover:text-fg">
      <TechIcon name={name} size={12} />
      {name}
    </span>
  )
}

/** Badge con punto verde animado: "Disponible para trabajar". */
export function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1 text-xs text-muted backdrop-blur">
      <span className="relative flex size-2">
        {/* motion-safe: el pulso solo se ve si el usuario no pidió menos movimiento */}
        <span className="absolute inline-flex size-full rounded-full bg-accent-2 opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-accent-2" />
      </span>
      {children}
    </span>
  )
}
