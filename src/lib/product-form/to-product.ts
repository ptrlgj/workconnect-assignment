import { parseAmount, toMinorUnits } from "@/lib/product-form/pricing";
import type { ProductFormOutput } from "@/lib/product-form/schema";
import type { Product } from "@/lib/products";

export function toProduct(values: ProductFormOutput, id: string): Product {
  return {
    id,
    name: values.name,
    sku: values.sku.toUpperCase(),
    description: values.description,
    manufacturer: values.manufacturer,
    category: values.category,
    features: values.features,
    netPrice: toMinorUnits(parseAmount(values.netPrice) ?? 0),
    grossPrice: toMinorUnits(parseAmount(values.grossPrice) ?? 0),
    vatRate: values.vatRate,
    currency: values.currency,
    available: values.available,
    stock: values.limited ? Number(values.stockQuantity) : null,
    minCartQty: Number(values.minCartQty),
    maxCartQty: Number(values.maxCartQty),
  };
}
