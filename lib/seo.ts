import type { Metadata } from "next"

export const site = {
  name: "Nosha Martial Wear",
  title: "Nosha Martial Wear | Karate, Taekwondo & Judo Uniforms",
  description:
    "Find your next karate gi, taekwondo dobok or judo uniform. Explore Nosha martial arts uniforms, belts and training gear for individuals and academies.",
}

export function getSiteSettings(
  env: Record<string, string | undefined> = process.env
) {
  let url: URL | undefined
  try {
    const candidate = new URL(env.SITE_URL || "")
    if (
      candidate.protocol === "https:" &&
      !candidate.username &&
      !candidate.password &&
      !candidate.port &&
      candidate.pathname === "/" &&
      !candidate.search &&
      !candidate.hash &&
      candidate.hostname.includes(".") &&
      !/(^|\.)(localhost|example|test|invalid)$/.test(candidate.hostname) &&
      !/^example\.(com|org|net)$/.test(candidate.hostname)
    )
      url = candidate
  } catch {
    /* A domain is optional while preparing the site locally. */
  }
  const indexable = Boolean(
    url && (!env.VERCEL_ENV || env.VERCEL_ENV === "production")
  )
  return { url, indexable }
}

export function siteMetadata(): Metadata {
  const { url, indexable } = getSiteSettings()
  return {
    metadataBase: url,
    title: { default: site.title, template: "%s | Nosha Martial Wear" },
    description: site.description,
    applicationName: site.name,
    category: "Sports",
    formatDetection: { telephone: false },
    alternates: url ? { canonical: url.href } : undefined,
    robots: {
      index: indexable,
      follow: indexable,
      ...(indexable && {
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
        },
      }),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      title: site.title,
      description: site.description,
      url: url?.href,
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
    },
    verification: {
      google: "4eWa9f0XKfV1elqMD2bidFeBsv_wj3ajWyXl9pT5ga0",
    },
    icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },
  }
}

export function siteStructuredData() {
  const { url } = getSiteSettings()
  if (!url) return null
  const origin = url.href
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}#organization`,
        name: site.name,
        email: "noshawear@gmail.com",
        telephone: "+17037033662",
        url: origin,
        logo: new URL("/images/brand-logo.webp", url).href,
      },
      {
        "@type": "WebSite",
        "@id": `${origin}#website`,
        name: site.name,
        url: origin,
        publisher: { "@id": `${origin}#organization` },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${origin}#webpage`,
        name: site.title,
        description: site.description,
        url: origin,
        isPartOf: { "@id": `${origin}#website` },
        about: { "@id": `${origin}#organization` },
      },
    ],
  }
}
