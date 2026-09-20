export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  /** Minor currency units (grosze / cents). */
  grossPrice: number;
  currency: "PLN" | "EUR" | "USD";
  available: boolean;
  /** null = unlimited stock */
  stock: number | null;
};

export const products: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 14",
    sku: "MBP14M3PRO",
    category: "Komputery",
    grossPrice: 999900,
    currency: "PLN",
    available: true,
    stock: null,
  },
  {
    id: "2",
    name: "Galaxy S24 Ultra",
    sku: "SGS24U256",
    category: "Telefony",
    grossPrice: 629900,
    currency: "PLN",
    available: true,
    stock: 45,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    sku: "SNWH1000XM5",
    category: "RTV",
    grossPrice: 159900,
    currency: "PLN",
    available: true,
    stock: null,
  },
  {
    id: "4",
    name: "Bosch Serie 6 WAU28P40",
    sku: "BSWAU28P40",
    category: "AGD",
    grossPrice: 329900,
    currency: "PLN",
    available: false,
    stock: 0,
  },
  {
    id: "5",
    name: "Xiaomi Smart Band 8",
    sku: "XMSB8BLK",
    category: "Akcesoria",
    grossPrice: 17900,
    currency: "PLN",
    available: true,
    stock: null,
  },
  {
    id: "6",
    name: "iPad Air 11",
    sku: "IPADAIR11M2",
    category: "Komputery",
    grossPrice: 279900,
    currency: "PLN",
    available: true,
    stock: 12,
  },
  {
    id: "7",
    name: "Logitech MX Master 3S",
    sku: "LGMXM3SGR",
    category: "Akcesoria",
    grossPrice: 49900,
    currency: "PLN",
    available: true,
    stock: null,
  },
];

