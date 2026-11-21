import Image from "next/image"
import {
  IconKarate,
  IconNeedleThread,
  IconRuler2,
  IconUsersGroup,
} from "@tabler/icons-react"
import {
  Accent,
  Container,
  Eyebrow,
  SectionHeading,
} from "./section-primitives"
import { Reveal } from "./reveal"

const reasons = [
  {
    icon: IconKarate,
    title: "Respect the discipline",
    text: "Distinct cuts for karate, taekwondo and judo. Your art comes first.",
  },
  {
    icon: IconRuler2,
    title: "Begin with the right fit",
    text: "Share your measurements and your preferred feel. We’ll help with the next step.",
  },
  {
    icon: IconNeedleThread,
    title: "Know the details",
    text: "Talk through fabric, weave and finish before choosing your uniform.",
  },
  {
    icon: IconUsersGroup,
    title: "Bring your team",
    text: "One conversation for your club’s sizes, quantities and training needs.",
  },
]

export function WhyNosha() {
  return (
    <section
      id="why-nosha"
      aria-labelledby="why-heading"
      className="relative isolate overflow-hidden bg-secondary"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
        <Image
          src="/images/why-nosha.webp"
          alt="Two Nosha martial artists in white and black uniforms in a bright dojo"
          fill
          sizes="48vw"
          className="object-cover object-center"
        />
      </div>
      <Container className="py-16 sm:py-20 lg:py-28">
        <Reveal className="relative lg:w-[43%]">
          <Eyebrow>A little more considered</Eyebrow>
          <SectionHeading id="why-heading">
            Made for the art.
            <br />
            <Accent>Chosen for you.</Accent>
          </SectionHeading>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
            A uniform is more than what you wear. It’s part of how you show up.
            Let’s find the details that feel right for your practice.
          </p>
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
            <Image
              src="/images/why-nosha.webp"
              alt="Martial artists in white and black Nosha uniforms"
              fill
              sizes="100vw"
              className="object-cover object-right"
            />
          </div>
          <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-6 sm:mt-10 sm:gap-7">
            {reasons.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="flex flex-col gap-3 border-t border-border pt-5"
              >
                <Icon
                  className="size-7 text-primary"
                  stroke={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="max-w-60 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
