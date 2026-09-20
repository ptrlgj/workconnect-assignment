import { cn } from "@/lib/utils";

const STATUS = {
  available: { label: "Dostępny", className: "bg-green-600/10 text-green-600" },
  unavailable: { label: "Niedostępny", className: "bg-destructive/10 text-destructive" },
} as const;

type AvailabilityBadgeProps = React.ComponentProps<"span"> & { available: boolean };

export function AvailabilityBadge({ available, className, ...props }: AvailabilityBadgeProps) {
  const status = STATUS[available ? "available" : "unavailable"];
  return (
    <span
      className={cn(
        "inline-flex h-5 w-fit shrink-0 items-center rounded-full px-2 text-xs font-medium whitespace-nowrap",
        status.className,
        className,
      )}
      {...props}
    >
      {status.label}
    </span>
  );
}
