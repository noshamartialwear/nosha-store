import Image from "next/image"
import {
  Accent,
  Container,
  Eyebrow,
  SectionHeading,
} from "./section-primitives"
import { EnquiryLink } from "./enquiry-link"
import { Reveal } from "./reveal"

const steps = [
  {
    title: "Share your team’s needs",
    text: "Disciplines, approximate quantities and when you need your kit.",
  },
  {
    title: "Work through the details",
    text: "Sizes, fabric preferences and any academy branding you have in mind.",
  },
  {
    title: "Confirm a clear plan",
    text: "Review the available options, pricing and timing before ordering.",
  },
]

export function Academies() {
  return (
    <section
      id="academies"
      aria-labelledby="academies-heading"
      className="bg-secondary py-16 sm:py-20 lg:py-28"
    >
      <Container>
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-x-20">
          <Reveal>
            <Eyebrow>For the people who bring us together</Eyebrow>
            <SectionHeading id="academies-heading">
              One team.
              <br />
              <Accent>Shared purpose.</Accent>
            </SectionHeading>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              You look after your students’ progress. Let’s work through the
              uniforms together — from one new class to your next academy order.
            </p>
          </Reveal>
          <Reveal className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/academy-nosha.webp"
                alt="An instructor and Nosha academy students talking together in the dojo"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 border-b border-border pb-4 text-xs tracking-widest text-muted-foreground uppercase">
              Built for the whole class.
            </p>
          </Reveal>
          <Reveal className="lg:col-start-1 lg:row-start-2">
            <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Your academy order, step by step
            </h3>
            <ol className="mt-6 flex flex-col gap-5">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/30 font-heading text-xl text-primary italic">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <EnquiryLink academy>Plan your academy order</EnquiryLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
