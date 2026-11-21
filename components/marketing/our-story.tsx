import Image from "next/image"
import {
  Accent,
  Container,
  Eyebrow,
  SectionHeading,
} from "./section-primitives"
import { SectionLink } from "./section-link"
import { Reveal } from "./reveal"

export function OurStory() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="overflow-hidden bg-inverse py-16 text-inverse-foreground sm:py-20 lg:py-28"
    >
      <Container className="grid items-start gap-8 sm:gap-12 md:grid-cols-2 md:gap-y-8 lg:gap-x-24">
        <Reveal className="relative row-start-2 md:col-start-1 md:row-span-2 md:row-start-1 md:self-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[4/5]">
            <Image
              src="/images/story-nosha.webp"
              alt="The NOSHA wordmark embroidered on the back of a white gi"
              fill
              sizes="(min-width: 768px) 44vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-5 rounded-lg bg-primary px-6 py-5 text-primary-foreground sm:-right-5">
            <span className="block font-heading text-3xl uppercase italic">
              Respect the art.
            </span>
            <span className="mt-1 block text-[0.625rem] font-semibold tracking-[0.2em] uppercase">
              Wear the discipline.
            </span>
          </div>
        </Reveal>
        <Reveal className="row-start-1 md:col-start-2">
          <Eyebrow light>The story behind the stitch</Eyebrow>
          <SectionHeading id="about-heading">
            More than
            <br />
            <Accent>just uniforms.</Accent>
          </SectionHeading>
        </Reveal>
        <Reveal className="md:col-start-2">
          <div className="flex max-w-md flex-col gap-5 text-base leading-relaxed text-inverse-foreground/70">
            <p>
              The early starts. The familiar sound of the mat. The small
              corrections that become second nature. Martial arts are built by
              coming back.
            </p>
            <p>
              Nosha is for that commitment. For the first-timer learning to tie
              a belt and the instructor preparing a whole class. For the
              practice, and the people who make it matter.
            </p>
          </div>
          <p className="mt-8 border-l-2 border-primary pl-5 font-heading text-2xl uppercase italic">
            Your journey. Your discipline. Your Nosha.
          </p>
          <div className="mt-8">
            <SectionLink href="#training-guide">
              Find your starting point
            </SectionLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
