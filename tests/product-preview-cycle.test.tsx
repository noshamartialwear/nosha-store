// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, expect, it, vi } from "vitest"
import {
  ProductPreviewCycle,
  useProductPreview,
} from "@/components/marketing/product-preview-cycle"

const { reducedMotion } = vi.hoisted(() => ({
  reducedMotion: vi.fn(() => false),
}))
vi.mock("motion/react", () => ({ useReducedMotion: reducedMotion }))

function CurrentPreview() {
  return (
    <output aria-label="Current preview">
      {useProductPreview().join(", ") || "Front views"}
    </output>
  )
}
function mount() {
  render(
    <ProductPreviewCycle
      images={["karate-back", "taekwondo-back", "judo-back"]}
    >
      <CurrentPreview />
    </ProductPreviewCycle>
  )
}
async function advance() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(3000)
  })
}
beforeEach(() => {
  vi.useFakeTimers()
  reducedMotion.mockReturnValue(false)
  vi.spyOn(Math, "random").mockReturnValue(0.1)
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

it("randomly chooses one or two backs as the timer advances", async () => {
  mount()
  expect(screen.getByLabelText("Current preview").textContent).toBe(
    "Front views"
  )
  await advance()
  expect(screen.getByLabelText("Current preview").textContent).toBe(
    "karate-back"
  )
  vi.mocked(Math.random).mockReturnValue(0.8)
  await advance()
  expect(screen.getByLabelText("Current preview").textContent).toBe(
    "judo-back, taekwondo-back"
  )
})

it("lets visitors pause and resume the sequence", async () => {
  mount()
  await advance()
  fireEvent.click(
    screen.getByRole("button", { name: "Pause product previews" })
  )
  await advance()
  expect(screen.getByLabelText("Current preview").textContent).toBe(
    "karate-back"
  )
  vi.mocked(Math.random).mockReturnValue(0.4)
  fireEvent.click(screen.getByRole("button", { name: "Play product previews" }))
  await advance()
  expect(screen.getByLabelText("Current preview").textContent).toBe(
    "taekwondo-back"
  )
})

it("does not autoplay with reduced motion unless the visitor starts it", async () => {
  reducedMotion.mockReturnValue(true)
  mount()
  await advance()
  expect(screen.getByLabelText("Current preview").textContent).toBe(
    "Front views"
  )
  fireEvent.click(screen.getByRole("button", { name: "Play product previews" }))
  await advance()
  expect(screen.getByLabelText("Current preview").textContent).toBe(
    "karate-back"
  )
})
