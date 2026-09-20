"use client";

import { withForm } from "@/hooks/form";
import { CATEGORIES, FEATURES, MANUFACTURERS } from "@/lib/product-options";
import { productFormOptions } from "@/lib/product-form/form-options";

export const BasicInfoStep = withForm({
  ...productFormOptions,
  render: function BasicInfoStepFields({ form }) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <form.AppField name="name">
          {(field) => <field.TextField label="Nazwa produktu" placeholder="np. MacBook Pro 14" autoFocus />}
        </form.AppField>
        <form.AppField name="sku">
          {(field) => (
            <field.TextField label="SKU produktu" placeholder="np. MBP14M3PRO" maxLength={24} autoCapitalize="characters" />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextareaField label="Opis" placeholder="Krótki opis produktu" fieldClassName="md:col-span-2" />
          )}
        </form.AppField>
        <form.AppField name="manufacturer">
          {(field) => <field.SelectField label="Producent" placeholder="Wybierz producenta" options={MANUFACTURERS} />}
        </form.AppField>
        <form.AppField name="category">
          {(field) => <field.SelectField label="Kategoria" placeholder="Wybierz kategorię" options={CATEGORIES} />}
        </form.AppField>
        <form.AppField name="features">
          {(field) => <field.ChipsField label="Cechy produktu" options={FEATURES} fieldClassName="md:col-span-2" />}
        </form.AppField>
      </div>
    );
  },
});
