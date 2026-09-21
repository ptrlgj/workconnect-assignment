"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { ProductForm } from "@/components/products/product-form/ProductForm";
import type { ProductFormOutput } from "@/lib/product-form/schema";
import { toProduct } from "@/lib/product-form/to-product";
import type { Product } from "@/lib/products";

type AddProductDialogProps = { onAdd: (product: Product) => void };

export function AddProductDialog({ onAdd }: AddProductDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (values: ProductFormOutput) => {
    onAdd(toProduct(values, crypto.randomUUID()));
    setOpen(false);
    toast.success("Produkt został dodany");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
        Dodaj produkt
      </DialogTrigger>

      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden rounded-xl p-0 sm:max-w-none md:max-w-[720px] max-md:top-0 max-md:left-0 max-md:h-dvh max-md:max-h-none max-md:max-w-none max-md:translate-x-0 max-md:translate-y-0 max-md:rounded-none">
        <DialogHeader className="border-b px-4 py-6">
          <DialogTitle>Dodaj nowy produkt</DialogTitle>
          <DialogDescription className="sr-only">
            Trzykrokowy formularz: informacje podstawowe, cena, dostępność i stany magazynowe.
          </DialogDescription>
        </DialogHeader>

        <ProductForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
