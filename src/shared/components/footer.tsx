import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";
import { APP_NAME, CONTACT_EMAIL, SOCIAL_LINKS } from "@/shared/constants/app";

export function Footer() {
  return (
    <Section as="footer" variant="inverted">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="max-w-2xl">
          <Eyebrow className="text-primary-foreground/70">ESPOL · FIEC</Eyebrow>

          <Heading as="h2" variant="section" className="mt-3">
            {APP_NAME}
          </Heading>

          <Text
            variant="small"
            className="text-primary-foreground/75 mt-4 max-w-xl"
          >
            Grupo estudiantil de investigación de ESPOL enfocado en tecnologías
            web, móviles y ciencia de datos.
          </Text>
        </div>

        <div className="flex flex-col items-start gap-3">
          <Eyebrow className="text-primary-foreground/70">Contacto</Eyebrow>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary-foreground/80 hover:text-primary-foreground focus-visible:ring-primary-foreground inline-flex items-center gap-2 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <HugeiconsIcon
              icon={Mail01Icon}
              className="size-5"
              aria-hidden="true"
            />

            <span className="font-sans text-sm">{CONTACT_EMAIL}</span>
          </a>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Text variant="caption" className="text-primary-foreground/70">
          Escuela Superior Politécnica del Litoral · Guayaquil, Ecuador
        </Text>

        <nav aria-label="Redes sociales de TAWS">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.platform}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} de TAWS, abre en una pestaña nueva`}
                  className="text-primary-foreground/80 hover:text-primary-foreground focus-visible:ring-primary-foreground inline-flex items-center gap-2 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  <HugeiconsIcon
                    icon={item.icon}
                    className="size-5"
                    aria-hidden="true"
                  />

                  <Eyebrow>{item.label}</Eyebrow>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Section>
  );
}
