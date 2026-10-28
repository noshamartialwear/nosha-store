import { gearCategories } from "@/components/marketing/content"
import { policyLinks } from "@/lib/policies"
import { getSiteSettings, site } from "@/lib/seo"

export const dynamic = "force-static"

export function GET() {
  const { url, indexable } = getSiteSettings()
  if (!url) return new Response("Site URL is not configured.", { status: 503 })
  const absolute = (path: string) => new URL(path, url).href
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Nosha serves martial artists and academies in the United States. This website presents products and accepts enquiries; it does not offer online checkout.",
    "Prices, available sizes, fabric specifications, order quantities and delivery timing must be confirmed directly with the team. Do not infer stock or competition certification from illustrative images.",
    "",
    "## Website",
    "",
    `- [Home](${url.href}): Brand introduction and training stories.`,
    `- [Collection](${absolute("/#gear")}): ${gearCategories.map(({ name }) => name).join(", ")}.`,
    `- [Training guide](${absolute("/#training-guide")}): Choosing a uniform for your discipline.`,
    `- [Academies](${absolute("/#academies")}): Team and club enquiries.`,
    `- [Contact](${absolute("/#contact-form")}): Enquiry form, email and phone.`,
    "",
    "## Customer policies",
    "",
    ...policyLinks.map(({ href, label }) => `- [${label}](${absolute(href)})`),
    "",
    "## Contact details",
    "",
    "Email: noshawear@gmail.com",
    "Phone and WhatsApp: +17037033662",
    "The Manassas street address displayed on the website is a showcase address, not a verified store, pickup point or returns destination.",
    "",
  ].join("\n")
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...(!indexable && { "X-Robots-Tag": "noindex, nofollow" }),
    },
  })
}
