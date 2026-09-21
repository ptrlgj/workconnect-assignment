"use client";

import { usePathname } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { formatProductCount } from "@/lib/format";
import { serializeListParams } from "@/lib/product-list-params";
import { cn } from "@/lib/utils";

const layoutClass = {
  inline: "flex items-center justify-between gap-4 border-t bg-gray-50 px-4 py-4",
  stacked: "flex flex-col items-center gap-4 text-center",
};

type ProductListFooterProps = {
  page: number;
  pageCount: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  layout?: keyof typeof layoutClass;
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
  layout = "inline",
}: ProductListFooterProps) {
  const pathname = usePathname();
  const isFirst = page <= 1;
  const isLast = page >= pageCount;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const prevPage = Math.max(page - 1, 1);
  const nextPage = Math.min(page + 1, pageCount);

  // Real hrefs for copy-link / middle-click; click does a shallow nuqs update.
  const pageLinkProps = (target: number) => ({
    href: serializeListParams(pathname, { page: target }),
    onClick: (event: React.MouseEvent) => {
      event.preventDefault();
      onPageChange(target);
    },
  });

  return (
    <div className={cn("text-xs text-muted-foreground", layoutClass[layout])}>
      <p>
        Strona {page} z {pageCount} · {formatProductCount(totalItems)}
      </p>

      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-0.5">
          <PaginationItem>
            <PaginationPrevious
              {...pageLinkProps(prevPage)}
              text="Wstecz"
              size="sm"
              aria-disabled={isFirst}
              tabIndex={isFirst ? -1 : undefined}
              className={cn(linkClass, isFirst && disabledClass)}
            />
          </PaginationItem>
          {pages.map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                {...pageLinkProps(n)}
                size="icon-sm"
                isActive={n === page}
                className={cn(linkClass, n === page && activeClass)}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              {...pageLinkProps(nextPage)}
              text="Dalej"
              size="sm"
              aria-disabled={isLast}
              tabIndex={isLast ? -1 : undefined}
              className={cn(linkClass, isLast && disabledClass)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
