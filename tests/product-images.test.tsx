// @vitest-environment happy-dom
import { createElement } from "react"
import Link from "next/link"
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, expect, it, vi } from "vitest"
import {
  ProductImages,
  ProductPreviewCard,
} from "@/components/marketing/product-images"
import { ProductPreviewCycle } from "@/components/marketing/product-preview-cycle"

vi.mock("motion/react", () => ({ useReducedMotion: () => false }))
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string
    alt: string
    className: string
  }) => createElement("img", { src, alt, className }),
}))
beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(Math, "random").mockReturnValue(0.1)
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

function mount() {
  render(
    <ProductPreviewCycle images={["/karate-back.webp", "/judo-back.webp"]}>
      {["karate", "judo"].map((name) => (
        <ProductPreviewCard key={name} back={`/${name}-back.webp`}>
          <Link href="/#contact-form" data-testid={name}>
            <ProductImages
              front={`/${name}-front.webp`}
              back={`/${name}-back.webp`}
              description={name}
            />
          </Link>
        </ProductPreviewCard>
      ))}
    </ProductPreviewCycle>
  )
}
function backVisible(name: string) {
  return screen
    .getByTestId(name)
    .querySelector(`img[src="/${name}-back.webp"]`)
    ?.classList.contains("opacity-100")
}
async function tick() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(3000)
  })
}

it("flips a front to its back and holds that card while other previews change", async () => {
  mount()
  const card = screen.getByTestId("judo").parentElement!
  expect(backVisible("judo")).toBe(false)
  fireEvent.pointerEnter(card, { pointerType: "mouse" })
  expect(backVisible("judo")).toBe(true)
  await tick()
  expect(backVisible("judo")).toBe(true)
  expect(backVisible("karate")).toBe(true)
  fireEvent.pointerLeave(card, { pointerType: "mouse" })
  expect(backVisible("judo")).toBe(false)
})

it("flips an automatic back to its front and holds it until hover ends", async () => {
  mount()
  await tick()
  expect(backVisible("karate")).toBe(true)
  const card = screen.getByTestId("karate").parentElement!
  fireEvent.pointerEnter(card, { pointerType: "mouse" })
  expect(backVisible("karate")).toBe(false)
  await tick()
  expect(backVisible("karate")).toBe(false)
  fireEvent.pointerLeave(card, { pointerType: "mouse" })
  expect(backVisible("karate")).toBe(true)
})

it("does not create a sticky hover preview after a touch interaction", () => {
  mount()
  fireEvent.pointerEnter(screen.getByTestId("karate").parentElement!, {
    pointerType: "touch",
  })
  expect(backVisible("karate")).toBe(false)
})
