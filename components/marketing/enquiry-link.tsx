"use client"

import Link from "next/link"
import { IconArrowUpRight } from "@tabler/icons-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ContactValues } from "@/lib/contact"
import { useEnquiry } from "./enquiry-provider"

type EnquiryLinkProps = {
  children: React.ReactNode
  topic?: ContactValues["topic"]
  academy?: boolean
  appearance?: "button" | "card" | "text"
  className?: string
}

export function EnquiryLink({
  children,
  topic = "Help me choose",
  academy = false,
  appearance = "button",
  className,
}: EnquiryLinkProps) {
  const { select } = useEnquiry()
  return (
    <Link
      href="/#contact-form"
      onClick={() =>
        select({ topic, purpose: academy ? "Club or academy" : "Individual" })
      }
      className={cn(
        appearance === "button" &&
          buttonVariants({ variant: "brand", size: "brand" }),
        appearance === "text" &&
          "group inline-flex items-center gap-3 text-sm font-semibold underline-offset-8 hover:underline",
        className
      )}
    >
      {children}
      {appearance !== "card" && (
        <IconArrowUpRight data-icon="inline-end" aria-hidden="true" />
      )}
    </Link>
  )
}
