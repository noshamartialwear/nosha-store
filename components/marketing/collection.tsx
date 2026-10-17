import { ProductImages, ProductPreviewCard } from "./product-images"
import { ProductPreviewCycle } from "./product-preview-cycle"
import { IconArrowUpRight } from "@tabler/icons-react"
import { gearCategories } from "./content"
import { EnquiryLink } from "./enquiry-link"
import {
  Accent,
  Container,
  Eyebrow,
  SectionHeading,
} from "./section-primitives"
import { Reveal } from "./reveal"

export function UniformCollection() {
  return (
    <section
      id="gear"
      aria-labelledby="gear-heading"
      className="bg-background py-16 sm:py-20 lg:py-28"
    >
      <Container>
        <Reveal className="mb-8 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <div>
            <Eyebrow>The Nosha collection</Eyebrow>
            <SectionHeading id="gear-heading">
              Your art. <Accent>Your gear.</Accent>
            </SectionHeading>
          </div>
          <p className="max-w-80 text-sm leading-relaxed text-muted-foreground">
            Different disciplines. One shared commitment. Find the kit that
            belongs to the way you train.
          </p>
        </Reveal>
        <ProductPreviewCycle
          images={gearCategories.flatMap((gear) =>
            "backImage" in gear ? [gear.backImage] : []
          )}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-5">
            {gearCategories.map((gear, index) => (
              <Reveal key={gear.value} delay={index * 0.06}>
                <ProductPreviewCard
                  back={"backImage" in gear ? gear.backImage : undefined}
                >
                  <EnquiryLink
                    topic={gear.name}
                    appearance="card"
                    className="group block h-full"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary transition-colors group-hover:bg-secondary/70">
                      <ProductImages
                        front={gear.image}
                        back={"backImage" in gear ? gear.backImage : undefined}
                        description={gear.description}
                      />
                      <span className="absolute top-3 left-3 text-[0.625rem] font-semibold tracking-widest text-muted-foreground">
                        0{index + 1}
                      </span>
                      <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-background text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <IconArrowUpRight
                          className="size-4"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-bold sm:mt-5 sm:text-base">
                      {gear.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {gear.label}
                    </p>
                  </EnquiryLink>
                </ProductPreviewCard>
              </Reveal>
            ))}
          </div>
        </ProductPreviewCycle>
        <Reveal className="mt-10 flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            For individuals, teams and academies. Ask us about sizes,
            specifications and availability.
          </p>
          <EnquiryLink appearance="text">Need a hand choosing?</EnquiryLink>
        </Reveal>
      </Container>
    </section>
  )
}
