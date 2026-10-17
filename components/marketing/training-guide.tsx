import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { disciplineGuides } from "./content"
import { EnquiryLink } from "./enquiry-link"
import {
  Accent,
  Container,
  Eyebrow,
  SectionHeading,
} from "./section-primitives"
import { Reveal } from "./reveal"

export function TrainingGuide() {
  return (
    <section
      id="training-guide"
      aria-labelledby="guide-heading"
      className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-40 size-180 text-border/50"
        viewBox="0 0 720 720"
        fill="none"
      >
        <circle cx="360" cy="360" r="150" stroke="currentColor" />
        <circle cx="360" cy="360" r="220" stroke="currentColor" />
        <circle cx="360" cy="360" r="290" stroke="currentColor" />
        <circle cx="360" cy="360" r="359" stroke="currentColor" />
        <path d="M0 360H720M360 0V720" stroke="currentColor" />
      </svg>
      <Container>
        <Reveal className="grid gap-7 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>A useful place to begin</Eyebrow>
            <SectionHeading id="guide-heading">
              The right kit.
              <br />
              <Accent>Your next step.</Accent>
            </SectionHeading>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-muted-foreground">
              You don’t need to know every specification. Start with your
              discipline. We’ll help you work through the rest.
            </p>
            <p className="mt-6 text-xs tracking-widest text-muted-foreground uppercase sm:mt-10">
              Pick your art. Make it yours.
            </p>
          </div>
          <Tabs defaultValue="karate" className="min-w-0 gap-7">
            <TabsList
              variant="line"
              aria-label="Choose your martial art"
              className="w-full justify-between gap-1 sm:justify-start sm:gap-4"
            >
              {disciplineGuides.map((guide) => (
                <TabsTrigger
                  key={guide.value}
                  value={guide.value}
                  className="min-h-11 flex-1 px-2 sm:flex-none sm:px-3"
                >
                  {guide.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {disciplineGuides.map((guide) => (
              <TabsContent key={guide.value} value={guide.value}>
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                  <h3 className="text-xl font-bold">{guide.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {guide.description}
                  </p>
                  <ol className="mt-7 flex flex-col gap-5">
                    {guide.steps.map((step, index) => (
                      <li
                        key={step.title}
                        className="flex gap-4 border-t border-border pt-5"
                      >
                        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/30 text-xs font-semibold text-primary">
                          0{index + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold">{step.title}</h4>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-8">
                    <EnquiryLink topic={guide.name} appearance="text">
                      Let’s find your {guide.name.toLowerCase()}
                    </EnquiryLink>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </Container>
    </section>
  )
}
