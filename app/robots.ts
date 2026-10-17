import type { MetadataRoute } from "next"
import { getSiteSettings } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  const { url, indexable } = getSiteSettings()
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: indexable && url ? new URL("/sitemap.xml", url).href : undefined,
  }
}
