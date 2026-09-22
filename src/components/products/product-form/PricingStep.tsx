"use client";

import { withForm } from "@/hooks/form";
import { CURRENCIES, VAT_RATES } from "@/lib/product-options";
import { productFormOptions } from "@/lib/product-form/form-options";
import { grossFromNet, netFromGross } from "@/lib/product-form/pricing";

// Derived writes must not re-trigger the other field's listener (net → gross → net loop) nor mark it as touched.
const derivedWrite = { dontRunListeners: true, dontUpdateMeta: true } as const;

export const PricingStep = withForm({
  ...productFormOptions,
  render: function PricingStepFields({ form }) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <form.AppField
          name="netPrice"
          listeners={{
            onChange: ({ value, fieldApi: { form } }) =>
              form.setFieldValue("grossPrice", grossFromNet(value, form.getFieldValue("vatRate")), derivedWrite),
          }}
        >
          {(field) => (
            <field.TextField label="Cena netto" type="number" min="0" step="0.01" placeholder="0.00" autoFocus />
          )}
        </form.AppField>
        <form.AppField
          name="grossPrice"
          listeners={{
            onChange: ({ value, fieldApi: { form } }) =>
              form.setFieldValue("netPrice", netFromGross(value, form.getFieldValue("vatRate")), derivedWrite),
          }}
        >
          {(field) => <field.TextField label="Cena brutto" type="number" min="0" step="0.01" placeholder="0.00" />}
        </form.AppField>
        <form.AppField
          name="vatRate"
          listeners={{
            onChange: ({ value, fieldApi: { form } }) =>
              form.setFieldValue("netPrice", netFromGross(form.getFieldValue("grossPrice"), value), derivedWrite),
          }}
        >
          {(field) => (
            <field.SelectField
              label="Stawka VAT"
              placeholder="Wybierz stawkę"
              options={VAT_RATES}
              formatLabel={(rate) => `${rate}%`}
            />
          )}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => <field.SelectField label="Waluta" placeholder="Wybierz walutę" options={CURRENCIES} />}
        </form.AppField>
      </div>
    );
  },
});
