export const MAJORS = [
  // FIEC
  {
    value: "ciencia-de-datos-e-inteligencia-artificial",
    label: "Ciencia de Datos e Inteligencia Artificial",
  },
  { value: "computacion", label: "Computación" },
  { value: "electricidad", label: "Electricidad" },
  {
    value: "electronica-y-automatizacion",
    label: "Electrónica y Automatización",
  },
  { value: "telecomunicaciones", label: "Telecomunicaciones" },
  { value: "telematica", label: "Telemática" },
  // FIMCP
  { value: "alimentos", label: "Alimentos" },
  { value: "ingenieria-industrial", label: "Ingeniería Industrial" },
  { value: "materiales", label: "Materiales" },
  { value: "mecanica", label: "Mecánica" },
  { value: "mecatronica", label: "Mecatrónica" },
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
  { value: "estadistica", label: "Estadística" },
  { value: "ingenieria-quimica", label: "Ingeniería Química" },
  { value: "logistica-y-transporte", label: "Logística y Transporte" },
  { value: "matematica", label: "Matemática" },
  // FCV
  { value: "biologia", label: "Biología" },
  {
    value: "ingenieria-agricola-y-biologica",
    label: "Ingeniería Agrícola y Biológica",
  },
  // FICT
  { value: "geologia", label: "Geología" },
  { value: "ingenieria-civil", label: "Ingeniería Civil" },
  { value: "minas", label: "Minas" },
  { value: "petroleos", label: "Petróleos" },
  // FIMCM
  { value: "acuicultura", label: "Acuicultura" },
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
