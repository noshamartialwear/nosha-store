import { afterEach, expect, it, vi } from "vitest"
import { getSiteSettings, siteMetadata, siteStructuredData } from "@/lib/seo"
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import { GET as llms } from "@/app/llms.txt/route"
afterEach(() => vi.unstubAllEnvs())
it("uses only the configured site URL without a default", () => {
  expect(getSiteSettings({}).url).toBeUndefined()
  expect(getSiteSettings({}).indexable).toBe(false)
  expect(
    getSiteSettings({ SITE_URL: "https://nosha-store.vercel.app" }).url?.href
  ).toBe("https://nosha-store.vercel.app/")
})
it("excludes preview deployments and invalid canonical origins", () => {
  expect(getSiteSettings({ VERCEL_ENV: "preview" }).indexable).toBe(false)
  for (const SITE_URL of [
    "bad-url",
    "https://nosha.example",
    "http://localhost:3000",
    "https://example.com",
  ])
    expect(getSiteSettings({ SITE_URL }).indexable).toBe(false)
})
it("publishes consistent canonical, sitemap and business schema", () => {
  vi.stubEnv("SITE_URL", "https://nosha.vercel.app")
  vi.stubEnv("VERCEL_ENV", "production")
  expect(siteMetadata().alternates?.canonical).toBe("https://nosha.vercel.app/")
  expect(sitemap()).toHaveLength(5)
  expect(sitemap()[0].images).toContain(
    "https://nosha.vercel.app/images/gear-karate.webp"
  )
  expect(robots().sitemap).toBe("https://nosha.vercel.app/sitemap.xml")
  expect(siteStructuredData()?.["@graph"][0].logo).toBe(
    "https://nosha.vercel.app/images/brand-logo.webp"
  )
})
it("serves AI guidance using only the configured canonical origin", async () => {
  vi.stubEnv("SITE_URL", "https://nosha-store.vercel.app")
  const response = llms()
  expect(response.status).toBe(200)
  expect(response.headers.get("Content-Type")).toContain("text/plain")
  const text = await response.text()
  expect(text).toContain("https://nosha-store.vercel.app/#gear")
  expect(text).toContain("https://nosha-store.vercel.app/policies/privacy")
  expect(text).toContain("not a verified store")
  vi.stubEnv("SITE_URL", "")
  expect(llms().status).toBe(503)
})
it("does not publish a sitemap or canonical for invalid configuration", () => {
  for (const value of ["", "invalid"]) {
    vi.stubEnv("SITE_URL", value)
    expect(siteMetadata().metadataBase).toBeUndefined()
    expect(siteMetadata().alternates).toBeUndefined()
    expect(siteStructuredData()).toBeNull()
    expect(sitemap()).toEqual([])
  }
})
