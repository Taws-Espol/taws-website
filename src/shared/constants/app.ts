import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@hugeicons/core-free-icons";

export const APP_NAME = "TAWS";

export const CONTACT_EMAIL = "taws@espol.edu.ec";

export const NAVIGATION_ITEMS = [
  {
    href: "/nosotros",
    label: "Nosotros",
  },
  {
    href: "/proyectos",
    label: "Proyectos",
  },
  {
    href: "/eventos",
    label: "Eventos",
  },
  {
    href: "/galeria",
    label: "Galería",
  },
  {
    href: "/blog",
    label: "Blog",
  },
] as const;

export const APPLICATION_CTA = {
  href: "/postula",
  label: "Postula ahora",
} as const;

export const SOCIAL_LINKS = [
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/taws_espol",
    icon: InstagramIcon,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://ec.linkedin.com/company/tawsespol",
    icon: LinkedinIcon,
  },
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/Taws-Espol",
    icon: GithubIcon,
  },
] as const;
