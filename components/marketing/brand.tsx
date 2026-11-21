import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/#home"
      className="inline-flex w-40 shrink-0 sm:w-48"
      aria-label="Nosha Martial Wear home"
    >
      <Image
        src="/images/brand-logo.webp"
        width={480}
        height={95}
        alt="Nosha Martial Wear"
        className={cn(
          "h-auto w-full",
          light
            ? "mix-blend-screen hue-rotate-180 invert"
            : "mix-blend-multiply"
        )}
      />
    </Link>
  )
}
