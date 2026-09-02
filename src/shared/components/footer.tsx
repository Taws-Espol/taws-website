import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";
import {
  APP_NAME,
  CONTACT_EMAIL,
  NAVIGATION_ITEMS,
  SOCIAL_LINKS,
} from "@/shared/constants/app";

export function Footer() {
  return (
    <Section as="footer" variant="inverted" className="py-14 md:py-20">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex max-w-sm flex-col gap-3">
          <Heading as="h2" variant="card" className="text-2xl">
            {APP_NAME}
          </Heading>

          <Text variant="small" className="text-primary-foreground/75">
            Grupo estudiantil de investigación de la ESPOL en tecnologías web,
            móviles y ciencia de datos. En la FIEC desde 2007.
          </Text>
        </div>

        <nav aria-label="Secciones del sitio" className="flex flex-col gap-3">
          <Eyebrow className="text-primary-foreground/60">Secciones</Eyebrow>

          <ul className="flex flex-col gap-2">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground focus-visible:ring-primary-foreground rounded-sm text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <Eyebrow className="text-primary-foreground/60">Contacto</Eyebrow>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary-foreground/80 hover:text-primary-foreground focus-visible:ring-primary-foreground inline-flex w-fit items-center gap-2 rounded-sm text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <HugeiconsIcon
              icon={Mail01Icon}
              className="size-4"
              aria-hidden="true"
            />
            {CONTACT_EMAIL}
          </a>

          <ul className="mt-2 flex flex-col gap-2">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.platform}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} de ${APP_NAME}, abre en una pestaña nueva`}
                  className="text-primary-foreground/80 hover:text-primary-foreground focus-visible:ring-primary-foreground inline-flex items-center gap-2 rounded-sm text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  <HugeiconsIcon
                    icon={item.icon}
                    className="size-4"
                    aria-hidden="true"
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Text
        variant="caption"
        className="text-primary-foreground/60 mt-14 md:mt-16"
      >
        Escuela Superior Politécnica del Litoral · Guayaquil, Ecuador
      </Text>
    </Section>
  );
}
