import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import { buttonVariants } from "@/components/ui/button"

export function SectionLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={buttonVariants({ variant: "brand", size: "brand" })}
    >
      {children}
      <IconArrowRight data-icon="inline-end" />
    </Link>
  )
}
