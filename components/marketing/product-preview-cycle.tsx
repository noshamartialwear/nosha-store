"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { chooseProductBacks } from "@/lib/product-previews"

const PreviewContext = createContext<readonly string[]>([])

export function useProductPreview() {
  return useContext(PreviewContext)
}

export function ProductPreviewCycle({
  images,
  children,
}: {
  images: string[]
  children: React.ReactNode
}) {
  const [active, setActive] = useState<string[]>([])
  const [playback, setPlayback] = useState<"default" | "playing" | "paused">(
    "default"
  )
  const [visible, setVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const reducedMotion = useReducedMotion()
  const region = useRef<HTMLDivElement>(null)
  const requested =
    playback === "playing" || (playback === "default" && !reducedMotion)
  const playing = requested && visible && pageVisible && images.length > 0

  useEffect(() => {
    const element = region.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(Boolean(entry?.isIntersecting))
    )
    observer.observe(element)
    const updateVisibility = () =>
      setPageVisible(document.visibilityState !== "hidden")
    updateVisibility()
    document.addEventListener("visibilitychange", updateVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(
      () => setActive(chooseProductBacks(images)),
      3000
    )
    return () => window.clearInterval(timer)
  }, [playing, images])

  return (
    <div ref={region}>
      <PreviewContext.Provider value={active}>
        {children}
      </PreviewContext.Provider>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          See the details, front and back.
        </p>
        <Button
          variant="ghost"
          size="sm"
          aria-label={
            requested ? "Pause product previews" : "Play product previews"
          }
          onClick={() => setPlayback(requested ? "paused" : "playing")}
          className="min-h-11 gap-2"
        >
          {requested ? (
            <IconPlayerPause aria-hidden="true" />
          ) : (
            <IconPlayerPlay aria-hidden="true" />
          )}
          {requested ? "Pause previews" : "Play previews"}
        </Button>
      </div>
    </div>
  )
}
