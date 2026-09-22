import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import type { ProductFormStep } from "@/lib/product-form/steps";
import { cn } from "@/lib/utils";

type StepperProps = { steps: ProductFormStep[]; currentStep: number; className?: string };

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <ol className={cn("flex items-start gap-4 md:items-center", className)}>
      {steps.map((step, index) => {
        const status = index < currentStep ? "complete" : index === currentStep ? "current" : "upcoming";
        return (
          <li
            key={step.id}
            aria-current={status === "current" ? "step" : undefined}
            className="flex min-w-0 flex-1 items-start gap-4 md:flex-none md:items-center"
          >
            {index > 0 && (
              <div
                aria-hidden
                className={cn("hidden h-px w-16 shrink-0 md:block", status === "upcoming" ? "bg-border" : "bg-primary")}
              />
            )}
            <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  status === "upcoming"
                    ? "border bg-accent text-muted-foreground"
                    : "bg-primary text-primary-foreground",
                )}
              >
                {status === "complete" ? (
                  <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} className="size-4" />
                ) : (
                  index + 1
                )}
              </span>
              <span className="flex flex-col gap-0.5">
                <span
                  className={cn(
                    "text-sm font-medium",
                    status === "upcoming" ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {step.title}
                </span>
                <span className="text-xs text-muted-foreground">{step.description}</span>
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
