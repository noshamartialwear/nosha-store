import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { Barlow_Condensed } from "next/font/google"
import { cn } from "@/lib/utils"
import { siteMetadata } from "@/lib/seo"
import { GoogleAnalytics } from "@next/third-parties/google"
import { WhatsAppButton } from "@/components/marketing/whatsapp-button"
import "./globals.css"

const brandFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-brand",
  display: "swap",
})
const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})
export const metadata: Metadata = siteMetadata()
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090b0d",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        brandFont.variable,
        displayFont.variable,
        "scroll-pt-24 motion-safe:scroll-smooth lg:text-[clamp(12px,calc(100vw/112.5),19px)]"
      )}
      data-scroll-behavior="smooth"
    >
      <body>
        {children}
        <WhatsAppButton />
      </body>
      <GoogleAnalytics gaId="G-JEY1LX29W5" />
    </html>
  )
}
