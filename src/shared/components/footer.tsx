import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";
import { APP_NAME, CONTACT_EMAIL, SOCIAL_LINKS } from "@/shared/constants/app";

export function Footer() {
  return (
    <Section as="footer" variant="inverted">
      <div className="border-on-inverted/20 grid gap-10 border-b pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="max-w-2xl">
          <Eyebrow className="text-on-inverted/70">ESPOL · FIEC</Eyebrow>

          <Heading as="h2" variant="section" className="mt-3">
            {APP_NAME}
          </Heading>

          <Text variant="small" className="text-on-inverted/75 mt-4 max-w-xl">
            Grupo estudiantil de investigación de ESPOL enfocado en tecnologías
            web, móviles y ciencia de datos.
          </Text>
        </div>

        <div className="flex flex-col items-start gap-3">
          <Eyebrow className="text-on-inverted/70">Contacto</Eyebrow>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-on-inverted/80 hover:text-on-inverted focus-visible:ring-on-inverted inline-flex items-center gap-2 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
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

      <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
        <Text variant="caption" className="text-on-inverted/60">
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
                  className="text-on-inverted/80 hover:text-on-inverted focus-visible:ring-on-inverted inline-flex items-center gap-2 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
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
