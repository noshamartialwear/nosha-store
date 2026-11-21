"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { animate } from "motion"
import {
  IconArrowLeft,
  IconArrowRight,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Container } from "./section-primitives"
import { SectionLink } from "./section-link"

const slides = [
  {
    image: "/images/hero-together-wrap.webp",
    label: "Together",
    title: "Stronger",
    accent: "tomorrow.",
    description:
      "Different arts. Shared discipline. Gear for the practice that moves you forward.",
    alt: "Four Nosha athletes in karate, taekwondo and judo uniforms, including a karate gi with its lapels closed higher at the neck",
  },
  {
    image: "/images/hero-judo.webp",
    label: "Judo",
    title: "Built for",
    accent: "the journey.",
    description:
      "Grip. Balance. Begin again. Find your judogi and make every session count.",
    alt: "Two athletes practising a standing judo grip drill in Nosha uniforms",
  },
  {
    image: "/images/hero-grappling.webp",
    label: "Practice",
    title: "Made for",
    accent: "the mat.",
    description:
      "From grip work to groundwork. Find the cut and feel that fit your practice.",
    alt: "Two training partners practising a controlled ground grappling drill in an academy",
  },
  {
    image: "/images/hero-uniforms.webp",
    label: "Collection",
    title: "Your art.",
    accent: "Your gear.",
    description:
      "The gi you fold. The bag you pack. The familiar ritual of getting ready to train.",
    alt: "White karate and taekwondo uniforms, a blue judo gi and a black gi folded on a wooden dojo bench",
  },
  {
    image: "/images/hero-fabric.webp",
    label: "Details",
    title: "Every stitch.",
    accent: "With purpose.",
    description:
      "The weave. The lapel. The feel of the fabric. It’s the details that make a uniform yours.",
    alt: "Close-up of woven white gi fabric, layered lapels and a black martial arts belt on a wooden bench",
  },
] as const

export function Hero() {
  const [active, setActive] = useState(0)
  const [rotation, setRotation] = useState<"default" | "playing" | "paused">(
    "default"
  )
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const reducedMotion = useReducedMotion()
  const region = useRef<HTMLElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const swipe = useRef<{ x: number; y: number; pointerId: number } | null>(null)
  const rotationRequested =
    rotation === "playing" || (rotation === "default" && !reducedMotion)
  const playing = rotationRequested && !focused && visible && pageVisible
  const slide = slides[active]

  useEffect(() => {
    if (reducedMotion || !copy.current) return
    const animation = animate(
      copy.current,
      { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] },
      { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
    )
    return () => animation.stop()
  }, [active, reducedMotion])

  useEffect(() => {
    const element = region.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(Boolean(entry?.isIntersecting))
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateVisibility = () =>
      setPageVisible(document.visibilityState !== "hidden")
    updateVisibility()
    document.addEventListener("visibilitychange", updateVisibility)
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility)
  }, [])

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % slides.length),
      5000
    )
    return () => window.clearTimeout(timer)
  }, [active, playing])

  function changeSlide(index: number) {
    setActive((index + slides.length) % slides.length)
  }

  return (
    <section
      ref={region}
      id="home"
      aria-roledescription="carousel"
      aria-label="Nosha training stories"
      onPointerDownCapture={(event) => {
        setFocused(false)
        swipe.current = null
        if (event.pointerType !== "touch" && event.pointerType !== "pen") return
        if (
          event.target instanceof Element &&
          event.target.closest("a, button, input, select, textarea")
        )
          return
        swipe.current = {
          x: event.clientX,
          y: event.clientY,
          pointerId: event.pointerId,
        }
        event.currentTarget.setPointerCapture?.(event.pointerId)
      }}
      onPointerUp={(event) => {
        const start = swipe.current
        swipe.current = null
        if (!start || start.pointerId !== event.pointerId) return
        const dx = event.clientX - start.x
        const dy = event.clientY - start.y
        if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          changeSlide(active + (dx < 0 ? 1 : -1))
        }
      }}
      onPointerCancel={() => {
        swipe.current = null
      }}
      onFocusCapture={(event) => {
        if (
          event.target instanceof HTMLElement &&
          event.target.matches(":focus-visible")
        )
          setFocused(true)
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false)
      }}
      className="relative isolate touch-pan-y overflow-hidden bg-inverse text-inverse-foreground"
    >
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        {slides.map((item, index) => (
          <Image
            key={item.image}
            src={item.image}
            alt=""
            fill
            sizes="100vw"
            preload={index === 0}
            className={cn(
              "object-cover object-[65%_center] transition-opacity duration-700 motion-reduce:transition-none",
              index === active ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-inverse/70 via-inverse/35 to-inverse/10" />
        <div className="absolute inset-0 bg-linear-to-t from-inverse/45 via-transparent to-inverse/20" />
      </div>
      <Container className="relative flex flex-col pt-32 md:min-h-180 md:justify-center md:pt-40 md:pb-28 lg:min-h-[min(56rem,100svh)] lg:pt-36">
        <div ref={copy} className="max-w-xl md:w-[48%]">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase">
            <span className="h-px w-8 bg-primary" />
            The practice. The progress. The purpose.
          </p>
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${slides.length}: ${slide.label}`}
            aria-live={playing ? "off" : "polite"}
          >
            <h1
              id="hero-heading"
              className="font-heading text-[clamp(4rem,6.8vw,7rem)] leading-[0.92] font-extrabold tracking-tight uppercase italic"
            >
              {slide.title}
              <br />
              <span className="text-primary">{slide.accent}</span>
            </h1>
            <p className="mt-7 max-w-96 text-base leading-relaxed text-inverse-foreground/80 lg:text-lg">
              {slide.description}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <SectionLink href="#gear">Explore our gear</SectionLink>
            <a
              href="#about"
              className="group flex items-center gap-2 text-sm font-semibold"
            >
              Our story
              <IconArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4 text-[0.625rem] tracking-widest text-inverse-foreground/65 uppercase md:mt-12">
            <span>Karate</span>
            <span className="text-primary" aria-hidden="true">
              /
            </span>
            <span>Taekwondo</span>
            <span className="text-primary" aria-hidden="true">
              /
            </span>
            <span>Judo</span>
          </div>
        </div>
        <div className="relative -mx-5 mt-10 aspect-[5/4] sm:-mx-8 md:hidden">
          {slides.map((item, index) => (
            <Image
              key={item.image}
              src={item.image}
              alt={index === active ? item.alt : ""}
              fill
              sizes="100vw"
              className={cn(
                "object-cover object-[78%_center] transition-opacity duration-500 motion-reduce:transition-none",
                index === active ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      </Container>
      <div className="relative border-t border-inverse-foreground/15 bg-inverse md:absolute md:inset-x-0 md:bottom-0 md:bg-inverse/20 md:backdrop-blur-sm">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start sm:gap-6">
            {slides.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-label={`Show slide ${index + 1}: ${item.label}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => changeSlide(index)}
                className="group flex min-h-10 min-w-6 cursor-pointer flex-col justify-center gap-2 text-left"
              >
                <span
                  className={cn(
                    "text-[0.625rem] font-semibold tracking-widest uppercase transition-colors sm:text-xs",
                    active === index
                      ? "text-inverse-foreground"
                      : "text-inverse-foreground/50 group-hover:text-inverse-foreground"
                  )}
                >
                  <span className="text-primary sm:mr-2">0{index + 1}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
                <span className="h-0.5 w-full overflow-hidden bg-inverse-foreground/20">
                  <span
                    className={cn(
                      "block h-full origin-left bg-primary transition-transform duration-500 motion-reduce:transition-none",
                      active === index ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="heroControl"
              size="icon-touch"
              aria-label="Previous hero slide"
              onClick={() => changeSlide(active - 1)}
            >
              <IconArrowLeft />
            </Button>
            <Button
              variant="heroControl"
              size="icon-touch"
              aria-label={
                rotationRequested ? "Pause slideshow" : "Play slideshow"
              }
              onClick={() => {
                setRotation(rotationRequested ? "paused" : "playing")
                setFocused(false)
              }}
            >
              {rotationRequested ? <IconPlayerPause /> : <IconPlayerPlay />}
            </Button>
            <Button
              variant="heroControl"
              size="icon-touch"
              aria-label="Next hero slide"
              onClick={() => changeSlide(active + 1)}
            >
              <IconArrowRight />
            </Button>
          </div>
        </Container>
      </div>
    </section>
  )
}
