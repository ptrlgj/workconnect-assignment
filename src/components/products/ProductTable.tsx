import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

type ProductTableProps = { children: React.ReactNode; footer: React.ReactNode };

export function ProductTable({ children, footer }: ProductTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-lg border bg-card md:block">
      {/* Mockup proportions (357px name, 176px each other column) from lg only; on md a fixed layout overlaps cells. */}
      <Table className="lg:table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="lg:w-[29%]">Nazwa</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Kategoria</TableHead>
            <TableHead>Cena Brutto</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Magazyn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
      {footer}
    </div>
  );
}
