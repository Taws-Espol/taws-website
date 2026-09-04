export const SEED_USERS = [
  { name: "Admin", email: "admin@test.com", role: "admin" },
  { name: "Editor", email: "editor@test.com", role: "editor" },
  { name: "Blogger", email: "blogger@test.com", role: "blogger" },
] as const;

/**
 * The covers the seed uploads. One flat colour per entry, cycled through the
 * content, so two cards from different pages never look alike — which is what
 * makes a stale page or a broken page link obvious at a glance.
 *
 * All six walk down the blue the palette already owns. The accent orange is
 * deliberately absent: it marks one thing per screen, and a card cover is a
 * surface.
 */
export const SEED_COVERS = [
  [11, 33, 134],
  [30, 64, 175],
  [70, 90, 160],
  [90, 97, 114],
  [143, 150, 171],
  [195, 200, 219],
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
    position: "Coordinador de hardware",
    status: "active",
    joinedAt: "2024-09-01",
    order: 4,
  },
  {
    fullName: "Elena Vera Chang",
    major: "estadistica",
    position: "Coordinadora de talleres",
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
    fullName: "Helena Ycaza Bustamante",
    major: "telecomunicaciones",
    position: "Miembro",
    status: "active",
    joinedAt: "2025-09-01",
    githubUrl: "https://github.com/helenaycaza",
    order: 7,
  },
  {
    fullName: "Iván Delgado Quimí",
    major: "mecatronica",
    position: "Miembro",
    status: "active",
    joinedAt: "2025-09-01",
    order: 8,
  },
  {
    fullName: "Karla Espinoza Tumbaco",
    major: "matematica",
    position: "Miembro",
    status: "active",
    joinedAt: "2026-03-01",
    linkedinUrl: "https://linkedin.com/in/karlaespinoza",
    order: 9,
  },
  {
    fullName: "Luis Cabrera Yagual",
    major: "computacion",
    position: "Miembro",
    status: "active",
    joinedAt: "2026-03-01",
    githubUrl: "https://github.com/luiscabrera",
    order: 10,
  },
  {
    fullName: "Gabriela Ruiz Intriago",
    major: "computacion",
    position: "Expresidenta",
    status: "alumni",
    joinedAt: "2019-03-01",
    linkedinUrl: "https://linkedin.com/in/gabrielaruiz",
    order: 11,
  },
  {
    fullName: "Mateo Franco Alvarado",
    major: "electricidad",
    position: "Fundador",
    status: "alumni",
    joinedAt: "2018-09-01",
    githubUrl: "https://github.com/mateofranco",
    order: 12,
  },
] as const;

/**
 * Ordered newest first, the way the listing shows them. The last four carry no
 * `year` on purpose: they are the group the projects query stitches after
 * everything dated, and with twenty-two dated ones ahead of them that stitch
 * lands in the middle of the third page rather than on a page boundary.
 */
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
    title: "Asistente de matrícula para la FIEC",
    summary:
      "Responde preguntas sobre prerrequisitos y cupos leyendo el reglamento vigente, sin inventarse artículos.",
    areas: ["web", "machine-learning"],
    status: "active",
    featured: true,
    year: 2026,
    repositoryUrl: "https://github.com/Taws-Espol/asistente-matricula",
  },
  {
    title: "Red de sensores de calidad del aire",
    summary:
      "Ocho estaciones repartidas por el campus que publican material particulado cada cinco minutos.",
    areas: ["iot", "data-science"],
    status: "active",
    year: 2026,
    repositoryUrl: "https://github.com/Taws-Espol/aire-campus",
  },
  {
    title: "Buscador semántico del repositorio de tesis",
    summary:
      "Encuentra trabajos de titulación por lo que tratan y no por las palabras exactas del título.",
    areas: ["machine-learning", "research"],
    status: "active",
    year: 2026,
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
    title: "Tablero de consumo eléctrico del campus",
    summary:
      "Lecturas de los medidores de cinco bloques, comparadas semana a semana contra el año anterior.",
    areas: ["data-science", "iot"],
    status: "completed",
    year: 2025,
    repositoryUrl: "https://github.com/Taws-Espol/consumo-campus",
  },
  {
    title: "Mapa de prácticas preprofesionales",
    summary:
      "Dónde hicieron sus prácticas los estudiantes de la FIEC, qué hicieron y a quién preguntarle.",
    areas: ["web"],
    status: "active",
    year: 2025,
    repositoryUrl: "https://github.com/Taws-Espol/mapa-practicas",
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
  {
    title: "Detección de plagas en cultivos de banano",
    summary:
      "Clasificación de hojas fotografiadas con el celular, entrenada con imágenes de fincas de Los Ríos.",
    areas: ["machine-learning", "research"],
    status: "completed",
    year: 2024,
    repositoryUrl: "https://github.com/Taws-Espol/plagas-banano",
  },
  {
    title: "Estación meteorológica del bloque 15",
    summary:
      "Temperatura, humedad y lluvia medidas en la terraza y servidas por una API pública.",
    areas: ["iot"],
    status: "completed",
    year: 2024,
    repositoryUrl: "https://github.com/Taws-Espol/estacion-b15",
  },
  {
    title: "Portal de becas y ayudas",
    summary:
      "Reúne en un solo lugar las convocatorias que hoy viven dispersas en correos y carteleras.",
    areas: ["web"],
    status: "completed",
    year: 2023,
    repositoryUrl: "https://github.com/Taws-Espol/portal-becas",
  },
  {
    title: "Reconocimiento de lengua de señas ecuatoriana",
    summary:
      "Un primer modelo para el alfabeto dactilológico, con un conjunto de datos grabado en el club.",
    areas: ["machine-learning", "research"],
    status: "completed",
    year: 2023,
  },
  {
    title: "Bot de horarios de bus del campus",
    summary:
      "Consulta por Telegram el próximo recorrido desde cualquier parada de la ESPOL.",
    areas: ["web"],
    status: "completed",
    year: 2023,
    repositoryUrl: "https://github.com/Taws-Espol/bot-buses",
  },
  {
    title: "Análisis del rendimiento académico por cohorte",
    summary:
      "Qué materias frenan a cada promoción, con datos anonimizados de seis años de la facultad.",
    areas: ["data-science"],
    status: "completed",
    year: 2023,
  },
  {
    title: "Robot seguidor de línea para la feria",
    summary:
      "Chasis impreso en 3D, control PID y dos semanas de calibración en el pasillo del bloque 15.",
    areas: ["iot"],
    status: "completed",
    year: 2022,
    repositoryUrl: "https://github.com/Taws-Espol/seguidor-linea",
  },
  {
    title: "Primera versión del sitio del club",
    summary:
      "Estática, escrita a mano y desplegada en GitHub Pages. Sirvió tres años sin tocarla.",
    areas: ["web"],
    status: "completed",
    year: 2022,
    repositoryUrl: "https://github.com/Taws-Espol/sitio-v1",
  },
  {
    title: "Clasificador de residuos con visión artificial",
    summary:
      "Una cámara sobre el tacho decide si lo que cae dentro es reciclable, y acierta cuatro de cinco veces.",
    areas: ["machine-learning"],
    status: "completed",
    year: 2022,
  },
  {
    title: "Repositorio de apuntes de la FIEC",
    summary:
      "Apuntes, exámenes viejos y resúmenes de las materias del núcleo, subidos por quienes ya las pasaron.",
    areas: ["web"],
    status: "completed",
    year: 2021,
    repositoryUrl: "https://github.com/Taws-Espol/apuntes-fiec",
  },
  {
    title: "Panel de casos de la pandemia en Guayas",
    summary:
      "Cifras diarias de la provincia durante 2021, con las fuentes citadas y los vacíos señalados.",
    areas: ["data-science"],
    status: "completed",
    year: 2021,
    repositoryUrl: "https://github.com/Taws-Espol/panel-guayas",
  },
  {
    title: "Taller remoto de Arduino",
    summary:
      "Kits enviados a domicilio y clases por videollamada, cuando el laboratorio estuvo cerrado.",
    areas: ["iot"],
    status: "completed",
    year: 2021,
  },
  {
    title: "Gemelo digital del laboratorio de cómputo",
    summary:
      "Una réplica navegable del laboratorio para ensayar la distribución de equipos antes de moverlos.",
    areas: ["iot", "research"],
    status: "active",
  },
  {
    title: "Traductor de kichwa asistido por modelos",
    summary:
      "Propuesta conjunta con la facultad de ciencias sociales. Falta el corpus y falta el permiso.",
    areas: ["machine-learning", "research"],
    status: "active",
  },
  {
    title: "App de reservas para los laboratorios",
    summary:
      "Reservar un puesto sin pasar por secretaría. Diseñada, discutida y todavía sin empezar.",
    areas: ["mobile"],
    status: "active",
  },
  {
    title: "Archivo abierto de proyectos del club",
    summary:
      "Todo lo que hemos construido, con su código y su gente, para que nada se pierda al graduarse.",
    areas: ["web"],
    status: "active",
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
    title: "Qué aprendimos midiendo el aire del campus",
    slug: "midiendo-el-aire-del-campus",
    excerpt:
      "Ocho sensores, cuatro meses de lecturas y una conclusión que no esperábamos.",
    category: "proyecto",
    status: "published",
    body: "Montar la red fue la parte fácil. Entender por qué dos estaciones separadas por doscientos metros discrepaban tanto nos ocupó el resto del semestre. ",
  },
  {
    title: "La terminal no muerde: quince comandos y ya",
    slug: "quince-comandos-terminal",
    excerpt: "Lo mínimo para dejar de tenerle miedo a la línea de comandos.",
    category: "tutorial",
    status: "published",
    body: "Nadie memoriza la terminal entera. Se aprenden quince comandos, se usan a diario y el resto se busca. Estos son los quince. ",
  },
  {
    title: "Cómo salió la hackathon interna",
    slug: "hackathon-interna-resumen",
    excerpt:
      "Veinticuatro horas, siete equipos y un proyecto que siguió vivo después.",
    category: "evento",
    status: "published",
    body: "Cerramos el laboratorio un viernes a las siete y lo abrimos el sábado a la misma hora. Esto es lo que salió, incluido lo que salió mal. ",
  },
  {
    title: "Docker explicado con el proyecto que ya tienes",
    slug: "docker-con-tu-proyecto",
    excerpt:
      "Sin teoría de contenedores: empaquetamos una aplicación real y la corremos.",
    category: "tutorial",
    status: "published",
    body: "La documentación de Docker empieza por la arquitectura. Nosotros empezamos por tu proyecto corriendo en la máquina de otra persona, que es para lo que querías Docker. ",
  },
  {
    title: "Bienvenida a los diez miembros nuevos",
    slug: "bienvenida-miembros-nuevos",
    excerpt:
      "Quiénes entraron este semestre y en qué línea de trabajo está cada uno.",
    category: "anuncio",
    status: "published",
    body: "Recibimos ciento veinte postulaciones y entrevistamos a cuarenta. Estas son las personas que se suman al club y lo que vinieron a construir. ",
  },
  {
    title: "Escribir tu primer informe en LaTeX sin sufrir",
    slug: "primer-informe-latex",
    excerpt:
      "Una plantilla que funciona y las cuatro cosas que hay que entender.",
    category: "tutorial",
    status: "published",
    body: "LaTeX se aprende mal porque se enseña completo. Con una plantilla que ya compila y cuatro conceptos alcanza para todo un semestre de informes. ",
  },
  {
    title: "Detectar plagas en banano: qué funcionó y qué no",
    slug: "plagas-banano-resultados",
    excerpt:
      "El modelo acierta en el laboratorio y falla en la finca. Contamos por qué.",
    category: "proyecto",
    status: "published",
    body: "Nuestro conjunto de datos tenía hojas fotografiadas a mediodía y con buena luz. La finca real tiene sombra, lluvia y celulares viejos. ",
  },
  {
    title: "Cómo conseguir tu primera pasantía en tecnología",
    slug: "primera-pasantia-tecnologia",
    excerpt:
      "Lo que preguntan, lo que revisan y lo que de verdad pesa en la decisión.",
    category: "anuncio",
    status: "published",
    body: "Reunimos la experiencia de doce miembros que ya pasaron por eso, y coincidieron más de lo que esperábamos. ",
  },
  {
    title: "pandas en una tarde",
    slug: "pandas-en-una-tarde",
    excerpt:
      "Cargar, limpiar, agrupar y graficar. El ochenta por ciento del trabajo real.",
    category: "tutorial",
    status: "published",
    body: "La biblioteca es enorme y nunca la usarás entera. Estas cinco operaciones cubren casi todo lo que harás con datos en la carrera. ",
  },
  {
    title: "Presentamos el mapa de prácticas preprofesionales",
    slug: "mapa-practicas-lanzamiento",
    excerpt:
      "Dónde hicieron sus prácticas los de la FIEC, con nombres y contactos.",
    category: "proyecto",
    status: "published",
    body: "La información existía, repartida entre grupos de WhatsApp y conversaciones de pasillo. La juntamos y la pusimos en un mapa. ",
  },
  {
    title: "Cómo preparamos un taller en el club",
    slug: "como-preparamos-un-taller",
    excerpt:
      "De la idea al laboratorio lleno, con el guion que usamos cada vez.",
    category: "anuncio",
    status: "published",
    body: "Un taller que sale bien no se improvisa el día anterior. Este es el proceso que seguimos, con los tiempos reales de cada etapa. ",
  },
  {
    title: "React sin framework: qué se aprende y qué se sufre",
    slug: "react-sin-framework",
    excerpt:
      "Montamos la misma aplicación dos veces para ver qué resuelve un framework.",
    category: "tutorial",
    status: "published",
    body: "Empezar sin framework enseña qué problema resuelve cada pieza. Terminar sin framework enseña por qué existen. Hicimos las dos cosas. ",
  },
  {
    title: "Crónica de la Semana de la Ingeniería 2026",
    slug: "semana-ingenieria-2026-cronica",
    excerpt: "Tres días de demos, y el stand que no dejó de tener cola.",
    category: "evento",
    status: "published",
    body: "Llevamos cuatro proyectos y un cartel. El que atrajo a todo el mundo fue el que menos habíamos ensayado. ",
  },
  {
    title: "Seguridad informática: los errores que sí cometemos",
    slug: "errores-de-seguridad-comunes",
    excerpt:
      "Claves en el repositorio, dependencias sin revisar y otros clásicos.",
    category: "tutorial",
    status: "published",
    body: "No hablamos de ataques sofisticados. Hablamos de las cinco cosas que hemos encontrado en nuestros propios proyectos al revisarlos. ",
  },
  {
    title: "Publicamos el panel de consumo eléctrico del campus",
    slug: "panel-consumo-electrico",
    excerpt:
      "Cinco bloques medidos, comparados contra el mismo mes del año pasado.",
    category: "proyecto",
    status: "published",
    body: "Los medidores llevaban años instalados y nadie leía sus datos. Ahora se leen solos y se comparan solos. ",
  },
  {
    title: "Cómo entramos a investigación siendo de pregrado",
    slug: "investigacion-en-pregrado",
    excerpt: "Tres miembros cuentan cómo llegaron a un grupo de investigación.",
    category: "anuncio",
    status: "published",
    body: "No hay una convocatoria pública ni un formulario. Hay profesores con proyectos y estudiantes que preguntan. Así preguntaron ellos. ",
  },
  {
    title: "Diez años del club, contados por quienes lo fundaron",
    slug: "diez-anos-del-club",
    excerpt: "De cuatro personas en un aula prestada a lo que somos hoy.",
    category: "anuncio",
    status: "published",
    body: "Buscamos a los fundadores, los sentamos juntos y les pedimos que contaran cómo empezó todo. Salieron cosas que ni los miembros actuales sabían. ",
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

/**
 * Four events still to come and twenty already past, so the listing splits by
 * the clock into a short upcoming section and a paged history.
 */
export const SEED_EVENTS = [
  {
    title: "Taller de introducción a Git",
    slug: "taller-git",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: 14,
    description: "Cuatro horas de práctica con ramas, conflictos y revisiones.",
    registrationUrl: "https://forms.gle/ejemplo-taller-git",
  },
  {
    title: "Charla: qué hace un ingeniero de datos",
    slug: "charla-ingenieria-de-datos",
    location: "Auditorio de la FIEC",
    daysFromNow: 30,
    description: "Una egresada del club cuenta su primer año en la industria.",
  },
  {
    title: "Introducción a Docker para estudiantes",
    slug: "intro-docker",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: 45,
    description:
      "Empaquetamos un proyecto propio y lo corremos en la máquina de al lado.",
    registrationUrl: "https://forms.gle/ejemplo-docker",
  },
  {
    title: "Feria de proyectos del semestre",
    slug: "feria-proyectos-semestre",
    location: "Explanada del bloque 15, ESPOL",
    daysFromNow: 60,
    description:
      "Cada equipo presenta lo que construyó, en cinco minutos y sin diapositivas.",
  },
  {
    title: "Noche de demos de fin de semestre",
    slug: "noche-de-demos",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -20,
    description:
      "Siete proyectos enseñados en vivo, con sus errores incluidos.",
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
    title: "Taller de Python desde cero",
    slug: "taller-python-cero",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -60,
    description: "Seis horas para quien nunca ha escrito una línea de código.",
  },
  {
    title: "Charla: cómo conseguir tu primera pasantía",
    slug: "charla-primera-pasantia",
    location: "Auditorio de la FIEC",
    daysFromNow: -75,
    description: "Cuatro miembros cuentan cómo fue su proceso, sin adornos.",
  },
  {
    title: "Introducción a Linux y la terminal",
    slug: "intro-linux-terminal",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -90,
    description: "Quince comandos, un servidor de práctica y ningún miedo.",
  },
  {
    title: "Taller de bases de datos relacionales",
    slug: "taller-bases-de-datos",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -105,
    description: "Modelado, normalización y las consultas que sí se usan.",
  },
  {
    title: "Hackathon interna del club",
    slug: "hackathon-interna",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -120,
    description: "Veinticuatro horas construyendo en equipos de tres.",
  },
  {
    title: "Charla: mujeres en ingeniería en la FIEC",
    slug: "charla-mujeres-en-ingenieria",
    location: "Auditorio de la FIEC",
    daysFromNow: -140,
    description:
      "Tres egresadas y una profesora, sobre lo que cambió y lo que no.",
  },
  {
    title: "Taller de visión artificial con OpenCV",
    slug: "taller-vision-opencv",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -160,
    description: "De la cámara del portátil a un detector que funciona.",
  },
  {
    title: "Introducción a React",
    slug: "intro-react",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -180,
    description: "Componentes, estado y una aplicación terminada en la sesión.",
  },
  {
    title: "Charla: qué es la investigación de pregrado",
    slug: "charla-investigacion-pregrado",
    location: "Auditorio de la FIEC",
    daysFromNow: -200,
    description: "Cómo se entra a un grupo, qué se hace y cuánto tiempo toma.",
  },
  {
    title: "Taller de Arduino y sensores",
    slug: "taller-arduino-sensores",
    location: "Laboratorio de Electrónica, FIEC",
    daysFromNow: -220,
    description:
      "Kits prestados, seis sensores y una estación al final del día.",
  },
  {
    title: "Taller de diseño de PCB",
    slug: "taller-diseno-pcb",
    location: "Laboratorio de Electrónica, FIEC",
    daysFromNow: -245,
    description: "Del esquemático al archivo listo para fabricar, en KiCad.",
  },
  {
    title: "Charla: del proyecto de aula al portafolio",
    slug: "charla-proyecto-a-portafolio",
    location: "Auditorio de la FIEC",
    daysFromNow: -270,
    description:
      "Qué hacer con los trabajos que ya entregaste para que sirvan de algo.",
  },
  {
    title: "Taller de LaTeX para informes",
    slug: "taller-latex-informes",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -290,
    description: "Una plantilla que compila y cuatro conceptos que bastan.",
  },
  {
    title: "Introducción a Git y GitHub, edición 2025",
    slug: "intro-git-2025",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -310,
    description:
      "La primera versión del taller que hoy repetimos cada semestre.",
  },
  {
    title: "Charla: seguridad informática en la práctica",
    slug: "charla-seguridad-practica",
    location: "Auditorio de la FIEC",
    daysFromNow: -330,
    description: "Revisamos en vivo proyectos del club y encontramos de todo.",
  },
  {
    title: "Taller de análisis de datos con pandas",
    slug: "taller-pandas",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -350,
    description: "Cargar, limpiar, agrupar y graficar un conjunto real.",
  },
  {
    title: "Hackathon interfacultades",
    slug: "hackathon-interfacultades",
    location: "Campus Gustavo Galindo, ESPOL",
    daysFromNow: -370,
    description: "Doce equipos de cuatro facultades, treinta y seis horas.",
  },
  {
    title: "Bienvenida a los nuevos miembros",
    slug: "bienvenida-nuevos-miembros",
    location: "Laboratorio de Cómputo, FIEC",
    daysFromNow: -400,
    description: "Presentación de las líneas de trabajo y reparto de equipos.",
  },
] as const;

/**
 * Twenty-one albums. Most hang off a past event; a few stand alone, which is
 * the case the card has to render without an event name under it.
 */
export const SEED_ALBUMS = [
  {
    title: "Noche de demos de fin de semestre",
    eventSlug: "noche-de-demos",
    daysFromNow: -20,
    imageCount: 5,
  },
  {
    title: "Semana de la Ingeniería 2026",
    eventSlug: "semana-ingenieria-2026",
    daysFromNow: -45,
    imageCount: 4,
  },
  {
    title: "El día a día en el laboratorio",
    eventSlug: null,
    daysFromNow: -52,
    imageCount: 3,
  },
  {
    title: "Taller de Python desde cero",
    eventSlug: "taller-python-cero",
    daysFromNow: -60,
    imageCount: 4,
  },
  {
    title: "Charla: cómo conseguir tu primera pasantía",
    eventSlug: "charla-primera-pasantia",
    daysFromNow: -75,
    imageCount: 3,
  },
  {
    title: "Armado de la red de sensores de aire",
    eventSlug: null,
    daysFromNow: -82,
    imageCount: 6,
  },
  {
    title: "Introducción a Linux y la terminal",
    eventSlug: "intro-linux-terminal",
    daysFromNow: -90,
    imageCount: 3,
  },
  {
    title: "Taller de bases de datos relacionales",
    eventSlug: "taller-bases-de-datos",
    daysFromNow: -105,
    imageCount: 4,
  },
  {
    title: "Hackathon interna",
    eventSlug: "hackathon-interna",
    daysFromNow: -120,
    imageCount: 7,
  },
  {
    title: "Retrato de la directiva 2026",
    eventSlug: null,
    daysFromNow: -130,
    imageCount: 3,
  },
  {
    title: "Charla: mujeres en ingeniería en la FIEC",
    eventSlug: "charla-mujeres-en-ingenieria",
    daysFromNow: -140,
    imageCount: 4,
  },
  {
    title: "Taller de visión artificial con OpenCV",
    eventSlug: "taller-vision-opencv",
    daysFromNow: -160,
    imageCount: 3,
  },
  {
    title: "Introducción a React",
    eventSlug: "intro-react",
    daysFromNow: -180,
    imageCount: 3,
  },
  {
    title: "Visita al laboratorio de electrónica",
    eventSlug: null,
    daysFromNow: -190,
    imageCount: 4,
  },
  {
    title: "Taller de Arduino y sensores",
    eventSlug: "taller-arduino-sensores",
    daysFromNow: -220,
    imageCount: 5,
  },
  {
    title: "Taller de diseño de PCB",
    eventSlug: "taller-diseno-pcb",
    daysFromNow: -245,
    imageCount: 3,
  },
  {
    title: "Taller de LaTeX para informes",
    eventSlug: "taller-latex-informes",
    daysFromNow: -290,
    imageCount: 3,
  },
  {
    title: "Introducción a Git y GitHub, edición 2025",
    eventSlug: "intro-git-2025",
    daysFromNow: -310,
    imageCount: 4,
  },
  {
    title: "Taller de análisis de datos con pandas",
    eventSlug: "taller-pandas",
    daysFromNow: -350,
    imageCount: 3,
  },
  {
    title: "Hackathon interfacultades",
    eventSlug: "hackathon-interfacultades",
    daysFromNow: -370,
    imageCount: 6,
  },
  {
    title: "Bienvenida a los nuevos miembros",
    eventSlug: "bienvenida-nuevos-miembros",
    daysFromNow: -400,
    imageCount: 4,
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
  {
    fullName: "Nadia Coello Arteaga",
    email: "nadia.coello@espol.edu.ec",
    major: "mecatronica",
    interests: ["iot", "research"],
    message: "Vengo del taller de Arduino y quiero seguir con el hardware.",
    status: "pending",
  },
  {
    fullName: "Óscar Benítez Plúas",
    email: "oscar.benitez@espol.edu.ec",
    major: "estadistica",
    interests: ["data-science"],
    status: "pending",
  },
] as const;
