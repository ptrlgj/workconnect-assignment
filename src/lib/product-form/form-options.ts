import { formOptions } from "@tanstack/react-form";

import { defaultProductFormValues, productFormSchema } from "@/lib/product-form/schema";

export const productFormOptions = formOptions({
  defaultValues: defaultProductFormValues,
  validators: {
    // Whole-form schema on every change: cross-field errors (min/max, limited/stock) land on their own paths.
    onChange: productFormSchema,
  },
  // handleSubmit skips validation on the first attempt when the form is already invalid;
  // this makes it validate the mounted fields and surface their errors instead.
  canSubmitWhenInvalid: true,
});
