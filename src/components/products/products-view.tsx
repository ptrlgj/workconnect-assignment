"use client";

import { useState } from "react";

import { AddProductDialog } from "@/components/products/add-product-dialog";
import { ProductList } from "@/components/products/product-list";
import { formatProductCount } from "@/lib/format";
import type { Product } from "@/lib/products";

type ProductsViewProps = { initialProducts: Product[] };

export function ProductsView({ initialProducts }: ProductsViewProps) {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product: Product) => setProducts((prev) => [...prev, product]);

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold tracking-tight">Produkty</h1>
          <p className="text-sm text-muted-foreground">{formatProductCount(products.length)} w katalogu</p>
        </div>
        <AddProductDialog onAdd={addProduct} />
      </header>

      <ProductList products={products} />
    </>
  );
}
