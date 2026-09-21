"use client";

import { useQueryState } from "nuqs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { AvailabilityBadge } from "@/components/products/AvailabilityBadge";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductListFooter } from "@/components/products/ProductListFooter";
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
      <div className="hidden overflow-hidden rounded-lg border bg-card md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead>Cena Brutto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Magazyn</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
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
          </TableBody>
        </Table>
        <ProductListFooter {...footerProps} />
      </div>

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
