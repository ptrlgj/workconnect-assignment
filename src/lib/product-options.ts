export const MANUFACTURERS = [
  "Apple",
  "Samsung",
  "Sony",
  "Bosch",
  "Xiaomi",
  "Logitech",
  "Dell",
  "Lenovo",
] as const;
export type Manufacturer = (typeof MANUFACTURERS)[number];

export const CATEGORIES = ["Komputery", "Telefony", "RTV", "AGD", "Akcesoria"] as const;
export type Category = (typeof CATEGORIES)[number];

export const FEATURES = [
  "Bluetooth",
  "WiFi",
  "USB-C",
  "Wodoodporny",
  "Bezprzewodowy",
  "Ekologiczny",
  "Premium",
] as const;
export type Feature = (typeof FEATURES)[number];

export const VAT_RATES = ["0", "5", "8", "23"] as const;
export type VatRate = (typeof VAT_RATES)[number];

export const CURRENCIES = ["PLN", "EUR", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];
