import { z } from "zod"

export const contactTopics = [
  "Karate Gi",
  "Taekwondo Dobok",
  "Judo Gi",
  "Belts & Protective Gear",
  "Training Accessories",
  "Help me choose",
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  organization: z.string().trim().max(160),
  topic: z.enum(contactTopics),
  purpose: z.enum(["Individual", "Club or academy"]),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(3000, "Please keep your message under 3,000 characters."),
  website: z.string().max(200),
})

export type ContactValues = z.infer<typeof contactSchema>

export const contactDefaults: ContactValues = {
  name: "",
  email: "",
  organization: "",
  topic: "Help me choose",
  purpose: "Individual",
  message: "",
  website: "",
}

export function formatEnquiry(values: ContactValues) {
  return [
    "New enquiry · Nosha Martial Wear",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Enquiring for: ${values.purpose}`,
    `Club / academy: ${values.organization || "Not provided"}`,
    `Gear: ${values.topic}`,
    "",
    values.message,
  ].join("\n")
}
