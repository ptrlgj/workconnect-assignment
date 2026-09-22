import type { Category, Currency, Feature, Manufacturer, VatRate } from "@/lib/product-options";

export type Product = {
  id: string;
  name: string;
  sku: string;
  description: string;
  manufacturer: Manufacturer;
  category: Category;
  features: Feature[];
  /** Prices in minor currency units (grosze / cents). */
  netPrice: number;
  grossPrice: number;
  vatRate: VatRate;
  currency: Currency;
  available: boolean;
  /** null = unlimited stock */
  stock: number | null;
  minCartQty: number;
  maxCartQty: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 14\"",
    sku: "MBP14M3PRO",
    description: "Laptop z układem M3 Pro, 18 GB RAM, 512 GB SSD.",
    manufacturer: "Apple",
    category: "Komputery",
    features: ["Bluetooth", "WiFi", "USB-C", "Premium"],
    netPrice: 812927,
    grossPrice: 999900,
    vatRate: "23",
    currency: "PLN",
    available: true,
    stock: null,
    minCartQty: 1,
    maxCartQty: 5,
  },
  {
    id: "2",
    name: "Galaxy S24 Ultra",
    sku: "SGS24U256",
    description: "Smartfon 6.8\", 256 GB, rysik S Pen w zestawie.",
    manufacturer: "Samsung",
    category: "Telefony",
    features: ["Bluetooth", "WiFi", "USB-C", "Wodoodporny"],
    netPrice: 512114,
    grossPrice: 629900,
    vatRate: "23",
    currency: "PLN",
    available: true,
    stock: 45,
    minCartQty: 1,
    maxCartQty: 3,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    sku: "SNWH1000XM5",
    description: "Słuchawki nauszne z aktywną redukcją szumów.",
    manufacturer: "Sony",
    category: "RTV",
    features: ["Bluetooth", "Bezprzewodowy", "Premium"],
    netPrice: 130000,
    grossPrice: 159900,
    vatRate: "23",
    currency: "PLN",
    available: true,
    stock: null,
    minCartQty: 1,
    maxCartQty: 10,
  },
  {
    id: "4",
    name: "Bosch Serie 6 WAU28P40",
    sku: "BSWAU28P40",
    description: "Pralka 9 kg, 1400 obr./min, klasa energetyczna A.",
    manufacturer: "Bosch",
    category: "AGD",
    features: ["Ekologiczny"],
    netPrice: 268211,
    grossPrice: 329900,
    vatRate: "23",
    currency: "PLN",
    available: false,
    stock: 0,
    minCartQty: 1,
    maxCartQty: 2,
  },
  {
    id: "5",
    name: "Xiaomi Smart Band 8",
    sku: "XMSB8BLK",
    description: "Opaska fitness z ekranem AMOLED 1.62\".",
    manufacturer: "Xiaomi",
    category: "Akcesoria",
    features: ["Bluetooth", "Wodoodporny", "Bezprzewodowy"],
    netPrice: 14553,
    grossPrice: 17900,
    vatRate: "23",
    currency: "PLN",
    available: true,
    stock: null,
    minCartQty: 1,
    maxCartQty: 10,
  },
  {
    id: "6",
    name: "iPad Air 11",
    sku: "IPADAIR11M2",
    description: "Tablet z układem M2, 128 GB, Wi-Fi.",
    manufacturer: "Apple",
    category: "Komputery",
    features: ["Bluetooth", "WiFi", "USB-C"],
    netPrice: 227561,
    grossPrice: 279900,
    vatRate: "23",
    currency: "PLN",
    available: true,
    stock: 12,
    minCartQty: 1,
    maxCartQty: 5,
  }
];
