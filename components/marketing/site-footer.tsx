import Link from "next/link"
import { IconArrowUpRight } from "@tabler/icons-react"
import { Brand } from "./brand"
import { Container } from "./section-primitives"
import { navigation } from "./content"
import { EnquiryLink } from "./enquiry-link"
import { policyLinks } from "@/lib/policies"

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-inverse text-inverse-foreground">
      <Container>
        <div className="flex flex-col justify-between gap-7 border-b border-inverse-foreground/15 py-12 sm:flex-row sm:items-end lg:py-16">
          <p className="font-heading text-[clamp(2.75rem,6vw,6rem)] leading-none tracking-tight uppercase italic">
            See you <span className="text-primary">on the mat.</span>
          </p>
          <EnquiryLink>Start a conversation</EnquiryLink>
        </div>
        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Brand light />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-inverse-foreground/60">
              For the first bow, the next grading and the practice you keep
              coming back to.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="mb-5 text-xs font-semibold tracking-widest text-inverse-foreground/50 uppercase">
              Explore Nosha
            </h2>
            <ul className="flex flex-col gap-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-5 text-xs font-semibold tracking-widest text-inverse-foreground/50 uppercase">
              Find your next step
            </h2>
            <div className="flex flex-col items-start gap-4">
              <Link
                href="#training-guide"
                className="group flex items-center gap-3 text-sm transition-colors hover:text-primary"
              >
                Choosing your gear
                <IconArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <EnquiryLink academy appearance="text">
                Academy enquiries
              </EnquiryLink>
              <Link
                href="/#contact-form"
                className="text-sm transition-colors hover:text-primary"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-inverse-foreground/15 py-6 text-[0.6875rem] text-inverse-foreground/50 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Nosha Martial Wear. All rights
            reserved. Designed &amp; built by{" "}
            <a
              href="https://zhxlabs.com"
              target="_blank"
              rel="noopener"
              className="text-inverse-foreground/75 transition-colors hover:text-primary"
            >
              ZHX Labs
            </a>
            .
          </span>
          <nav aria-label="Policies" className="flex flex-wrap gap-x-5 gap-y-3">
            {policyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="#home" className="transition-colors hover:text-primary">
            Back to the top ↑
          </Link>
        </div>
      </Container>
    </footer>
  )
}
