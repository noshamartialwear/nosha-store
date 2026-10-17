import type { MetadataRoute } from "next"
import { getSiteSettings } from "@/lib/seo"
import { policyLinks } from "@/lib/policies"
import { gearCategories } from "@/components/marketing/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const { url, indexable } = getSiteSettings()
  return indexable && url
    ? [
        {
          url: url.href,
          images: gearCategories.map(({ image }) => new URL(image, url).href),
        },
        ...policyLinks.map(({ href }) => ({ url: new URL(href, url).href })),
      ]
    : []
}
