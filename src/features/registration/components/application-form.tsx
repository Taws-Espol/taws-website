"use client";

import { Controller } from "react-hook-form";

import { WORK_AREAS } from "@/features/landing/constants/work-areas";
import { useApplicationForm } from "@/features/registration/hooks/use-application-form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";
import { MAJORS } from "@/shared/constants/majors";
import { cn } from "@/shared/utils/cn";

const MAJOR_ITEMS = MAJORS.map(({ value, label }) => ({ value, label }));

export function ApplicationForm() {
  const { form, onSubmit, submitError, isSubmitted } = useApplicationForm();
  const { errors, isSubmitting } = form.formState;

  if (isSubmitted) {
    return (
      <div className="bg-card text-card-foreground flex flex-col gap-3 rounded-2xl p-8">
        <Heading as="h3" className="text-xl">
          Postulación enviada
        </Heading>
        <Text className="text-foreground/70">
          Te escribiremos a tu correo institucional con los siguientes pasos.
        </Text>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="bg-card text-card-foreground flex flex-col gap-5 rounded-2xl p-8"
    >
      <Heading as="h3" className="text-xl">
        Postula en 2 minutos
      </Heading>

      <div className="flex flex-col gap-2">
        <label htmlFor="fullName">
          <Eyebrow>Nombre completo</Eyebrow>
        </label>
        <Input
          id="fullName"
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          {...form.register("fullName")}
        />
        {errors.fullName ? (
          <Text
            id="fullName-error"
            role="alert"
            variant="small"
            className="text-destructive"
          >
            {errors.fullName.message}
          </Text>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">
          <Eyebrow>Correo institucional</Eyebrow>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="nombre@espol.edu.ec"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...form.register("email")}
        />
        {errors.email ? (
          <Text
            id="email-error"
            role="alert"
            variant="small"
            className="text-destructive"
          >
            {errors.email.message}
          </Text>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="major">
          <Eyebrow>Carrera</Eyebrow>
        </label>
        <Controller
          control={form.control}
          name="major"
          render={({ field }) => (
            <Select
              items={MAJOR_ITEMS}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="major"
                aria-invalid={Boolean(errors.major)}
                aria-describedby={errors.major ? "major-error" : undefined}
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
          )}
        />
        {errors.major ? (
          <Text
            id="major-error"
            role="alert"
            variant="small"
            className="text-destructive"
          >
            {errors.major.message}
          </Text>
        ) : null}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend>
          <Eyebrow>Áreas de interés</Eyebrow>
        </legend>
        <Controller
          control={form.control}
          name="interests"
          render={({ field }) => (
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
                          ? field.value.filter((value) => value !== area.value)
                          : [...field.value, area.value],
                      )
                    }
                    className={cn(
                      "border-border focus-visible:ring-ring rounded-full border px-4 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none",
                      isSelected
                        ? "bg-secondary text-secondary-foreground border-secondary"
                        : "hover:bg-accent",
                    )}
                  >
                    <Eyebrow>{area.label}</Eyebrow>
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.interests ? (
          <Text role="alert" variant="small" className="text-destructive">
            {errors.interests.message}
          </Text>
        ) : null}
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="message">
          <Eyebrow>Cuéntanos algo de ti (opcional)</Eyebrow>
        </label>
        <Textarea id="message" rows={4} {...form.register("message")} />
      </div>

      <input
        {...form.register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      {submitError ? (
        <Text role="alert" variant="small" className="text-destructive">
          {submitError}
        </Text>
      ) : null}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando…" : "Enviar postulación"}
      </Button>
    </form>
  );
}
