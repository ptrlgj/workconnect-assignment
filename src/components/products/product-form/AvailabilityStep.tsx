"use client";

import { Separator } from "@/components/ui/Separator";
import { withForm } from "@/hooks/form";
import { productFormOptions } from "@/lib/product-form/form-options";

export const AvailabilityStep = withForm({
  ...productFormOptions,
  render: function AvailabilityStepFields({ form }) {
    return (
      <div className="flex flex-col gap-4">
        <form.AppField name="available">
          {(field) => <field.SwitchField label="Produkt jest dostępny" />}
        </form.AppField>

        <Separator />

        <form.AppField
          name="limited"
          listeners={{
            onChange: ({ value, fieldApi }) => {
              if (!value) fieldApi.form.resetField("stockQuantity");
            },
          }}
        >
          {(field) => <field.CheckboxField label="Produkt limitowany" />}
        </form.AppField>

        <form.Subscribe selector={(state) => state.values.limited}>
          {(limited) =>
            limited && (
              <div className="grid gap-4 md:grid-cols-2">
                <form.AppField name="stockQuantity">
                  {(field) => (
                    <field.TextField label="Ilość na magazynie" type="number" min="0" step="1" placeholder="np. 25" autoFocus />
                  )}
                </form.AppField>
              </div>
            )
          }
        </form.Subscribe>

        <Separator />

        <h3 className="text-base font-medium">Limity koszyka</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <form.AppField name="minCartQty">
            {(field) => <field.TextField label="Minimalna ilość" type="number" min="1" step="1" />}
          </form.AppField>
          <form.AppField name="maxCartQty">
            {(field) => <field.TextField label="Maksymalna ilość" type="number" min="1" step="1" />}
          </form.AppField>
        </div>
      </div>
    );
  },
});
