import type { ProductFormValues } from "@/lib/product-form/schema";

export type ProductFormStep = {
  id: "basic-info" | "pricing" | "availability";
  title: string;
  description: string;
  /** Fields validated before the user may leave this step. */
  fields: (keyof ProductFormValues)[];
};

export const PRODUCT_FORM_STEPS: ProductFormStep[] = [
  {
    id: "basic-info",
    title: "Informacje",
    description: "Dane podstawowe",
    fields: ["name", "sku", "description", "manufacturer", "category", "features"],
  },
  {
    id: "pricing",
    title: "Cena",
    description: "Dane cenowe",
    fields: ["netPrice", "grossPrice", "vatRate", "currency"],
  },
  {
    id: "availability",
    title: "Dostępność",
    description: "Stany magazynowe",
    fields: ["available", "limited", "stockQuantity", "minCartQty", "maxCartQty"],
  },
];
