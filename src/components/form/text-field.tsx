"use client";

import { FieldShell } from "@/components/form/field-shell";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form-context";
import { cn } from "@/lib/utils";

type TextFieldProps = Omit<React.ComponentProps<typeof Input>, "value" | "onChange" | "onBlur" | "id"> & {
  label: string;
  fieldClassName?: string;
};

export function TextField({ label, fieldClassName, className, ...props }: TextFieldProps) {
  const field = useFieldContext<string>();
  return (
    <FieldShell label={label} className={fieldClassName}>
      {(id, invalid) => (
        <Input
          id={id}
          name={field.name}
          value={field.state.value}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={invalid}
          className={cn("h-8", className)}
          {...props}
        />
      )}
    </FieldShell>
  );
}
