// @vitest-environment happy-dom

import { createElement } from "react"
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, expect, it, vi } from "vitest"
import { Hero } from "@/components/marketing/hero"

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) =>
    createElement("span", { "data-image-alt": alt }),
}))
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.ComponentProps<"a">) =>
    createElement("a", { ...props, href }, children),
}))
const { reducedMotion } = vi.hoisted(() => ({
  reducedMotion: vi.fn(() => true),
}))
vi.mock("motion/react", () => ({ useReducedMotion: reducedMotion }))
vi.mock("motion", () => ({ animate: () => ({ stop: vi.fn() }) }))
beforeEach(() => reducedMotion.mockReturnValue(true))
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

it("supports swiping left and right without hijacking vertical scrolling", () => {
  render(<Hero />)
  const hero = screen.getByRole("region", { name: "Nosha training stories" })
  const gesture = (
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    fireEvent.pointerDown(hero, {
      pointerType: "touch",
      pointerId: 1,
      clientX: startX,
      clientY: startY,
    })
    fireEvent.pointerUp(hero, {
      pointerType: "touch",
      pointerId: 1,
      clientX: endX,
      clientY: endY,
    })
  }
  gesture(260, 100, 100, 110)
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "the journey"
  )
  gesture(100, 100, 260, 110)
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
  gesture(200, 100, 140, 260)
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
  fireEvent.pointerDown(hero, {
    pointerType: "touch",
    pointerId: 1,
    clientX: 260,
    clientY: 100,
  })
  fireEvent.pointerCancel(hero)
  fireEvent.pointerUp(hero, {
    pointerType: "touch",
    pointerId: 1,
    clientX: 100,
    clientY: 100,
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
})

it("supports manual carousel navigation with reduced motion", async () => {
  render(<Hero />)
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
  expect(screen.queryByRole("button", { name: "Pause slideshow" })).toBeNull()
  await userEvent.click(screen.getByRole("button", { name: "Next hero slide" }))
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "the journey"
  )
  await userEvent.click(
    screen.getByRole("button", { name: "Previous hero slide" })
  )
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
  await userEvent.click(
    screen.getByRole("button", { name: "Show slide 2: Judo" })
  )
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "the journey"
  )
  await userEvent.click(
    screen.getByRole("button", { name: "Show slide 5: Details" })
  )
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "With purpose"
  )
  await userEvent.click(screen.getByRole("button", { name: "Next hero slide" }))
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
})

it("rotates automatically while the pointer stays over the hero", async () => {
  reducedMotion.mockReturnValue(false)
  vi.useFakeTimers()
  render(<Hero />)
  fireEvent.mouseEnter(screen.getByRole("region"))
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "the journey"
  )

  // Pointer navigation must not silently disable subsequent automatic rotation.
  const next = screen.getByRole("button", { name: "Next hero slide" })
  fireEvent.pointerDown(next)
  fireEvent.click(next)
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "the mat"
  )
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Your gear"
  )
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "With purpose"
  )
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
})

it("respects explicit pause and resumes when play is requested", async () => {
  reducedMotion.mockReturnValue(false)
  vi.useFakeTimers()
  render(<Hero />)
  fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }))
  await act(async () => {
    await vi.advanceTimersByTimeAsync(15000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
  fireEvent.click(screen.getByRole("button", { name: "Play slideshow" }))
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "the journey"
  )
})

it("pauses for keyboard focus and lets the focused play control resume rotation", async () => {
  reducedMotion.mockReturnValue(false)
  vi.useFakeTimers()
  render(<Hero />)
  const next = screen.getByRole("button", { name: "Next hero slide" })
  vi.spyOn(next, "matches").mockImplementation(
    (selector) => selector === ":focus-visible"
  )
  fireEvent.focus(next)
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
  fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }))
  fireEvent.click(screen.getByRole("button", { name: "Play slideshow" }))
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "the journey"
  )
})

it("offers explicit playback for a visitor with reduced motion enabled", async () => {
  vi.useFakeTimers()
  render(<Hero />)
  await act(async () => {
    await vi.advanceTimersByTimeAsync(10000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Stronger"
  )
  fireEvent.click(screen.getByRole("button", { name: "Play slideshow" }))
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000)
  })
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "the journey"
  )
})
