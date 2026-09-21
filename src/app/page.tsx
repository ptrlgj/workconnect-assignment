import { ProductsView } from "@/components/products/ProductsView";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-6 md:gap-6 md:px-8">
      <ProductsView initialProducts={products} />
    </main>
  );
}
