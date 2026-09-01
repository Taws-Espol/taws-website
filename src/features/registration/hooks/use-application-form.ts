"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";

import { submitApplication } from "@/features/registration/actions/submit-application";
import { ERROR_MESSAGES } from "@/features/registration/constants/error-messages";
import {
  applicationSchema,
  type ApplicationInput,
} from "@/features/registration/schemas/application";

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

    const { error } = await submitApplication(values);

    if (error) {
      setSubmitError(ERROR_MESSAGES[error.code]);

      return;
    }

    setIsSubmitted(true);
    form.reset();
  });

  return { form, onSubmit, submitError, isSubmitted };
}
