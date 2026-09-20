"use client";

import { FieldShell } from "@/components/form/field-shell";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFieldContext } from "@/hooks/form-context";

type SelectFieldProps<T extends string> = {
  label: string;
  placeholder?: string;
  options: readonly T[];
  formatLabel?: (value: T) => string;
  fieldClassName?: string;
};

export function SelectField<T extends string>({
  label,
  placeholder,
  options,
  formatLabel = (value) => value,
  fieldClassName,
}: SelectFieldProps<T>) {
  const field = useFieldContext<T | "">();
  const items = options.map((value) => ({ value, label: formatLabel(value) }));
  return (
    <FieldShell label={label} className={fieldClassName}>
      {(id, invalid) => (
        <Select
          name={field.name}
          items={items}
          value={field.state.value === "" ? null : field.state.value}
          onValueChange={(value) => field.handleChange((value ?? "") as T | "")}
        >
          <SelectTrigger id={id} size="sm" className="w-full" aria-invalid={invalid} onBlur={field.handleBlur}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FieldShell>
  );
}
