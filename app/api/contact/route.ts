import { Resend } from "resend"
import { contactSchema, formatEnquiry } from "@/lib/contact"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json(
      { error: "Please send your enquiry from our website." },
      { status: 403 }
    )
  }

  let input: unknown
  try {
    const body = await request.text()
    if (body.length > 16_000) {
      return Response.json(
        { error: "Your message is too long." },
        { status: 413 }
      )
    }
    input = JSON.parse(body)
  } catch {
    return Response.json(
      { error: "Please check your message and try again." },
      { status: 400 }
    )
  }

  const parsed = contactSchema.safeParse(input)
  if (!parsed.success) {
    return Response.json(
      {
        error: "Please check the highlighted fields and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }
  if (parsed.data.website) return Response.json({ ok: true })

  const key = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const inbox = process.env.CONTACT_TO_EMAIL || "noshawear@gmail.com"
  if (
    !key ||
    !from ||
    !inbox ||
    inbox.endsWith(".example") ||
    from.includes(".example")
  ) {
    return Response.json(
      {
        error:
          "Our contact service is temporarily unavailable. Please try again later.",
      },
      { status: 503 }
    )
  }

  try {
    const resend = new Resend(key)
    const { error } = await resend.emails.send({
      from,
      to: inbox,
      replyTo: parsed.data.email,
      subject: `Nosha enquiry · ${parsed.data.topic}`,
      text: formatEnquiry(parsed.data),
    })
    if (error) {
      console.error("Contact email rejected by provider:", error.name)
      return Response.json(
        {
          error:
            "We couldn’t send your enquiry. Your details are still here — please try again.",
        },
        { status: 502 }
      )
    }
    return Response.json({ ok: true })
  } catch {
    console.error("Contact email service could not be reached.")
    return Response.json(
      {
        error:
          "We couldn’t connect just now. Your details are still here — please try again.",
      },
      { status: 502 }
    )
  }
}
