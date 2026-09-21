"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon, Alert02Icon, MultiplicationSignCircleIcon, Loading03Icon } from "@hugeicons/core-free-icons"
import { CheckCircleSolidIcon } from "@/components/ui/icons/CheckCircleSolid"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  // Sonner styles [data-sonner-toast][data-styled] with its own font and icon margins; overrides below need !important to win.
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group !font-sans"
      icons={{
        success: (
          <CheckCircleSolidIcon className="size-5 text-success" />
        ),
        info: (
          <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-5" />
        ),
        warning: (
          <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-5" />
        ),
        error: (
          <HugeiconsIcon icon={MultiplicationSignCircleIcon} strokeWidth={2} className="size-5" />
        ),
        loading: (
          <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-5 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-md)",
          "--toast-icon-margin-start": "0px",
          "--toast-icon-margin-end": "0px",
          "--toast-svg-margin-start": "0px",
          "--toast-svg-margin-end": "0px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast !gap-2 !text-sm",
          title: "!leading-5",
          icon: "!size-5",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
