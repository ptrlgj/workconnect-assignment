"use client";

import { FieldShell } from "@/components/form/FieldShell";
import { Textarea } from "@/components/ui/Textarea";
import { useFieldContext } from "@/hooks/form-context";

type TextareaFieldProps = Omit<React.ComponentProps<typeof Textarea>, "value" | "onChange" | "onBlur" | "id"> & {
  label: string;
  fieldClassName?: string;
};

export function TextareaField({ label, fieldClassName, ...props }: TextareaFieldProps) {
  const field = useFieldContext<string>();
  return (
    <FieldShell label={label} className={fieldClassName}>
      {(id, invalid) => (
        <Textarea
          id={id}
          name={field.name}
          value={field.state.value}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={invalid}
          {...props}
        />
      )}
    </FieldShell>
  );
}
