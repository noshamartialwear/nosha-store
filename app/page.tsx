import Link from "next/link"
import { siteStructuredData } from "@/lib/seo"
import { ScrollProgress } from "@/components/marketing/scroll-progress"
import { EnquiryProvider } from "@/components/marketing/enquiry-provider"
import { SiteHeader } from "@/components/marketing/site-header"
import { Hero } from "@/components/marketing/hero"
import { UniformCollection } from "@/components/marketing/collection"
import { WhyNosha } from "@/components/marketing/why-nosha"
import { OurStory } from "@/components/marketing/our-story"
import { TrainingGuide } from "@/components/marketing/training-guide"
import { Academies } from "@/components/marketing/academies"
import { FrequentlyAskedQuestions } from "@/components/marketing/faq"
import { ContactSection } from "@/components/marketing/contact-section"
import { SiteFooter } from "@/components/marketing/site-footer"

export default function HomePage() {
  const structuredData = siteStructuredData()
  return (
    <EnquiryProvider>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <ScrollProgress />
      <Link
        href="#main"
        className="fixed top-3 left-4 z-50 -translate-y-24 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground focus:translate-y-0"
      >
        Skip to content
      </Link>
      <SiteHeader />
      <main id="main">
        <Hero />
        <UniformCollection />
        <WhyNosha />
        <OurStory />
        <TrainingGuide />
        <Academies />
        <FrequentlyAskedQuestions />
        <ContactSection />
      </main>
      <SiteFooter />
    </EnquiryProvider>
  )
}
