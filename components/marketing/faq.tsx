import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "./content"
import { Container, Eyebrow, SectionHeading } from "./section-primitives"
import { Reveal } from "./reveal"

export function FrequentlyAskedQuestions() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="border-t border-border bg-background py-16 sm:py-20 lg:py-24"
    >
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Before you step on the mat</Eyebrow>
          <SectionHeading id="faq-heading">
            Good questions.
            <br />
            Clear answers.
          </SectionHeading>
        </Reveal>
        <Reveal>
          <Accordion defaultValue={["faq-0"]}>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
