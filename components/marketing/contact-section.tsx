import Image from "next/image"
import {
  IconMail,
  IconPhone,
  IconBrandWhatsapp,
  IconMapPin,
} from "@tabler/icons-react"
import {
  Accent,
  Container,
  Eyebrow,
  SectionHeading,
} from "./section-primitives"
import { ContactForm } from "./contact-form"
import { Reveal } from "./reveal"

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-inverse py-16 text-inverse-foreground sm:py-20 lg:py-28"
    >
      <Image
        src="/images/hero-uniforms.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-inverse/90 via-inverse/55 to-inverse/10"
      />
      <Container className="grid items-start gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <Eyebrow light>Let’s make the next step yours</Eyebrow>
          <SectionHeading id="contact-heading">
            A new uniform.
            <br />A whole team.
            <br />
            <Accent>Let’s talk.</Accent>
          </SectionHeading>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-inverse-foreground/80">
            Tell us what you train, what you need and what’s coming next. We’ll
            help you work through your options.
          </p>
        </Reveal>
        <Reveal
          delay={0.1}
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <ContactForm />
        </Reveal>
        <Reveal className="lg:col-start-1 lg:row-start-2">
          <h3 className="text-lg font-bold">Reach the Nosha team</h3>
          <p className="mt-2 text-sm leading-relaxed text-inverse-foreground/80">
            Questions about your kit or an academy order? Choose what works for
            you.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            <a
              href="tel:+17037033662"
              className="group rounded-xl border border-white/20 bg-inverse/40 p-4 transition-colors hover:border-primary/70 hover:bg-inverse/65"
            >
              <IconPhone
                className="mb-3 size-5 text-primary"
                stroke={1.5}
                aria-hidden="true"
              />
              <span className="block text-xs text-inverse-foreground/70">
                Call us
              </span>
              <span className="mt-1 block text-sm font-semibold tabular-nums">
                +1 (703)
                <br className="sm:hidden" /> 703-3662
              </span>
            </a>
            <a
              href="https://wa.me/17037033662"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-white/20 bg-inverse/40 p-4 transition-colors hover:border-primary/70 hover:bg-inverse/65"
            >
              <IconBrandWhatsapp
                className="mb-3 size-5 text-primary"
                stroke={1.5}
                aria-hidden="true"
              />
              <span className="block text-xs text-inverse-foreground/70">
                WhatsApp
              </span>
              <span className="mt-1 block text-sm font-semibold">
                Start a chat ↗
              </span>
            </a>
            <a
              href="mailto:noshawear@gmail.com"
              className="col-span-2 flex min-w-0 items-center gap-4 rounded-xl border border-white/20 bg-inverse/40 p-4 transition-colors hover:border-primary/70 hover:bg-inverse/65"
            >
              <IconMail
                className="size-5 shrink-0 text-primary"
                stroke={1.5}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block text-xs text-inverse-foreground/70">
                  Email us
                </span>
                <span className="mt-1 block text-sm font-semibold break-all">
                  noshawear@gmail.com
                </span>
              </span>
            </a>
            <div className="col-span-2 flex items-start gap-4 rounded-xl border border-white/15 p-4">
              <IconMapPin
                className="mt-0.5 size-5 shrink-0 text-primary"
                stroke={1.5}
                aria-hidden="true"
              />
              <div className="text-sm leading-relaxed">
                <p className="font-semibold">Serving USA enquiries</p>
                <p className="mt-1 text-inverse-foreground/80">
                  7422 Sudley Rd, Manassas, VA 20109
                </p>
                <p className="mt-2 text-xs text-inverse-foreground/65">
                  Showcase address · No visits, pickups or returns
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
