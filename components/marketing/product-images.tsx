"use client"

import Image from "next/image"
import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"
import { useProductPreview } from "./product-preview-cycle"

const CardSideContext = createContext<boolean | null>(null)

export function ProductPreviewCard({
  back,
  children,
}: {
  back?: string
  children: React.ReactNode
}) {
  const active = useProductPreview()
  const [hoveredSide, setHoveredSide] = useState<boolean | null>(null)
  const [focusedSide, setFocusedSide] = useState<boolean | null>(null)
  const automaticSide = Boolean(back && active.includes(back))

  return (
    <div
      className="h-full"
      onPointerEnter={(event) => {
        if (back && event.pointerType !== "touch")
          setHoveredSide(focusedSide ?? !automaticSide)
      }}
      onPointerLeave={() => setHoveredSide(null)}
      onPointerCancel={() => setHoveredSide(null)}
      onFocusCapture={(event) => {
        if (back && event.target.matches(":focus-visible"))
          setFocusedSide(hoveredSide ?? !automaticSide)
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocusedSide(null)
      }}
    >
      <CardSideContext.Provider value={hoveredSide ?? focusedSide}>
        {children}
      </CardSideContext.Provider>
    </div>
  )
}

type ProductImagesProps = {
  front: string
  back?: string
  description: string
}

export function ProductImages({
  front,
  back,
  description,
}: ProductImagesProps) {
  const active = useProductPreview()
  const heldSide = useContext(CardSideContext)
  const showBack = Boolean(back && (heldSide ?? active.includes(back)))
  return (
    <>
      <Image
        src={front}
        alt={description}
        fill
        sizes="(min-width: 1024px) 18vw, 45vw"
        className={cn(
          "object-cover transition-[opacity,transform] duration-500 motion-safe:group-hover:scale-105 motion-reduce:transition-none",
          showBack && "opacity-0"
        )}
      />
      {back && (
        <Image
          src={back}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 18vw, 45vw"
          className={cn(
            "object-cover transition-[opacity,transform] duration-500 motion-safe:group-hover:scale-105 motion-reduce:transition-none",
            showBack ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </>
  )
}
