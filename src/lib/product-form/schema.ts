import { z } from "zod";

import {
  CATEGORIES,
  CURRENCIES,
  FEATURES,
  MANUFACTURERS,
  VAT_RATES,
  type Category,
  type Currency,
  type Feature,
  type Manufacturer,
  type VatRate,
} from "@/lib/product-options";
import { isValidAmount, parseAmount } from "@/lib/product-form/pricing";

const REQUIRED = "Pole wymagane";

/** Numeric fields are strings on purpose: the input stays editable ("12.", "") and coercion never turns "" into 0. */
const amount = z
  .string()
  .trim()
  .min(1, REQUIRED)
  .refine(isValidAmount, "Podaj kwotę, np. 12.50")
  .refine((value) => (parseAmount(value) ?? 0) > 0, "Kwota musi być większa od 0");

const isInteger = (value: string) => /^\d+$/.test(value);

const positiveInteger = z
  .string()
  .trim()
  .min(1, REQUIRED)
  .refine(isInteger, "Podaj liczbę całkowitą")
  .refine((value) => Number(value) >= 1, "Minimalna wartość to 1");

export const basicInfoSchema = z.object({
  name: z.string().trim().min(3, "Nazwa musi mieć co najmniej 3 znaki"),
  sku: z
    .string()
    .trim()
    .min(1, REQUIRED)
    .max(24, "SKU może mieć maksymalnie 24 znaki")
    .regex(/^[a-zA-Z0-9]+$/, "SKU może zawierać tylko litery i cyfry"),
  description: z.string().trim(),
  manufacturer: z.enum(MANUFACTURERS, { error: "Wybierz producenta" }),
  category: z.enum(CATEGORIES, { error: "Wybierz kategorię" }),
  features: z.array(z.enum(FEATURES)).min(1, "Wybierz co najmniej jedną cechę"),
});

export const pricingSchema = z.object({
  netPrice: amount,
  grossPrice: amount,
  vatRate: z.enum(VAT_RATES, { error: "Wybierz stawkę VAT" }),
  currency: z.enum(CURRENCIES, { error: "Wybierz walutę" }),
});

export const availabilitySchema = z
  .object({
    available: z.boolean(),
    limited: z.boolean(),
    stockQuantity: z.string().trim(),
    minCartQty: positiveInteger,
    maxCartQty: positiveInteger,
  })
  .superRefine((values, ctx) => {
    if (values.limited) {
      if (values.stockQuantity.length === 0) {
        ctx.addIssue({ code: "custom", path: ["stockQuantity"], message: REQUIRED });
      } else if (!isInteger(values.stockQuantity)) {
        ctx.addIssue({
          code: "custom",
          path: ["stockQuantity"],
          message: "Podaj nieujemną liczbę całkowitą",
        });
      }
    }

    // Cross-field check reported on both fields, so fixing either side clears both errors.
    if (
      isInteger(values.minCartQty) &&
      isInteger(values.maxCartQty) &&
      Number(values.minCartQty) > Number(values.maxCartQty)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["minCartQty"],
        message: "Nie może być większa niż maksymalna ilość",
      });
      ctx.addIssue({
        code: "custom",
        path: ["maxCartQty"],
        message: "Nie może być mniejsza niż minimalna ilość",
      });
    }
  });

/** Intersection (not `.extend`) so the step-3 refinement survives composition. */
export const productFormSchema = basicInfoSchema.and(pricingSchema).and(availabilitySchema);

export type ProductFormOutput = z.output<typeof productFormSchema>;

/** Raw input state; see ProductFormOutput for the validated shape. */
export type ProductFormValues = {
  name: string;
  sku: string;
  description: string;
  manufacturer: Manufacturer | "";
  category: Category | "";
  features: Feature[];
  netPrice: string;
  grossPrice: string;
  vatRate: VatRate;
  currency: Currency;
  available: boolean;
  limited: boolean;
  stockQuantity: string;
  minCartQty: string;
  maxCartQty: string;
};

export const defaultProductFormValues: ProductFormValues = {
  name: "",
  sku: "",
  description: "",
  manufacturer: "",
  category: "",
  features: [],
  netPrice: "",
  grossPrice: "",
  vatRate: "23",
  currency: "PLN",
  available: true,
  limited: false,
  stockQuantity: "",
  minCartQty: "1",
  maxCartQty: "10",
};
