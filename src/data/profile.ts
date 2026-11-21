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
  role: 'Desarrollador Web Junior',
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
  period: string
  location?: string
  points: string[]
  stack: string[]
}

export const experience: Job[] = [
  {
    company: 'Zascita de México',
    role: 'Desarrollador Full Stack', // REVISA: tu puesto exacto
    period: 'REVISA 2023 — Actualidad',
    location: 'Seguridad privada',
    points: [
      'Desarrollo la nueva plataforma interna de la empresa como aplicación Angular conectada a SQL Server.',
      'Mantengo y amplío la primera versión del sistema, construida en PHP.',
      'REVISA: añade un logro concreto (módulos que hiciste, usuarios, tiempo ahorrado…).',
    ],
    stack: ['Angular', 'TypeScript', 'PHP', 'SQL Server'],
  },
  {
    company: 'Ayuntamiento de San Mateo Atenco · Opdapas',
    role: 'Estadías profesionales',
    period: 'REVISA año',
    points: [
      'Desarrollé SmartSite, una aplicación web en Laravel para el organismo.',
      'REVISA: describe qué procesos digitalizaste y para quién.',
    ],
    stack: ['Laravel', 'MySQL', 'JavaScript'],
  },
]

export const education = {
  school: 'Universidad Tecnológica del Valle de Toluca',
  degree: 'Ingeniería en Desarrollo y Gestión de Software',
}

export const about = {
  title: 'Del backend a la interfaz, con ganas de seguir aprendiendo.',
  // Cada string es un párrafo
  story: [
    'Soy egresado de Ingeniería en Desarrollo y Gestión de Software por la Universidad Tecnológica del Valle de Toluca. Mi experiencia se ha centrado en el backend —PHP, Laravel, MySQL y SQL Server—, construyendo sistemas reales para empresas e instituciones.',
    'Con el tiempo me he acercado cada vez más al frontend: Angular en el trabajo y React, TypeScript y Tailwind CSS en proyectos como este portafolio. Me gusta entender una aplicación de punta a punta, desde la base de datos hasta el último detalle de la interfaz.',
  ],
  howIWork: [
    'Divido el trabajo en tareas pequeñas y entrego avances frecuentes.',
    'Trabajo bien en equipo y también de forma autónoma.',
    'Pregunto pronto y documento lo que aprendo.',
    'Cada proyecto es una excusa para dominar algo nuevo.',
  ],
  lookingFor:
    'Un equipo donde aportar mi experiencia en backend, crecer en frontend y cuidar la calidad del producto.',
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
    title: 'Plataforma Zascita',
    description: 'Sistema interno para una empresa de seguridad privada armada.',
    detail: 'Nueva versión como SPA en Angular sobre SQL Server.',
    stack: ['Angular', 'TypeScript', 'SQL Server'],
    demo: 'https://app.zascita.com/',
  },
  {
    title: 'Zascita v1',
    description: 'Primera versión del sistema de gestión de Zascita de México.',
    detail: 'Aplicación web en PHP con base de datos SQL Server.',
    stack: ['PHP', 'SQL Server', 'JavaScript'],
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
    description: 'Proyecto de estadías para el Ayuntamiento de San Mateo Atenco y Opdapas.',
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
    items: ['Azure', 'Google Cloud Storage', 'Google Maps', 'Vercel', 'Docker', 'Nginx'],
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
export const mainStack = ['Laravel', 'Angular', 'React', 'Node.js', 'SQL Server', 'Azure']
