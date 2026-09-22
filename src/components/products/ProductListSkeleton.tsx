import { ProductTable } from "@/components/products/ProductTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { TableCell, TableRow } from "@/components/ui/Table";
import { cn } from "@/lib/utils";

const ROWS = 5;
// name, SKU, category, price, badge, stock
const CELL_SKELETONS = [
  "h-4 w-4/5 rounded-md",
  "h-3 w-3/5 rounded-md",
  "h-4 w-1/2 rounded-md",
  "h-4 w-2/3 rounded-md",
  "h-5 w-20 rounded-full",
  "h-4 w-1/4 rounded-md",
];
const range = (length: number) => Array.from({ length }, (_, i) => i);

export function ProductListSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Ładowanie listy produktów">
      <ProductTable footer={<FooterSkeleton className="border-t bg-gray-50 px-4 py-4" />}>
        {range(ROWS).map((row) => (
          <TableRow key={row}>
            {CELL_SKELETONS.map((className, col) => (
              <TableCell key={col}>
                <Skeleton className={className} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </ProductTable>

      <div className="flex flex-col gap-6 md:hidden">
        <ul className="flex flex-col gap-2">
          {range(ROWS).map((row) => (
            <li key={row} className="flex flex-col gap-2 rounded-[12px] border bg-card p-3">
              <div className="flex items-center gap-2.5">
                <div className="flex flex-1 flex-col gap-1">
                  <Skeleton className="h-5 w-2/3 rounded-md" />
                  <Skeleton className="h-3 w-1/3 rounded-md" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-16 rounded-md" />
            </li>
          ))}
        </ul>
        <FooterSkeleton className="items-center" />
      </div>
    </div>
  );
}

function FooterSkeleton({ className }: { className: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Skeleton className="h-8 w-48 rounded-md" />
    </div>
  );
}
