import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { ProductList } from "@/components/products/product-list";
import { formatProductCount } from "@/lib/format";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-6 md:gap-6 md:px-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold tracking-tight">Produkty</h1>
          <p className="text-sm text-muted-foreground">
            {formatProductCount(products.length)} w katalogu
          </p>
        </div>
        <Button>
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
          Dodaj produkt
        </Button>
      </header>

      <ProductList products={products} />
    </main>
  );
}
