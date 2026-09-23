"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Controller } from "react-hook-form";

import { useApplicationForm } from "@/features/recruitment/hooks/use-application-form";

import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Heading, Text } from "@/shared/components/ui/typography";
import { MAJORS } from "@/shared/constants/majors";
import { WORK_AREA_ICONS } from "@/shared/constants/work-area-icons";
import { WORK_AREAS } from "@/shared/constants/work-areas";
import { cn } from "@/shared/utils/cn";

const MAJOR_ITEMS = MAJORS.map(({ value, label }) => ({ value, label }));
const PROGRAMMING_FUNDAMENTALS_ITEMS = [
  { value: "yes", label: "Sí" },
  { value: "no", label: "No" },
];

export function ApplicationForm() {
  const { form, onSubmit, submitError, isSubmitted } = useApplicationForm();

  if (isSubmitted) {
    return (
      <div className="flex flex-col gap-3">
        <Heading as="h3" variant="card">
          Postulación enviada
        </Heading>
        <Text className="text-muted-foreground">
          Te escribiremos a tu correo institucional con los siguientes pasos.
        </Text>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="w-full">
      <FieldSet>
        <FieldLegend>Postula en 2 minutos</FieldLegend>

        <FieldGroup>
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nombre completo</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Correo institucional
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@espol.edu.ec"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Usa el correo que te dio la ESPOL.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="major"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Carrera</FieldLabel>
                <Select
                  items={MAJOR_ITEMS}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={field.name}
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Selecciona tu carrera" />
                  </SelectTrigger>
                  <SelectContent>
                    {MAJORS.map((major) => (
                      <SelectItem key={major.value} value={major.value}>
                        {major.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="semester"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Semestre actual</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value === ""
                        ? undefined
                        : event.target.valueAsNumber,
                    )
                  }
                  id={field.name}
                  type="number"
                  min={1}
                  step={1}
                  required
                  aria-invalid={fieldState.invalid}
                  aria-describedby="semester-description"
                />
                <FieldDescription id="semester-description">
                  Obligatorio. Indica el número del semestre que cursas.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="passedProgrammingFundamentals"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  ¿Has aprobado Fundamentos de Programación?
                </FieldLabel>
                <Select
                  name={field.name}
                  items={PROGRAMMING_FUNDAMENTALS_ITEMS}
                  value={field.value ?? null}
                  onValueChange={field.onChange}
                  required
                >
                  <SelectTrigger
                    ref={field.ref}
                    id={field.name}
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                    aria-describedby="programming-fundamentals-description"
                  >
                    <SelectValue placeholder="Selecciona una respuesta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {PROGRAMMING_FUNDAMENTALS_ITEMS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldDescription id="programming-fundamentals-description">
                  Obligatorio. Selecciona sí o no.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="interests"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLegend variant="label">Áreas de interés</FieldLegend>
                <div className="flex flex-wrap gap-2">
                  {WORK_AREAS.map((area) => {
                    const isSelected = field.value.includes(area.value);

                    return (
                      <button
                        key={area.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          field.onChange(
                            isSelected
                              ? field.value.filter(
                                  (value) => value !== area.value,
                                )
                              : [...field.value, area.value],
                          )
                        }
                        className={cn(
                          "focus-visible:ring-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-surface text-foreground/80 hover:bg-secondary",
                        )}
                      >
                        <HugeiconsIcon
                          icon={WORK_AREA_ICONS[area.value]}
                          aria-hidden="true"
                          className="size-4"
                        />
                        {area.label}
                      </button>
                    );
                  })}
                </div>
                <FieldDescription>
                  Elige todas las que apliquen.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldSet>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Cuéntanos algo de ti
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  rows={4}
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>Opcional.</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="recommendationLetter"
            control={form.control}
            render={({ field: { value, onChange, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Carta de recomendación
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(event) => onChange(event.target.files?.[0])}
                  aria-invalid={fieldState.invalid}
                  aria-describedby="recommendation-letter-description"
                />
                <FieldDescription id="recommendation-letter-description">
                  Opcional. Solo PDF, máximo 3 MB.
                </FieldDescription>
                {value ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      form.resetField("recommendationLetter");
                      const input = document.getElementById(
                        field.name,
                      ) as HTMLInputElement | null;
                      if (input) input.value = "";
                    }}
                  >
                    Quitar archivo
                  </Button>
                ) : null}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="website"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
              />
            )}
          />

          {submitError ? <FieldError>{submitError}</FieldError> : null}

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Enviando…" : "Enviar postulación"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
