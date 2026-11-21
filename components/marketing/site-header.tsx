"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { IconArrowUpRight, IconMenu2 } from "@tabler/icons-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Brand } from "./brand"
import { navigation } from "./content"
import { Container } from "./section-primitives"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("#home")
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    const sections = [...navigation.map(({ href }) => href), "#contact-form"]
      .map((href) => document.querySelector(href))
      .filter((item): item is Element => Boolean(item))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [])
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-border bg-background/95 text-foreground shadow-sm backdrop-blur-lg"
          : "border-inverse-foreground/15 bg-inverse/10 text-inverse-foreground"
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6 lg:h-24">
        <Brand light={!scrolled && !open} />
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${link.href}`}
                  aria-current={active === link.href ? "location" : undefined}
                  className="group relative py-3 text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100",
                      active === link.href ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/#contact-form"
            className={cn(
              buttonVariants({ variant: "brand", size: "brand" }),
              "hidden sm:inline-flex"
            )}
          >
            Let’s talk
            <IconArrowUpRight data-icon="inline-end" />
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant={scrolled ? "ghost" : "heroControl"}
                  size="icon-touch"
                  className="lg:hidden"
                  aria-label="Open navigation"
                />
              }
            >
              <IconMenu2 />
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Explore Nosha</SheetTitle>
                <SheetDescription>
                  Find your gear. Make your next move.
                </SheetDescription>
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col px-6 pb-6"
              >
                {[
                  ...navigation,
                  { href: "#contact-form", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={`/${link.href}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href ? "location" : undefined}
                    className="flex items-center justify-between border-b border-border py-5 text-base font-medium transition-colors hover:text-primary"
                  >
                    {link.label}
                    <IconArrowUpRight
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
                <a
                  href="tel:+17037033662"
                  className="mt-8 text-sm font-semibold hover:text-primary"
                >
                  +1 (703) 703-3662
                </a>
                <a
                  href="mailto:noshawear@gmail.com"
                  className="mt-3 text-sm hover:text-primary"
                >
                  noshawear@gmail.com
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
