"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvailabilityBadge } from "@/components/products/availability-badge";
import { ProductListFooter } from "@/components/products/product-list-footer";
import { formatPrice, formatStock } from "@/lib/format";
import type { Product } from "@/lib/products";

const PAGE_SIZE = 5;

type ProductListProps = { products: Product[] };

export function ProductList({ products }: ProductListProps) {
  const [requestedPage, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const page = Math.min(Math.max(requestedPage, 1), pageCount);
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

      <ul className="flex flex-col gap-3 md:hidden">
        {pageItems.map((product) => (
          <li key={product.id}>
            <Card size="sm" className="rounded-lg ring-border">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.sku}</CardDescription>
                <CardAction>
                  <AvailabilityBadge available={product.available} />
                </CardAction>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-md bg-muted p-3">
                  <dt className="text-muted-foreground">Kategoria</dt>
                  <dd className="text-right">{product.category}</dd>
                  <dt className="text-muted-foreground">Cena brutto</dt>
                  <dd className="text-right">
                    {formatPrice(product.grossPrice, product.currency)}
                  </dd>
                  <dt className="text-muted-foreground">Magazyn</dt>
                  <dd className="text-right">{formatStock(product.stock)}</dd>
                </dl>
              </CardContent>
            </Card>
          </li>
        ))}
        <li>
          <ProductListFooter {...footerProps} className="rounded-lg border" />
        </li>
      </ul>
    </>
  );
}
