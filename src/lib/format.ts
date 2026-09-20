import type { Product } from "@/lib/products";

const pluralRules = new Intl.PluralRules("pl-PL");
const productForms: Record<Intl.LDMLPluralRule, string> = {
  zero: "produktów",
  one: "produkt",
  two: "produkty",
  few: "produkty",
  many: "produktów",
  other: "produktów",
};

export function formatProductCount(count: number) {
  return `${count} ${productForms[pluralRules.select(count)]}`;
}

export function formatPrice(minorUnits: number, currency: Product["currency"]) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency }).format(minorUnits / 100);
}

export function formatStock(stock: Product["stock"]) {
  return stock === null ? "—" : String(stock);
}
