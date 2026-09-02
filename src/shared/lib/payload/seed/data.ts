export const SEED_USERS = [
  { name: "Admin", email: "admin@test.com", role: "admin" },
  { name: "Editor", email: "editor@test.com", role: "editor" },
  { name: "Blogger", email: "blogger@test.com", role: "blogger" },
] as const;

export const SEED_MEMBERS = [
  {
    fullName: "Ana Pérez Villacís",
    major: "computacion",
    position: "Presidenta",
    status: "active",
    joinedAt: "2023-03-01",
    githubUrl: "https://github.com/anaperez",
    linkedinUrl: "https://linkedin.com/in/anaperez",
    order: 1,
  },
  {
    fullName: "Bruno Salazar Mite",
    major: "telematica",
    position: "Coordinador de proyectos",
    status: "active",
    joinedAt: "2023-09-01",
    githubUrl: "https://github.com/brunosalazar",
    order: 2,
  },
  {
    fullName: "Camila Andrade Loor",
    major: "ciencia-de-datos-e-inteligencia-artificial",
    position: "Coordinadora de investigación",
    status: "active",
    joinedAt: "2024-03-01",
    linkedinUrl: "https://linkedin.com/in/camilaandrade",
    order: 3,
  },
  {
    fullName: "Diego Zambrano Cedeño",
    major: "electronica-y-automatizacion",
    position: "Miembro",
    status: "active",
    joinedAt: "2024-09-01",
    order: 4,
  },
  {
    fullName: "Elena Vera Chang",
    major: "estadistica",
    position: "Miembro",
    status: "active",
    joinedAt: "2025-03-01",
    githubUrl: "https://github.com/elenavera",
    order: 5,
  },
  {
    fullName: "Fabián Ortega Mendoza",
    major: "computacion",
    position: "Miembro",
    status: "active",
    joinedAt: "2025-09-01",
    order: 6,
  },
  {
    fullName: "Gabriela Ruiz Intriago",
    major: "computacion",
    position: "Expresidenta",
    status: "alumni",
    joinedAt: "2019-03-01",
    linkedinUrl: "https://linkedin.com/in/gabrielaruiz",
    order: 7,
  },
] as const;

export const SEED_PROJECTS = [
  {
    title: "Monitoreo de arritmias en tiempo real",
    summary:
      "Sensor NB-IoT y placa ESP32 con un modelo que clasifica el ritmo cardiaco y lo grafica en vivo.",
    areas: ["iot", "machine-learning"],
    status: "active",
    featured: true,
    year: 2026,
    repositoryUrl: "https://github.com/Taws-Espol/arritmias",
  },
  {
    title: "Movilidad urbana de Guayaquil",
    summary:
      "Datos abiertos de recorridos, paradas y tiempos de espera de la ciudad, publicados como API.",
    areas: ["data-science"],
    status: "active",
    year: 2025,
    repositoryUrl: "https://github.com/Taws-Espol/movilidad-gye",
  },
  {
    title: "Machine learning para chicos de colegio",
    summary:
      "Talleres en unidades educativas de Guayaquil, con material propio y cuadernos en español.",
    areas: ["machine-learning", "research"],
    status: "completed",
    year: 2025,
    externalUrl: "https://taws.espol.edu.ec",
  },
  {
    title: "Simulador del sistema solar",
    summary:
      "Programado y probado en la web con WebGL, sin dependencias externas.",
    areas: ["web"],
    status: "completed",
    year: 2024,
    repositoryUrl: "https://github.com/Taws-Espol/sistema-solar",
  },
  {
    title: "App de asistencia para la FIEC",
    summary:
      "Registro de asistencia por código QR para laboratorios, en React Native.",
    areas: ["mobile"],
    status: "completed",
    year: 2024,
  },
] as const;

export const SEED_POSTS = [
  {
    title: "Cómo instalar MongoDB sin perderte en la documentación",
    slug: "instalar-mongodb",
    excerpt:
      "La versión corta y probada del flujo de instalación, paso a paso.",
    category: "tutorial",
    status: "published",
    body: "Instalar una base de datos suele ser el primer muro de un proyecto. Esta guía recoge el camino más corto que hemos encontrado, probado en las tres plataformas que usamos en el club. ",
  },
  {
    title: "Analizar opiniones en redes sociales, paso a paso",
    slug: "analizar-opiniones-redes",
    excerpt:
      "Del scraping al modelo, el flujo completo que usamos en el taller de data science.",
    category: "tutorial",
    status: "published",
    body: "Recoger opiniones es fácil; interpretarlas sin engañarse es lo difícil. Repasamos el pipeline entero y, sobre todo, los sesgos que aparecen en cada etapa. ",
  },
  {
    title: "Git para tu primer proyecto en equipo",
    slug: "git-primer-proyecto-en-equipo",
    excerpt:
      "Ramas, conflictos y revisiones explicados desde cero, con los errores que todos cometemos.",
    category: "tutorial",
    status: "published",
    body: "La primera vez que trabajas con otras cuatro personas sobre el mismo repositorio, algo se rompe. Aquí están los seis casos que más nos han pasado y cómo salir de ellos. ",
  },
  {
    title: "Abrimos la convocatoria 2026",
    slug: "convocatoria-2026",
    excerpt:
      "Buscamos estudiantes de cualquier carrera con ganas de construir en equipo.",
    category: "anuncio",
    status: "published",
    body: "Este semestre abrimos plazas en las seis líneas de trabajo del club. No pedimos experiencia previa, pedimos constancia. ",
  },
  {
    title: "Borrador que no debería verse en el sitio",
    slug: "borrador-oculto",
    excerpt: "Si ves esto en la web pública, los borradores están rotos.",
    category: "anuncio",
    status: "draft",
    body: "Contenido de prueba. ",
  },
] as const;

export const SEED_EVENTS = [
  {
    title: "Taller de introducción a Git",
    slug: "taller-git",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: 14,
    description: "Cuatro horas de práctica con ramas, conflictos y revisiones.",
  },
  {
    title: "Charla: qué hace un ingeniero de datos",
    slug: "charla-ingenieria-de-datos",
    location: "Auditorio de la FIEC",
    daysFromNow: 30,
    description: "Una egresada del club cuenta su primer año en la industria.",
  },
  {
    title: "Semana de la Ingeniería 2026",
    slug: "semana-ingenieria-2026",
    location: "Campus Gustavo Galindo, ESPOL",
    daysFromNow: -45,
    description:
      "Tres días de demos, talleres y competencias entre facultades.",
  },
  {
    title: "Hackathon interna del club",
    slug: "hackathon-interna",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -120,
    description: "Veinticuatro horas construyendo en equipos de tres.",
  },
] as const;

export const SEED_ALBUMS = [
  {
    title: "Semana de la Ingeniería 2026",
    eventSlug: "semana-ingenieria-2026",
    daysFromNow: -45,
    imageCount: 4,
  },
  {
    title: "Hackathon interna",
    eventSlug: "hackathon-interna",
    daysFromNow: -120,
    imageCount: 3,
  },
  {
    title: "El día a día en el laboratorio",
    eventSlug: null,
    daysFromNow: -20,
    imageCount: 3,
  },
] as const;

export const SEED_APPLICATIONS = [
  {
    fullName: "Hugo Paredes Solórzano",
    email: "hugo.paredes@espol.edu.ec",
    major: "computacion",
    interests: ["web", "mobile"],
    message: "Llevo un año haciendo proyectos por mi cuenta y quiero equipo.",
    status: "pending",
  },
  {
    fullName: "Irene Castro Bajaña",
    email: "irene.castro@espol.edu.ec",
    major: "ciencia-de-datos-e-inteligencia-artificial",
    interests: ["machine-learning", "data-science"],
    status: "accepted",
  },
  {
    fullName: "Javier Molina Reyes",
    email: "javier.molina@espol.edu.ec",
    major: "telematica",
    interests: ["iot"],
    status: "rejected",
  },
] as const;
