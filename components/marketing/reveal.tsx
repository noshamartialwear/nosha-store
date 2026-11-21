"use client"

import { animate, inView } from "motion"
import { useEffect, useRef } from "react"

// Server HTML stays visible. Animate only content that starts below the fold.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!element || preference.matches) return
    let stop = () => {}
    let animation: ReturnType<typeof animate> | undefined
    const observer = new IntersectionObserver(([entry]) => {
      observer.disconnect()
      if (!entry || entry.boundingClientRect.top < window.innerHeight) return
      element.style.opacity = "0"
      element.style.transform = "translateY(24px)"
      stop = inView(
        element,
        () => {
          animation = animate(
            element,
            { opacity: 1, transform: "translateY(0px)" },
            { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }
          )
          stop()
        },
        { margin: "0px 0px -5% 0px" }
      )
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      stop()
      animation?.stop()
      element.style.opacity = ""
      element.style.transform = ""
    }
  }, [delay])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
