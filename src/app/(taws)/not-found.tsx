import Link from "next/link";

import { DoorIllustration } from "@/shared/components/illustrations/door-illustration";
import { buttonVariants } from "@/shared/components/ui/button";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export default function NotFound() {
  return (
    <Section as="main" className="py-24 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_0.85fr] md:gap-14">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow className="text-primary">Error 404</Eyebrow>

          <Heading as="h1" variant="display" className="max-w-[14ch]">
            Esta página no existe
          </Heading>

          <Text variant="lead" className="text-muted-foreground max-w-[46ch]">
            Puede que la hayamos movido o que el enlace esté mal escrito.
          </Text>

          <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-2`}>
            Volver al inicio
          </Link>
        </div>

        <DoorIllustration className="order-first md:order-none" />
      </div>
    </Section>
  );
}
