import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatProductCount } from "@/lib/format";
import { cn } from "@/lib/utils";

type ProductListFooterProps = {
  page: number;
  pageCount: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const linkClass = "rounded-md text-foreground";
const disabledClass = "pointer-events-none opacity-50";
const activeClass =
  "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground";

export function ProductListFooter({
  page,
  pageCount,
  totalItems,
  onPageChange,
  className,
}: ProductListFooterProps) {
  const isFirst = page <= 1;
  const isLast = page >= pageCount;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const goTo = (target: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    onPageChange(target);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-t bg-muted px-4 py-4 text-xs text-muted-foreground",
        className,
      )}
    >
      <p>
        Strona {page} z {pageCount} · {formatProductCount(totalItems)}
      </p>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text="Wstecz"
              size="sm"
              aria-disabled={isFirst}
              tabIndex={isFirst ? -1 : undefined}
              className={cn(linkClass, isFirst && disabledClass)}
              onClick={goTo(page - 1)}
            />
          </PaginationItem>
          {pages.map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                href="#"
                size="icon-sm"
                isActive={n === page}
                className={cn(linkClass, n === page && activeClass)}
                onClick={goTo(n)}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              text="Dalej"
              size="sm"
              aria-disabled={isLast}
              tabIndex={isLast ? -1 : undefined}
              className={cn(linkClass, isLast && disabledClass)}
              onClick={goTo(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
