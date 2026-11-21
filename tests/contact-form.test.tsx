// @vitest-environment happy-dom

import { createElement } from "react"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ContactForm } from "@/components/marketing/contact-form"
import { EnquiryProvider } from "@/components/marketing/enquiry-provider"
import { EnquiryLink } from "@/components/marketing/enquiry-link"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.ComponentProps<"a">) =>
    createElement("a", { ...props, href }, children),
}))

beforeEach(() => vi.stubGlobal("fetch", vi.fn()))
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function mount() {
  return render(
    <EnquiryProvider>
      <EnquiryLink topic="Judo Gi" academy>
        Choose academy judogi
      </EnquiryLink>
      <ContactForm />
    </EnquiryProvider>
  )
}

async function fillDetails() {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText("Your name"), "Avery")
  await user.type(screen.getByLabelText("Email address"), "avery@example.com")
  await user.type(
    screen.getByLabelText("What do you have in mind?"),
    "We need twelve judo uniforms for a new academy class."
  )
  return user
}

describe("inline enquiry form", () => {
  it("shows useful validation and does not submit an empty form", async () => {
    mount()
    await userEvent.click(screen.getByRole("button", { name: "Send enquiry" }))
    expect(await screen.findByText("Please enter your name.")).toBeDefined()
    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeDefined()
    expect(fetch).not.toHaveBeenCalled()
  })
  it("prefills gear and academy selections from page links", async () => {
    mount()
    expect(
      screen
        .getByRole("link", { name: "Choose academy judogi" })
        .getAttribute("href")
    ).toBe("/#contact-form")
    expect(screen.getByRole("form", { name: "Let’s talk training." }).id).toBe(
      "contact-form"
    )
    await userEvent.click(
      screen.getByRole("link", { name: "Choose academy judogi" })
    )
    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: "I’m interested in" }).textContent
      ).toContain("Judo Gi")
      expect(
        screen.getByRole("combobox", { name: "This is for" }).textContent
      ).toContain("Club or academy")
    })
    expect(screen.queryByRole("dialog")).toBeNull()
  })
  it("disables submission for validation errors and enables it after corrections", async () => {
    mount()
    const button = screen.getByRole("button", {
      name: "Send enquiry",
    }) as HTMLButtonElement
    const user = await fillDetails()
    const email = screen.getByLabelText("Email address")
    await user.clear(email)
    await user.type(email, "invalid-email")
    await user.tab()
    await waitFor(() => expect(button.disabled).toBe(true))
    await user.click(button)
    expect(fetch).not.toHaveBeenCalled()
    await user.clear(email)
    await user.type(email, "avery@example.com")
    await waitFor(() => expect(button.disabled).toBe(false))
    expect(screen.queryByText("Please enter a valid email address.")).toBeNull()
  })
  it("only confirms success after the email endpoint accepts the enquiry", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    )
    mount()
    const user = await fillDetails()
    await user.click(screen.getByRole("button", { name: "Send enquiry" }))
    expect(await screen.findByText("Thank you. Message sent.")).toBeDefined()
    expect(fetch).toHaveBeenCalledOnce()
    expect((screen.getByLabelText("Your name") as HTMLInputElement).value).toBe(
      ""
    )
  })
  it("preserves visitor details when delivery is unavailable", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: "Please try again later." }), {
        status: 503,
      })
    )
    mount()
    const user = await fillDetails()
    await user.click(screen.getByRole("button", { name: "Send enquiry" }))
    expect(
      await screen.findByText("Your message hasn’t been sent.")
    ).toBeDefined()
    expect((screen.getByLabelText("Your name") as HTMLInputElement).value).toBe(
      "Avery"
    )
    expect(
      (
        screen.getByLabelText(
          "What do you have in mind?"
        ) as HTMLTextAreaElement
      ).value
    ).toContain("twelve judo")
  })
})
