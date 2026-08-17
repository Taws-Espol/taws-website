import type { CollectionConfig } from "payload";

import { MEMBERS_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

const MAJOR_OPTIONS = [
  // FIEC
  {
    label: "Ciencia de Datos e Inteligencia Artificial",
    value: "ciencia-de-datos-e-inteligencia-artificial",
  },
  { label: "Computación", value: "computacion" },
  { label: "Electricidad", value: "electricidad" },
  {
    label: "Electrónica y Automatización",
    value: "electronica-y-automatizacion",
  },
  { label: "Telecomunicaciones", value: "telecomunicaciones" },
  { label: "Telemática", value: "telematica" },
  // FIMCP
  { label: "Alimentos", value: "alimentos" },
  { label: "Ingeniería Industrial", value: "ingenieria-industrial" },
  { label: "Materiales", value: "materiales" },
  { label: "Mecánica", value: "mecanica" },
  { label: "Mecatrónica", value: "mecatronica" },
  // FCSH
  { label: "Administración de Empresas", value: "administracion-de-empresas" },
  { label: "Arqueología", value: "arqueologia" },
  {
    label: "Auditoría y Control de Gestión",
    value: "auditoria-y-control-de-gestion",
  },
  { label: "Economía", value: "economia" },
  { label: "Turismo", value: "turismo" },
  // FCNM
  { label: "Estadística", value: "estadistica" },
  { label: "Ingeniería Química", value: "ingenieria-quimica" },
  { label: "Logística y Transporte", value: "logistica-y-transporte" },
  { label: "Matemática", value: "matematica" },
  // FCV
  { label: "Biología", value: "biologia" },
  {
    label: "Ingeniería Agrícola y Biológica",
    value: "ingenieria-agricola-y-biologica",
  },
  // FICT
  { label: "Geología", value: "geologia" },
  { label: "Ingeniería Civil", value: "ingenieria-civil" },
  { label: "Minas", value: "minas" },
  { label: "Petróleos", value: "petroleos" },
  // FIMCM
  { label: "Acuicultura", value: "acuicultura" },
  { label: "Ingeniería Naval", value: "ingenieria-naval" },
  { label: "Oceanografía", value: "oceanografia" },
  // FADCOM
  {
    label: "Animación Digital y Videojuegos",
    value: "animacion-digital-y-videojuegos",
  },
  { label: "Diseño de Productos", value: "diseno-de-productos" },
  { label: "Diseño Gráfico", value: "diseno-grafico" },
  {
    label: "Producción para Medios de Comunicación",
    value: "produccion-para-medios-de-comunicacion",
  },
];

export const Members: CollectionConfig = {
  slug: "members",
  labels: { singular: "Member", plural: "Members" },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Members",
    defaultColumns: ["fullName", "status", "major", "position", "order"],
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "major",
      type: "select",
      options: MAJOR_OPTIONS,
    },
    {
      name: "position",
      type: "text",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Alumni", value: "alumni" },
      ],
    },
    {
      name: "joinedAt",
      type: "date",
    },
    {
      name: "githubUrl",
      type: "text",
    },
    {
      name: "linkedinUrl",
      type: "text",
    },
    {
      name: "order",
      type: "number",
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "members", tag: MEMBERS_TAG });
      },
    ],
  },
};
