"use client";

import { useId } from "react";

import { Checkbox } from "@/components/ui/Checkbox";
import { Field, FieldLabel } from "@/components/ui/Field";
import { useFieldContext } from "@/hooks/form-context";
import { cn } from "@/lib/utils";

type CheckboxFieldProps = { label: string; className?: string };

export function CheckboxField({ label, className }: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();
  const id = useId();
  return (
    <Field orientation="horizontal" className={cn("gap-2", className)}>
      <Checkbox
        id={id}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
      />
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
    </Field>
  );
}
