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
  siHostinger,
  siJquery,
  siFontawesome,
  siGithubpages,
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
  jQuery: siJquery,
  'Font Awesome': siFontawesome,
  'GitHub Pages': { ...siGithubpages, hex: '' },
  Hostinger: { ...siHostinger, hex: '7C5CF0' },
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

const IMAGES: Record<string, string> = {
  'SQL Server': '/icons/sqlserver.svg',
  Azure: '/icons/azure.svg',
  Codex: '/icons/codex.svg',
  AWS: '/icons/aws.svg',
}

const FALLBACKS: Record<string, string> = {
  Motion: 'M3 18c4 0 5-12 9-12s5 12 9 12',
}

type TechIconProps = {
  name: string
  size?: number
  colored?: boolean
}

export function TechIcon({ name, size = 14, colored = false }: TechIconProps) {
  const logo = ICONS[name]
  const common = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, className: 'shrink-0' }

  if (logo) {
    const brand = logo.hex ? `#${logo.hex}` : 'var(--fg)'
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
