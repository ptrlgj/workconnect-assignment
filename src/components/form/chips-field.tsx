"use client";

import { FieldShell } from "@/components/form/field-shell";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useFieldContext } from "@/hooks/form-context";

type ChipsFieldProps<T extends string> = {
  label: string;
  options: readonly T[];
  fieldClassName?: string;
};

export function ChipsField<T extends string>({ label, options, fieldClassName }: ChipsFieldProps<T>) {
  const field = useFieldContext<T[]>();
  return (
    <FieldShell label={label} className={fieldClassName} group>
      {(labelId, invalid) => (
        <ToggleGroup
          aria-labelledby={labelId}
          multiple
          value={field.state.value}
          onValueChange={(value) => field.handleChange(value as T[])}
          onBlur={field.handleBlur}
          aria-invalid={invalid}
          className="flex-wrap"
        >
          {options.map((option) => (
            <ToggleGroupItem
              key={option}
              value={option}
              variant="outline"
              className="h-auto min-w-0 rounded-full px-2 py-0.5 text-sm font-normal text-muted-foreground hover:bg-accent hover:text-foreground aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary"
            >
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </FieldShell>
  );
}
