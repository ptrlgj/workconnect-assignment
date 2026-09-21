import { cn } from "@/lib/utils";

const STATUS = {
  available: { label: "Dostępny", className: "bg-success-muted text-success" },
  unavailable: { label: "Niedostępny", className: "bg-destructive/10 text-destructive" },
} as const;

type AvailabilityBadgeProps = React.ComponentProps<"span"> & { available: boolean };

export function AvailabilityBadge({ available, className, ...props }: AvailabilityBadgeProps) {
  const status = STATUS[available ? "available" : "unavailable"];
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        status.className,
        className,
      )}
      {...props}
    >
      {status.label}
    </span>
  );
}
