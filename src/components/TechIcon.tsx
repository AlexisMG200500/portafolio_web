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
  siAxios,
  siBootstrap,
  siClaude,
  siCss,
  siDocker,
  siExpo,
  siExpress,
  siGit,
  siGithub,
  siGooglegemini,
  siGooglecloudstorage,
  siGooglemaps,
  siHtml5,
  siJavascript,
  siLaravel,
  siLeaflet,
  siMysql,
  siNestjs,
  siNginx,
  siNodedotjs,
  siNpm,
  siPhp,
  siPnpm,
  siPostman,
  siPython,
  siFastapi,
  siKubernetes,
  siReact,
  siReactquery,
  siRedis,
  siSwagger,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVercel,
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
  'React Native': siReact, // mismo logo que React
  Express: { ...siExpress, hex: '' }, // negro: mejor usar el color del texto
  Redis: siRedis,
  Expo: { ...siExpo, hex: '' }, // casi negro: usamos el color del texto
  'Node.js': siNodedotjs,
  NestJS: siNestjs,
  Axios: siAxios,
  'React Query': siReactquery,
  'Google Maps': siGooglemaps,
  Leaflet: siLeaflet,
  'Google Cloud Storage': siGooglecloudstorage,
  Vercel: { ...siVercel, hex: '' }, // negro: usamos el color del texto
  Postman: siPostman,
  'Three.js': { ...siThreedotjs, hex: '' }, // negro: usamos el color del texto
  Claude: siClaude,
  Gemini: siGooglegemini,
  Swagger: siSwagger,
  npm: siNpm,
  pnpm: siPnpm,
  MySQL: siMysql,
  HTML: siHtml5,
  CSS: siCss,
  Bootstrap: siBootstrap,
  'Tailwind CSS': siTailwindcss,
  Git: siGit,
  GitHub: { ...siGithub, hex: '' }, // negro: mejor usar el color del texto
  Docker: siDocker,
  Nginx: siNginx,
  Python: siPython,
  FastAPI: siFastapi,
  Kubernetes: siKubernetes,
}

/*
 * Logos a todo color como archivos SVG en public/icons/.
 * SQL Server, Azure y Codex (OpenAI) no están en Simple Icons, así que vienen
 * de go-skill-icons.vercel.app (sin el cuadro de fondo).
 * 👉 Para añadir otro: descarga https://go-skill-icons.vercel.app/api/icons?i=NOMBRE,
 *    guárdalo en public/icons/ y añádelo aquí.
 */
const IMAGES: Record<string, string> = {
  'SQL Server': '/icons/sqlserver.svg',
  Azure: '/icons/azure.svg',
  Codex: '/icons/codex.svg',
  AWS: '/icons/aws.svg',
}

/* Iconos genéricos (trazo) para tecnologías sin ningún logo. */
const FALLBACKS: Record<string, string> = {
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

  const image = IMAGES[name]
  if (image) {
    // Ya vienen a color; en modo "gris" se atenúan y se encienden en hover
    return (
      <img
        src={image}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className={`shrink-0 transition-[filter,opacity] duration-300 ${
          colored ? '' : 'opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0'
        }`}
      />
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
