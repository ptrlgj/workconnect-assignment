"use client";

import { useQueryState } from "nuqs";
import { TableCell, TableRow } from "@/components/ui/Table";
import { AvailabilityBadge } from "@/components/products/AvailabilityBadge";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductListFooter } from "@/components/products/ProductListFooter";
import { ProductTable } from "@/components/products/ProductTable";
import { formatPrice, formatStock } from "@/lib/format";
import { clampPage, pageParser } from "@/lib/product-list-params";
import type { Product } from "@/lib/products";

const PAGE_SIZE = 5;

type ProductListProps = { products: Product[] };

export function ProductList({ products }: ProductListProps) {
  const [requestedPage, setPage] = useQueryState("page", pageParser);

  // Clamp per render; page count changes as products are added.
  const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const page = clampPage(requestedPage, pageCount);
  const pageItems = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const footerProps = { page, pageCount, totalItems: products.length, onPageChange: setPage };

  return (
    <>
      <ProductTable footer={<ProductListFooter {...footerProps} />}>
        {pageItems.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="truncate font-medium" title={product.name}>
              {product.name}
            </TableCell>
            <TableCell className="text-muted-foreground text-xs">{product.sku}</TableCell>
            <TableCell className="text-muted-foreground">{product.category}</TableCell>
            <TableCell className="font-medium">
              {formatPrice(product.grossPrice, product.currency)}
            </TableCell>
            <TableCell>
              <AvailabilityBadge available={product.available} />
            </TableCell>
            <TableCell>{formatStock(product.stock)}</TableCell>
          </TableRow>
        ))}
      </ProductTable>

      <div className="flex flex-col gap-6 md:hidden">
        <ul className="flex flex-col gap-2">
          {pageItems.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <ProductListFooter {...footerProps} layout="stacked" />
      </div>
    </>
  );
}
