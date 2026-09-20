import { formOptions } from "@tanstack/react-form";

import { defaultProductFormValues, productFormSchema } from "@/lib/product-form/schema";

export const productFormOptions = formOptions({
  defaultValues: defaultProductFormValues,
  validators: {
    // Whole-form schema on every change: cross-field errors (min/max, limited/stock) land on their own paths.
    onChange: productFormSchema,
  },
});
