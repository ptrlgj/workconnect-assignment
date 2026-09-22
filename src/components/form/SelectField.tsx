"use client";

import { FieldShell } from "@/components/form/FieldShell";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useFieldContext } from "@/hooks/form-context";
import type { IconSvgElement } from "@hugeicons/react";

type SelectFieldProps<T extends string> = {
  label: string;
  placeholder?: string;
  options: readonly T[];
  formatLabel?: (value: T) => string;
  fieldClassName?: string;
  icon?: IconSvgElement;
};

export function SelectField<T extends string>({
  label,
  placeholder,
  options,
  formatLabel = (value) => value,
  fieldClassName,
  icon,
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
          <SelectTrigger id={id} size="sm" icon={icon} className="w-full" aria-invalid={invalid}>
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
