/*
 * ─── CONTENIDO DEL PORTAFOLIO ──────────────────────────────────────────────
 * Todo el texto del sitio vive aquí. Para personalizarlo NO necesitas tocar
 * los componentes: cambia estos datos y la interfaz se actualiza sola.
 *
 * Contenido tomado de tu portafolio anterior
 * (alexis200500.github.io/AlexisMG.github.io). Busca "REVISA" en los textos
 * que completé sin tener el dato exacto: cámbialos por lo real.
 */

export const profile = {
  name: 'Alexis Morales Gómez',
  role: 'Coordinador de Desarrollo Web',
  location: 'México',
  timeZone: 'America/Mexico_City', // para el reloj en vivo del inicio
  available: true, // muestra el badge "Disponible" en el panel de perfil
  tagline:
    'Ingeniero en Desarrollo y Gestión de Software. Construyo aplicaciones web y móviles completas: del backend con Laravel, Node.js, Express y NestJS sobre SQL, a interfaces cuidadas con Angular, React y React Native.',
  email: 'alexis.morgomez20@gmail.com',
  phoneDisplay: '+52 729 143 6499', // cómo se muestra el número de WhatsApp
  links: {
    github: 'https://github.com/AlexisMG200500',
    // WhatsApp: 52 = lada de México + tu número. `text` es el mensaje que aparece ya escrito.
    whatsapp: 'https://wa.me/527291436499?text=' + encodeURIComponent('Hola Alexis, vi tu portafolio y me gustaría platicar contigo.'),
    linkedin: 'https://www.linkedin.com/in/alexis-morales-g%C3%B3mez-b23141239/',
    cv: 'https://drive.google.com/file/d/1dwkM3GtKL81eb5F749lm-s1N2071CX8r/view?usp=sharing', // REVISA: ¿CV actualizado?
  },
}

/*
 * ─── EXPERIENCIA ───────────────────────────────────────────────────────────
 * Ordena del más reciente al más antiguo. `period` es texto libre.
 */
export type Job = {
  company: string
  role: string
  /** Puesto con el que entraste, si te ascendieron (se muestra como "Antes: …") */
  previousRole?: string
  period: string
  location?: string
  points: string[]
  stack: string[]
}

export const experience: Job[] = [
  {
    company: 'Zascita de México',
    role: 'Coordinador de Desarrollo Web',
    previousRole: 'Desarrollador Web',
    period: 'mar 2023 — Actualidad',
    location: 'Ciudad de México',
    points: [
      'Entré como desarrollador web y hoy coordino el desarrollo web de la empresa.',
      'El sistema de la empresa nació en PHP y después pasó a su v2 en Angular + Express. Con el crecimiento de la empresa y la creación de nuevas áreas, hoy se conoce como Sistema Integral y está hecho en React + NestJS.',
      'También se desarrolló la plataforma de Control de Acceso, que controla las puertas de varias sucursales con terminales de reconocimiento facial: registro del personal, invitaciones a visitas con QR, verificación del guardia en caseta y entradas y salidas en tiempo real.',
      'Desarrollé la landing page de Falcon Ventures: sitio corporativo bilingüe (español/inglés) con SEO, formularios de contacto y despliegue en Vercel.',
      'Levanto requisitos con las áreas y modelo y gestiono las bases de datos de cada módulo.',
      'Creo y consumo APIs con Express, y genero mapas con Leaflet y Google Maps.',
      'Presento resultados y soluciones a socios y partes interesadas.',
    ],
    stack: ['React', 'NestJS', 'Angular', 'SQL Server', 'Azure', 'Node.js', 'TypeScript', 'PHP', 'Express', 'Leaflet', 'Google Maps'],
  },
  {
    company: 'Smart Site Company',
    role: 'Desarrollador Web',
    period: 'may 2021 — abr 2022',
    location: 'San Mateo Atenco',
    points: [
      'Sitio web y sistema de tickets e incidencias para el Ayuntamiento de San Mateo Atenco y OPDAPAS.',
      'Sitio web y sistema de consultas para la clínica San Miguel.',
      'Modelado y gestión de bases de datos, e integración con APIs de Google.',
    ],
    stack: ['Laravel', 'MySQL', 'PHP', 'JavaScript', 'Google Maps'],
  },
  {
    company: 'Soluciones Informáticas Profesionales de Toluca',
    role: 'Desarrollador Web',
    period: 'abr 2020 — sep 2020',
    location: 'Toluca',
    points: [
      'Tienda online responsive, pensada para móvil, tableta y escritorio.',
      'Desarrollo de un sitio web corporativo.',
      'Creación, modelado y gestión de la base de datos.',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'], // REVISA: tecnologías exactas
  },
]

export const education = [
  {
    degree: 'Ingeniería en Desarrollo y Gestión de Software',
    school: 'Universidad Tecnológica del Valle de Toluca',
    period: '2020 — 2022',
  },
  {
    degree: 'TSU en Tecnologías de la Información · Desarrollo de Software Multiplataforma',
    school: 'Universidad Tecnológica del Valle de Toluca',
    period: '2018 — 2020',
  },
  {
    degree: 'Técnico en Programación',
    school: 'CETIS No. 23',
    period: '2015 — 2018',
  },
]

export const about = {
  title: 'Aprendo construyendo.',
  // Frase principal, en grande junto a la foto
  statement:
    'Ingeniero en Desarrollo y Gestión de Software por la UTVT. Me considero junior y lo que más disfruto de esta profesión es seguir aprendiendo.',
  // Cada string es un párrafo
  story: [
    'Mi experiencia se ha centrado principalmente en el backend, pero también tengo habilidades en frontend, ya que disfruto aprender y siempre busco adquirir nuevos conocimientos.',
    'Me organizo bien, trabajo a gusto en equipo o por mi cuenta, y me entusiasma contribuir y seguir desarrollándome en un entorno desafiante.',
  ],
  // Año en que empezaste a trabajar como desarrollador (para calcular los años de experiencia)
  devSince: 2023,
  howIWork: [
    'Divido el trabajo en tareas pequeñas y entrego avances frecuentes.',
    'Trabajo bien en equipo y también de forma autónoma.',
    'Pregunto pronto y documento lo que aprendo.',
    'Cada proyecto es una excusa para dominar algo nuevo.',
  ],
  lookingFor:
    'Un equipo donde pueda aprender de gente con más experiencia, aportar lo que ya sé y crecer como desarrollador full stack.',
}

export type Project = {
  title: string
  description: string
  detail?: string // una línea extra: qué resolvía / qué hiciste
  year?: string
  stack: string[]
  demo?: string
  repo?: string
}

/*
 * Si un proyecto no tiene demo o repo, borra esa propiedad y el enlace
 * correspondiente desaparece automáticamente.
 */
export const projects: Project[] = [
  {
    title: 'Control de Acceso',
    year: '2026',
    description:
      'Plataforma SaaS multi-organización para controlar el acceso físico a sitios y puertas con terminales de reconocimiento facial.',
    detail:
      'Frontend en React 19 instalable como PWA, backend en NestJS 11 sobre SQL Server y un agente en Node.js que habla con terminales Hikvision por ISAPI. Eventos de acceso en vivo con Redis, reconocimiento facial en navegador y servidor, y reportes PDF/Excel por streaming. Desplegado con Docker en Azure.',
    stack: ['React', 'TypeScript', 'NestJS', 'SQL Server', 'Redis', 'Node.js', 'Docker', 'Azure'],
  },
  {
    title: 'Sistema Integral Zascita',
    year: '2026',
    description: 'Plataforma interna que une recursos humanos, jurídico, finanzas, comercial, operaciones y TI en un solo sistema.',
    detail:
      'Frontend en React con shadcn/ui y backend en NestJS sobre SQL Server. Registro con verificación de identidad (prueba de vida y comparación facial con AWS) y un servicio propio de OCR y rostro en Python con FastAPI. Generé certificados médicos dinámicos, firmas digitales y la verificación de rostros.',
    stack: ['React', 'TypeScript', 'NestJS', 'SQL Server', 'Python', 'FastAPI', 'AWS', 'Kubernetes'],
  },
  {
    title: 'Falcon Ventures',
    year: '2026',
    description: 'Sitio corporativo bilingüe para un grupo de inversión en empresas de seguridad.',
    detail:
      'Sitio sin framework con componentes HTML cargados por un script propio, traducción inglés/español y SEO con datos estructurados. Formularios y login con PHP serverless y MySQL, desplegado en Vercel.',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Vercel'],
  },
  {
    title: 'Zascita v2',
    description: 'Migración del sistema de gestión de Zascita de México de PHP a tecnologías modernas.',
    detail: 'Llevamos el sistema original en PHP a un frontend en Angular con una API propia en Express sobre SQL Server, y sumamos mapas con Leaflet y Google Maps.',
    stack: ['Angular', 'TypeScript', 'Express', 'Node.js', 'SQL Server', 'Leaflet', 'Google Maps'],
    demo: 'https://app.zascita.com/',
  },
  {
    title: 'Zascita v1',
    description: 'Primera versión del sistema de gestión de Zascita de México.',
    detail: 'Aplicación web en PHP con base de datos SQL Server, y videos alojados en Hostinger.',
    stack: ['PHP', 'SQL Server', 'JavaScript', 'Hostinger'],
    demo: 'https://appv1.zascita.com/zcm/login/login.html',
  },
  {
    title: 'Alquiladora',
    description: 'Sistema de administración para una alquiladora.',
    detail: 'CRUD con recuperación de contraseña por correo, exportación a PDF/Excel e importación desde Excel.',
    stack: ['Laravel', 'MySQL', 'JavaScript'],
    repo: 'https://github.com/Alexis200500/Alquiladora',
  },
  {
    title: 'SmartSite · Opdapas',
    description: 'Sitio web y sistema de tickets e incidencias para el Ayuntamiento de San Mateo Atenco y OPDAPAS.',
    stack: ['Laravel', 'MySQL', 'JavaScript'],
    repo: 'https://github.com/Alexis200500/Opdapas-SanMateoAtenco',
  },
  {
    title: 'SmartSite Health Server',
    description: 'Aplicación web del ecosistema SmartSite.', // REVISA: qué hace
    stack: ['Laravel', 'MySQL', 'JavaScript'],
    repo: 'https://github.com/Alexis200500/Healt_Server',
  },
  {
    title: 'Proyecto integrador',
    description: 'Proyecto integrador de 5.º cuatrimestre.', // REVISA: qué hace
    stack: ['Laravel', 'MySQL', 'JavaScript'],
    repo: 'https://github.com/Alexis200500/Proyectodeintegradora-5-Cuatrimestre',
  },
]

/*
 * Habilidades por categoría. El nombre de cada una debe coincidir con
 * el de TechIcon.tsx para que salga su logo.

 */
export const skills: { category: string; items: string[] }[] = [
  { category: 'Lenguajes', items: ['JavaScript', 'TypeScript', 'PHP'] },
  {
    category: 'Frontend y móvil',
    items: ['React', 'React Native', 'Expo', 'Angular', 'React Query', 'Axios'],
  },
  {
    category: 'Cloud y servicios',
    items: ['Azure', 'Google Cloud Storage', 'Google Maps', 'Leaflet', 'Vercel', 'Hostinger', 'Docker', 'Nginx'],
  },
  { category: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Laravel'] },
  { category: 'Bases de datos', items: ['MySQL', 'SQL Server', 'Redis'] },
  { category: 'UI y animación', items: ['HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'Motion', 'Three.js'] },
  { category: 'Herramientas', items: ['Git', 'GitHub', 'Postman', 'Swagger', 'npm', 'pnpm'] },
  { category: 'Desarrollo asistido por IA', items: ['Claude', 'Codex', 'Gemini'] },
]

/* Secciones del sitio (navegación lateral y menú móvil) */
export const nav = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
]

/* Tecnologías que se muestran como "stack principal" en el panel lateral */
export const mainStack = ['React', 'NestJS', 'TypeScript', 'SQL Server', 'Azure', 'Laravel']
