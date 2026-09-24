"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { submitApplication } from "@/features/recruitment/actions/submit-application";
import { ERROR_MESSAGES } from "@/features/recruitment/constants/error-messages";
import { applicationSchema } from "@/features/recruitment/schemas/application";
import type { ApplicationInput } from "@/features/recruitment/types/application";

export function useApplicationForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ApplicationInput>({
    resolver: standardSchemaResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      major: "",
      interests: [],
      message: "",
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    const { recommendationLetter, ...application } = values;
    const formData = new FormData();
    formData.set("application", JSON.stringify(application));
    if (recommendationLetter) {
      formData.set("recommendationLetter", recommendationLetter);
    }

    let response;
    try {
      response = await submitApplication(formData);
    } catch {
      setSubmitError(ERROR_MESSAGES.unknown);
      return;
    }

    const { error } = response;

    if (error) {
      setSubmitError(ERROR_MESSAGES[error.code]);

      return;
    }

    setIsSubmitted(true);
    form.reset();
  });

  return { form, onSubmit, submitError, isSubmitted };
}
