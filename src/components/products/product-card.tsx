import { AvailabilityBadge } from "@/components/products/availability-badge";
import { formatPrice, formatStock } from "@/lib/format";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductCardProps = { product: Product };

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-[12px] border bg-card p-3">
      <header className="flex items-center gap-2.5">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h2 className="truncate text-base font-medium">{product.name}</h2>
          <p className="truncate text-xs text-muted-foreground">{product.sku}</p>
        </div>
        <AvailabilityBadge available={product.available} />
      </header>

      <dl className="grid grid-cols-3 gap-1 rounded-md bg-accent p-3">
        <Field label="Kategoria">{product.category}</Field>
        <Field label="Cena brutto" className="font-medium">
          {formatPrice(product.grossPrice, product.currency)}
        </Field>
        <Field label="Magazyn">{formatStock(product.stock)}</Field>
      </dl>
    </article>
  );
}

type FieldProps = { label: string; children: React.ReactNode; className?: string };

function Field({ label, children, className }: FieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("truncate text-sm", className)}>{children}</dd>
    </div>
  );
}
