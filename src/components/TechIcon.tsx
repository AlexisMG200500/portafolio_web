/*
 * ─── LOGOS DE TECNOLOGÍAS ──────────────────────────────────────────────────
 * Usa Simple Icons (licencia CC0): `npm install simple-icons`.
 * Cada icono trae su `path` SVG y su color de marca (`hex`).
 *
 * Importamos SOLO los iconos que usamos (no todo el paquete), para que el
 * bundle siga siendo ligero.
 *
 * 👉 Para añadir una tecnología:
 *   1. Busca su nombre en https://simpleicons.org (ej. "Vue.js" → siVuedotjs)
 *   2. Impórtala abajo y añádela a ICONS con el MISMO texto que usas en profile.ts
 *   Si una tecnología no tiene logo, se muestra un icono genérico.
 */
import type { CSSProperties } from 'react'
import {
  siBootstrap,
  siCss,
  siDocker,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siNginx,
  siPhp,
  siReact,
  siTailwindcss,
  siTypescript,
  siAngular,
} from 'simple-icons'

type Logo = { path: string; hex: string }

const ICONS: Record<string, Logo> = {
  PHP: siPhp,
  Laravel: siLaravel,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  // El logo nuevo de Angular es casi negro; usamos su rojo clásico para que se vea en oscuro
  Angular: { ...siAngular, hex: 'DD0031' },
  React: siReact,
  MySQL: siMysql,
  HTML: siHtml5,
  CSS: siCss,
  Bootstrap: siBootstrap,
  'Tailwind CSS': siTailwindcss,
  Git: siGit,
  GitHub: { ...siGithub, hex: '' }, // negro: mejor usar el color del texto
  Docker: siDocker,
  Nginx: siNginx,
}

/*
 * Iconos genéricos (trazo) para tecnologías sin logo en Simple Icons.
 * SQL Server no está (Microsoft pidió retirar sus marcas) y Motion tampoco.
 */
const FALLBACKS: Record<string, string> = {
  // cilindro de base de datos
  'SQL Server':
    'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Zm8 3v12c0 1.7-3.6 3-8 3s-8-1.3-8-3V6m16 6c0 1.7-3.6 3-8 3s-8-1.3-8-3',
  // curva de animación
  Motion: 'M3 18c4 0 5-12 9-12s5 12 9 12',
}

type TechIconProps = {
  name: string
  size?: number
  /** true = siempre a color; false = gris que se colorea al pasar el ratón (con `group`) */
  colored?: boolean
}

export function TechIcon({ name, size = 14, colored = false }: TechIconProps) {
  const logo = ICONS[name]
  const common = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, className: 'shrink-0' }

  if (logo) {
    const brand = logo.hex ? `#${logo.hex}` : 'var(--fg)'
    // La variable --brand permite colorearlo solo en hover (ver clase abajo)
    const style = { '--brand': brand } as CSSProperties
    return (
      <span
        style={style}
        className={`inline-flex transition-colors duration-300 ${
          colored ? 'text-[var(--brand)]' : 'text-muted group-hover:text-[var(--brand)]'
        }`}
      >
        <svg {...common} fill="currentColor">
          <path d={logo.path} />
        </svg>
      </span>
    )
  }

  const fallback = FALLBACKS[name]
  if (!fallback) return null
  return (
    <span className={`inline-flex ${colored ? 'text-accent' : 'text-muted group-hover:text-accent'} transition-colors`}>
      <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={fallback} />
      </svg>
    </span>
  )
}
