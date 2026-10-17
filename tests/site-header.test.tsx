// @vitest-environment happy-dom
import { createElement } from "react"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, expect, it, vi } from "vitest"
import { SiteHeader } from "@/components/marketing/site-header"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.ComponentProps<"a">) =>
    createElement("a", { ...props, href }, children),
}))
vi.mock("next/image", () => ({ default: () => createElement("span") }))
afterEach(cleanup)

it("opens an accessible mobile sheet and closes it after navigation", async () => {
  render(<SiteHeader />)
  expect(
    screen
      .getByRole("link", { name: "Nosha Martial Wear home" })
      .getAttribute("href")
  ).toBe("/#home")
  const user = userEvent.setup()
  await user.click(screen.getByRole("button", { name: "Open navigation" }))
  const dialog = await screen.findByRole("dialog", { name: "Explore Nosha" })
  expect(dialog).toBeDefined()
  await user.click(screen.getByRole("link", { name: "Contact" }))
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
})
