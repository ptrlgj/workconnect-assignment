"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/Button";
import { AvailabilityStep } from "@/components/products/product-form/AvailabilityStep";
import { BasicInfoStep } from "@/components/products/product-form/BasicInfoStep";
import { PricingStep } from "@/components/products/product-form/PricingStep";
import { Stepper } from "@/components/products/product-form/Stepper";
import { useAppForm } from "@/hooks/form";
import { productFormOptions } from "@/lib/product-form/form-options";
import { productFormSchema, type ProductFormOutput } from "@/lib/product-form/schema";
import { PRODUCT_FORM_STEPS } from "@/lib/product-form/steps";

type ProductFormProps = { onSubmit: (values: ProductFormOutput) => void };

const LAST_STEP = PRODUCT_FORM_STEPS.length - 1;

/** Single form instance for all steps; it unmounts with the dialog content, which is the reset. */
export function ProductForm({ onSubmit }: ProductFormProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = PRODUCT_FORM_STEPS[stepIndex];

  const form = useAppForm({
    ...productFormOptions,
    onSubmit: ({ value }) => onSubmit(productFormSchema.parse(value)),
  });

  // Untouched fields have no errors yet, so the step must be validated explicitly before moving on.
  const goNext = async () => {
    await Promise.all(step.fields.map((field) => form.validateField(field, "submit")));
    const stepIsValid = step.fields.every((field) => !form.getFieldMeta(field)?.errors.length);
    if (stepIsValid) setStepIndex(stepIndex + 1);
  };

  const goBack = () => setStepIndex(stepIndex - 1);

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <Stepper steps={PRODUCT_FORM_STEPS} currentStep={stepIndex} className="border-b px-4 py-3" />

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {step.id === "basic-info" && <BasicInfoStep form={form} />}
        {step.id === "pricing" && <PricingStep form={form} />}
        {step.id === "availability" && <AvailabilityStep form={form} />}
      </div>

      <footer className="flex items-center gap-2 border-t bg-neutral-50 p-4">
        {stepIndex > 0 && (
          <Button type="button" variant="outline" onClick={goBack}>
            <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} data-icon="inline-start" />
            Wstecz
          </Button>
        )}

        {/* Distinct keys force a fresh DOM node; otherwise the click that switches this button to type="submit" also submits the form. */}
        {stepIndex < LAST_STEP ? (
          <Button key="next" type="button" className="ml-auto" onClick={goNext}>
            Dalej
            <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} data-icon="inline-end" />
          </Button>
        ) : (
          <Button key="submit" type="submit" className="ml-auto">
            Zapisz produkt
          </Button>
        )}
      </footer>
    </form>
  );
}
