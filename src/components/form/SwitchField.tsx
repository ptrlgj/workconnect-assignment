"use client";

import { useId } from "react";

import { Field, FieldLabel } from "@/components/ui/Field";
import { Switch } from "@/components/ui/Switch";
import { useFieldContext } from "@/hooks/form-context";
import { cn } from "@/lib/utils";

type SwitchFieldProps = { label: string; className?: string };

export function SwitchField({ label, className }: SwitchFieldProps) {
  const field = useFieldContext<boolean>();
  const id = useId();
  return (
    <Field orientation="horizontal" className={cn("gap-2", className)}>
      <Switch
        id={id}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
      />
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
    </Field>
  );
}
