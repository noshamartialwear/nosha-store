import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Brand } from "@/components/marketing/brand"
import { Container } from "@/components/marketing/section-primitives"
import { policies, policyLinks } from "@/lib/policies"
import { getSiteSettings, siteMetadata } from "@/lib/seo"

type Props = { params: Promise<{ slug: string }> }
function findPolicy(slug: string) {
  if (!Object.hasOwn(policies, slug)) notFound()
  return policies[slug as keyof typeof policies]
}
export const dynamicParams = false
export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }))
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const policy = findPolicy(slug)
  const { url } = getSiteSettings()
  const canonical = url ? new URL(`/policies/${slug}`, url).href : undefined
  const sharedMetadata = siteMetadata()
  return {
    title: policy.title,
    description: policy.description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: `${policy.title} | Nosha Martial Wear`,
      description: policy.description,
      url: canonical,
    },
    twitter: {
      ...sharedMetadata.twitter,
      title: `${policy.title} | Nosha Martial Wear`,
      description: policy.description,
    },
  }
}
export default async function PolicyPage({ params }: Props) {
  const policy = findPolicy((await params).slug)
  return (
    <>
      <header className="border-b border-border py-6">
        <Container className="flex items-center justify-between gap-6">
          <Brand />
          <Link
            href="/#contact-form"
            className="text-sm font-semibold hover:text-primary"
          >
            Contact Nosha ↗
          </Link>
        </Container>
      </header>
      <main id="main" className="py-16 lg:py-24">
        <Container className="max-w-4xl">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← Back to Nosha
          </Link>
          <p className="mt-12 text-xs font-semibold tracking-widest text-primary uppercase">
            Customer information
          </p>
          <h1 className="mt-4 font-heading text-5xl font-bold uppercase sm:text-7xl">
            {policy.title}
          </h1>
          <p className="mt-5 text-sm text-muted-foreground">
            Updated October 17, 2026
          </p>
          <div className="mt-12 flex flex-col gap-10">
            {policy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold">{section.title}</h2>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {section.text}
                </p>
              </section>
            ))}
          </div>
          <div className="mt-12 border-t border-border pt-8">
            <p className="text-sm">
              Questions?{" "}
              <Link
                href="/#contact-form"
                className="font-semibold underline underline-offset-4 hover:text-primary"
              >
                Contact the Nosha team.
              </Link>
            </p>
            <nav
              aria-label="Policies"
              className="mt-6 flex flex-wrap gap-x-6 gap-y-3"
            >
              {policyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </main>
    </>
  )
}
