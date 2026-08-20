import { Section } from "@/shared/components/ui/section";
import { Heading, Text } from "@/shared/components/ui/typography";

export default function Page() {
  return (
    <Section as="main">
      <div className="flex flex-col gap-4">
        <Heading as="h1" variant="display">
          Galería
        </Heading>

        <Text>Próximamente encontrarás aquí imágenes de TAWS.</Text>
      </div>
    </Section>
  );
}
