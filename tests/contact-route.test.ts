import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { POST } from "@/app/api/contact/route"
import { contactDefaults } from "@/lib/contact"

const { send } = vi.hoisted(() => ({ send: vi.fn() }))
vi.mock("resend", () => ({
  Resend: class {
    emails = { send }
  },
}))

const valid = {
  ...contactDefaults,
  name: "Avery",
  email: "avery@example.com",
  topic: "Karate Gi",
  message: "I need two karate uniforms for my next grading.",
}
function request(body: unknown = valid, origin = "https://nosha.example") {
  return new Request("https://nosha.example/api/contact", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  send.mockReset().mockResolvedValue({ data: { id: "email-123" }, error: null })
  vi.stubEnv("RESEND_API_KEY", "test-key")
  vi.stubEnv("RESEND_FROM_EMAIL", "Nosha <sender@test.invalid>")
  vi.stubEnv("CONTACT_TO_EMAIL", "team@test.invalid")
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe("contact delivery", () => {
  it("rejects invalid visitor details before contacting the provider", async () => {
    const response = await POST(
      request({ ...valid, email: "not-an-email", message: "short" })
    )
    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.fields.email).toBeDefined()
    expect(body.fields.message).toBeDefined()
    expect(send).not.toHaveBeenCalled()
  })
  it("rejects cross-origin form requests", async () => {
    expect((await POST(request(valid, "https://other.example"))).status).toBe(
      403
    )
    expect(send).not.toHaveBeenCalled()
  })
  it("rejects malformed and oversized requests", async () => {
    const malformed = new Request("https://nosha.example/api/contact", {
      method: "POST",
      body: "{",
    })
    expect((await POST(malformed)).status).toBe(400)
    expect(
      (await POST(request({ ...valid, message: "a".repeat(17_000) }))).status
    ).toBe(413)
    expect(send).not.toHaveBeenCalled()
  })
  it("does not send honeypot submissions", async () => {
    expect(
      (await POST(request({ ...valid, website: "bot-filled-this" }))).status
    ).toBe(200)
    expect(send).not.toHaveBeenCalled()
  })
  it("never reports success when email credentials are missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "")
    const response = await POST(request())
    expect(response.status).toBe(503)
    expect(await response.json()).not.toHaveProperty("ok", true)
    expect(send).not.toHaveBeenCalled()
  })
  it("does not send to placeholder inboxes", async () => {
    vi.stubEnv("CONTACT_TO_EMAIL", "hello@nosha.example")
    expect((await POST(request())).status).toBe(503)
    expect(send).not.toHaveBeenCalled()
  })
  it("sends to the business inbox with the visitor as reply-to", async () => {
    const response = await POST(request({ ...valid, name: "  Avery  " }))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(send).toHaveBeenCalledOnce()
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "team@test.invalid",
        replyTo: valid.email,
        text: expect.stringContaining("Name: Avery\n"),
      })
    )
  })
  it("reports provider rejection without exposing provider details", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    send.mockResolvedValue({
      data: null,
      error: { name: "validation_error", message: "private provider details" },
    })
    const response = await POST(request())
    expect(response.status).toBe(502)
    expect(JSON.stringify(await response.json())).not.toContain(
      "private provider details"
    )
  })
  it("handles provider connection failures", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    send.mockRejectedValue(new Error("network unavailable"))
    expect((await POST(request())).status).toBe(502)
  })
})
