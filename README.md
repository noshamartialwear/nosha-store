# Nosha Martial Wear

A responsive martial arts website built with Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), Motion, TanStack Form and Resend.

## Run locally

```sh
pnpm install
pnpm dev
```

## Verify

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Website structure

- `app/page.tsx`: section composition.
- `components/marketing/`: one focused component per section, shared layout primitives, carousel, enquiry selection and inline contact form.
- `components/marketing/content.ts`: navigation, collection, discipline guides and FAQs.
- `components/ui/`: shadcn primitives, styled with Tailwind utilities.
- `lib/contact.ts`: shared validation and email formatting.
- `app/api/contact/route.ts`: server-side validation and Resend delivery.
- `app/globals.css`: Tailwind imports, theme tokens and shared accessibility defaults. No CSS modules.

## Email delivery

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`: a Resend sending key, kept on the server.
- `RESEND_FROM_EMAIL`: a sender address on your verified domain.
- `CONTACT_TO_EMAIL`: the inbox that receives enquiries.

The form validates with TanStack Form and a shared Zod schema, preserves details on failures, and only reports success after Resend accepts the email. The visitor’s email becomes the reply-to address. No confirmation email or mailing-list subscription is sent to the visitor.

Placeholder `.example` addresses deliberately do not deliver. Without real configuration the endpoint returns a clear unavailable response. A Resend accepted response confirms handoff to the mail provider, not final inbox placement.

## Artwork

All 16 website photographs were regenerated using only the supplied `logo.png` and `icon.png` as branding references. Chest branding uses that icon; uniform backs use the NOSHA wordmark without an icon.

- `public/images/`: the 16 optimized WebP photographs and two optimized supplied brand assets used by the site.
- `.temp/generated/`: available full-size generated PNGs from recent image updates.
- `.temp/previous-hero/`: replaced hero images, archived outside the public folder.
- `docs/image-prompts.json`: final generation prompts.

`.temp` stays local and is not served or included in Git. Some earlier source PNGs are no longer present locally; the asset script retains their existing optimized files. Keep a separate backup of original artwork. If supplied brand originals are restored to `.temp/originals/logo.png` and `icon.png`, the script rebuilds their optimized versions too. To process available originals and update favicons:

```sh
node scripts/prepare-assets.mjs
```

Image assets are illustrative. Confirm product specifications, included items and available branding with the business before taking orders.

## Desktop composition and product views

Desktop screens use the same fluid root-size formula as ZHX Labs (`clamp(12px, 100vw / 112.5, 19px)` from 1024px upward). This gives a 1440px desktop the preferred 80% density while retaining normal browser zoom and mobile sizing.

The five-image hero rotates every five seconds, including while the pointer rests over it. Explicit pause, keyboard focus, off-screen visibility and hidden browser tabs stop rotation. Reduced-motion visitors can start rotation using Play; image transitions still respect their preference. The first three collection cards crossfade to matching rear views on hover or keyboard focus. Back-view PNG sources are in `.temp/generated`; their optimized WebP versions are in `public/images`.

The hero uses one layout: a photo below the copy on mobile and a full-background photo on desktop. Touch swipes, arrow controls and slide selectors change slides. Vertical page scrolling and gestures starting on links or buttons are left alone.

Collection rear views refresh randomly every three seconds: each update has a 70% chance of selecting one uniform back and a 30% chance of selecting two distinct backs. Other cards show their fronts. Previews pause off-screen, when the browser tab is hidden, or with the pause control. Reduced-motion visitors can opt in using Play. Hover and keyboard-focus previews remain available. The floating WhatsApp link is icon-only, with a larger filled icon, two repeating pulse rings and subtle hover/press feedback; animations respect reduced motion.

Enquiry links target `/#contact-form` and preserve product/academy prefilling. The first four form fields use two columns on mobile; organization and message remain full width. Mobile section layouts place people photos alongside their introductions and separate guidance into scannable groups.

The hero includes a mixed group with ordinary karate lapels closed higher at the neck, the preserved judo photo, a ground-grappling scene, folded uniforms on a dojo bench, and a textile-and-belt close-up. The closer neckline uses the same wrap-front gi, with no zipper or stand-up collar. New hero originals are stored in `.temp/generated`, and replaced hero images are archived in `.temp/previous-hero`.

## Search and social previews

`lib/seo.ts` centralizes titles, descriptions, canonical URLs, Open Graph/Twitter metadata and Organization/WebSite/WebPage structured data. Next.js generates `/robots.txt` and `/sitemap.xml`. The 1200×630 social preview is a small static JPEG in `app/opengraph-image.jpg`, with its accessible description in the adjacent `.alt.txt` file. It is served directly without image rendering or optimization at request time. No unverified address, reviews, prices or product availability are published as structured data.

Run `node scripts/prepare-social-preview.mjs` to rebuild the social preview from the collection photograph. Its headline uses fixed lines and a separate padded panel so text never crosses into the photograph.

`/llms.txt` provides a concise AI-readable directory of the collection, training guide, enquiries and policies. It is generated from the configured origin and shared content, and does not replace robots directives or the sitemap. The sitemap includes collection photographs, and policy pages retain the shared large social-preview card.

The canonical origin comes only from `SITE_URL`; there is no hardcoded fallback domain. Set it to the complete HTTPS origin before building. Without a valid value, canonical URLs and business structured data are omitted, the sitemap is empty and indexing is disabled. With a valid value, production is indexable automatically; Vercel preview deployments are excluded. Rebuild after changing the origin. Submit `/sitemap.xml` through Search Console after deploying.

## Production handoff

The owner deploys on Vercel. Configure `RESEND_API_KEY` and `RESEND_FROM_EMAIL` using a sender domain verified with Resend. Enquiries default to `noshawear@gmail.com`; `CONTACT_TO_EMAIL` can override the destination. Gmail can receive enquiries but is not a verified sender domain you own. After deployment, send a test enquiry and check the receiving inbox.

Phone and WhatsApp use `+17037033662`. The supplied Manassas address remains explicitly labeled as a showcase location and is excluded from structured business data. Product details, pricing and delivery timing remain enquiry-based for USA visitors.

Privacy, shipping, returns and website terms are in `lib/policies.ts` and `/policies/`. Standard returns are described as 30 days, with approved refunds issued within 10 business days. The privacy policy reflects Google Analytics and the Vercel/Resend enquiry setup.

Google Analytics `G-JEY1LX29W5` loads through `@next/third-parties/google` in the root layout. No form contents or contact details are sent as analytics events. Search Console can use its Google Analytics verification method when the Google account has the required Analytics permissions; adding the tag alone does not verify ownership automatically.
