export const MAJORS = [
  // FIEC
  { value: "computacion", label: "Ingeniería en Computación" },
  {
    value: "ciencia-de-datos-e-inteligencia-artificial",
    label: "Ingeniería en Ciencia de Datos e Inteligencia Artificial",
  },
  { value: "electricidad", label: "Ingeniería en Electricidad" },
  {
    value: "electronica-y-automatizacion",
    label: "Ingeniería en Electrónica y Automatización",
  },
  { value: "telecomunicaciones", label: "Ingeniería en Telecomunicaciones" },
  { value: "telematica", label: "Ingeniería en Telemática" },
  // FIMCP
  { value: "alimentos", label: "Ingeniería en Alimentos" },
  { value: "ingenieria-industrial", label: "Ingeniería Industrial" },
  { value: "materiales", label: "Ingeniería en Materiales" },
  { value: "mecanica", label: "Ingeniería en Mecánica" },
  { value: "mecatronica", label: "Ingeniería en Mecatrónica" },
  // FCSH
  { value: "administracion-de-empresas", label: "Administración de Empresas" },
  { value: "arqueologia", label: "Arqueología" },
  {
    value: "auditoria-y-control-de-gestion",
    label: "Auditoría y Control de Gestión",
  },
  { value: "economia", label: "Economía" },
  { value: "turismo", label: "Turismo" },
  // FCNM
  { value: "estadistica", label: "Ingeniería en Estadística" },
  { value: "ingenieria-quimica", label: "Ingeniería Química" },
  {
    value: "logistica-y-transporte",
    label: "Ingeniería en Logística y Transporte",
  },
  { value: "matematica", label: "Matemática" },
  // FCV
  { value: "biologia", label: "Biología" },
  {
    value: "ingenieria-agricola-y-biologica",
    label: "Ingeniería Agrícola y Biológica",
  },
  // FICT
  { value: "geologia", label: "Ingeniería en Geología" },
  { value: "ingenieria-civil", label: "Ingeniería Civil" },
  { value: "minas", label: "Ingeniería en Minas" },
  { value: "petroleos", label: "Ingeniería en Petróleos" },
  // FIMCM
  { value: "acuicultura", label: "Ingeniería en Acuicultura" },
  { value: "ingenieria-naval", label: "Ingeniería Naval" },
  { value: "oceanografia", label: "Oceanografía" },
  // FADCOM
  {
    value: "animacion-digital-y-videojuegos",
    label: "Animación Digital y Videojuegos",
  },
  { value: "diseno-de-productos", label: "Diseño de Productos" },
  { value: "diseno-grafico", label: "Diseño Gráfico" },
  {
    value: "produccion-para-medios-de-comunicacion",
    label: "Producción para Medios de Comunicación",
  },
] as const;

export type MajorValue = (typeof MAJORS)[number]["value"];

export function getMajorPayloadOptions() {
  return MAJORS.map(({ value, label }) => ({
    label,
    value,
  }));
}

export function getMajorLabel(value: string) {
  return MAJORS.find((major) => major.value === value)?.label;
}
