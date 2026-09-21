"use client";

import { useId } from "react";

import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import { useFieldContext } from "@/hooks/form-context";
import { cn } from "@/lib/utils";

// Errors surface only after the field was touched; "Dalej" touches the whole step via validateField.
function useFieldErrors() {
  const { isTouched, errors } = useFieldContext().state.meta;
  const visible = isTouched && errors.length > 0;
  return { visible, errors: visible ? (errors as { message?: string }[]) : undefined };
}

type FieldShellProps = {
  label: string;
  className?: string;
  // Control isn't a labelable element (e.g. a toggle group div) – label binds via aria-labelledby instead of htmlFor.
  group?: boolean;
  children: (id: string, invalid: boolean) => React.ReactNode;
};

export function FieldShell({ label, className, group, children }: FieldShellProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const { visible, errors } = useFieldErrors();
  return (
    <Field data-invalid={visible} className={cn("gap-2", className)}>
      <FieldLabel id={labelId} htmlFor={group ? undefined : id}>
        {label}
      </FieldLabel>
      {children(group ? labelId : id, visible)}
      <FieldError errors={errors} />
    </Field>
  );
}
