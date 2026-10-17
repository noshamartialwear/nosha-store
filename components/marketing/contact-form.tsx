"use client"

import { useForm } from "@tanstack/react-form"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { IconArrowUpRight, IconCheck, IconLoader2 } from "@tabler/icons-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { contactDefaults, contactSchema, contactTopics } from "@/lib/contact"
import { useEnquiry } from "./enquiry-provider"

const textFields = [
  {
    name: "name",
    label: "Your name",
    placeholder: "Full name",
    type: "text",
    autoComplete: "name",
    maxLength: 120,
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
    maxLength: 200,
  },
] as const
const topicItems = contactTopics.map((value) => ({ label: value, value }))
const purposeItems = ["Individual", "Club or academy"].map((value) => ({
  label: value,
  value,
}))

export function ContactForm() {
  const { selection } = useEnquiry()
  const [result, setResult] = useState<{
    kind: "error" | "success"
    message: string
  } | null>(null)
  const element = useRef<HTMLFormElement>(null)
  const status = useRef<HTMLDivElement>(null)
  const form = useForm({
    defaultValues: contactDefaults,
    validators: { onChange: contactSchema, onSubmit: contactSchema },
    onSubmit: async ({ value }) => {
      setResult(null)
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
          signal: AbortSignal.timeout(20_000),
        })
        const body: { ok?: boolean; error?: string } = await response.json()
        if (!response.ok || !body.ok) {
          setResult({
            kind: "error",
            message:
              body.error || "We couldn’t send your message. Please try again.",
          })
          return
        }
        setResult({
          kind: "success",
          message:
            "Your enquiry is on its way to our team. We’ll reply to the email address you provided.",
        })
        form.reset()
      } catch {
        setResult({
          kind: "error",
          message:
            "We couldn’t connect just now. Your details are still here — please try again.",
        })
      }
    },
  })

  useEffect(() => {
    if (!selection) return
    form.setFieldValue("topic", selection.topic)
    form.setFieldValue("purpose", selection.purpose)
  }, [selection, form])

  useEffect(() => {
    if (result) status.current?.focus({ preventScroll: true })
  }, [result])

  return (
    <form
      id="contact-form"
      aria-labelledby="contact-form-heading"
      ref={element}
      noValidate
      onSubmit={async (event) => {
        event.preventDefault()
        await form.handleSubmit()
        element.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus()
      }}
      className="scroll-mt-4 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-9"
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h3 id="contact-form-heading" className="text-xl font-bold">
            Let’s talk training.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A few details. A more useful conversation.
          </p>
        </div>
        <Image
          src="/images/brand-icon.webp"
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 mix-blend-multiply"
        />
      </div>
      {result && (
        <Alert
          ref={status}
          tabIndex={-1}
          role={result.kind === "error" ? "alert" : "status"}
          variant={result.kind === "error" ? "destructive" : "default"}
          className="mb-6 p-4"
        >
          {result.kind === "success" && <IconCheck aria-hidden="true" />}
          <AlertTitle>
            {result.kind === "success"
              ? "Thank you. Message sent."
              : "Your message hasn’t been sent."}
          </AlertTitle>
          <AlertDescription>{result.message}</AlertDescription>
        </Alert>
      )}
      <FieldGroup>
        <FieldGroup className="grid grid-cols-2 gap-3 sm:gap-5">
          {textFields.map((item) => (
            <form.Field
              key={item.name}
              name={item.name}
              validators={{
                onChange: ({ value }) =>
                  contactSchema.shape[item.name].safeParse(value).error
                    ?.issues[0],
              }}
            >
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={`contact-${item.name}`}>
                      {item.label}
                    </FieldLabel>
                    <Input
                      id={`contact-${item.name}`}
                      name={field.name}
                      type={item.type}
                      autoComplete={item.autoComplete}
                      maxLength={item.maxLength}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={invalid}
                      aria-describedby={
                        invalid ? `contact-${item.name}-error` : undefined
                      }
                      placeholder={item.placeholder}
                      required
                    />
                    {invalid && (
                      <FieldError
                        id={`contact-${item.name}-error`}
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          ))}
        </FieldGroup>
        <FieldGroup className="grid grid-cols-2 gap-3 sm:gap-5">
          <form.Field name="topic">
            {(field) => (
              <Field className="min-w-0">
                <FieldLabel htmlFor="contact-topic">
                  I’m interested in
                </FieldLabel>
                <Select
                  name={field.name}
                  items={topicItems}
                  value={field.state.value}
                  onValueChange={(value) => {
                    if (value) field.handleChange(value)
                  }}
                >
                  <SelectTrigger id="contact-topic" className="w-full">
                    <SelectValue className="min-w-0 overflow-hidden" />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      {topicItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>
          <form.Field name="purpose">
            {(field) => (
              <Field className="min-w-0">
                <FieldLabel htmlFor="contact-purpose">This is for</FieldLabel>
                <Select
                  name={field.name}
                  items={purposeItems}
                  value={field.state.value}
                  onValueChange={(value) => {
                    if (value === "Individual" || value === "Club or academy")
                      field.handleChange(value)
                  }}
                >
                  <SelectTrigger id="contact-purpose" className="w-full">
                    <SelectValue className="min-w-0 overflow-hidden" />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      {purposeItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>
        </FieldGroup>
        <form.Field
          name="organization"
          validators={{
            onChange: contactSchema.shape.organization,
          }}
        >
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor="contact-organization">
                Club or academy{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <Input
                id="contact-organization"
                name={field.name}
                value={field.state.value}
                maxLength={160}
                autoComplete="organization"
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={!field.state.meta.isValid}
                placeholder="Your club’s name"
              />
            </Field>
          )}
        </form.Field>
        <form.Field
          name="message"
          validators={{
            onChange: contactSchema.shape.message,
          }}
        >
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor="contact-message">
                  What do you have in mind?
                </FieldLabel>
                <Textarea
                  id="contact-message"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={invalid}
                  aria-describedby={
                    invalid ? "contact-message-error" : "contact-message-hint"
                  }
                  maxLength={3000}
                  rows={4}
                  required
                  placeholder="Tell us your discipline, approximate sizes and quantities, and when you need your gear."
                />
                {invalid ? (
                  <FieldError
                    id="contact-message-error"
                    errors={field.state.meta.errors}
                  />
                ) : (
                  <p
                    id="contact-message-hint"
                    className="text-xs leading-relaxed text-muted-foreground"
                  >
                    Sizes, quantities and timing help us give you a useful
                    reply.
                  </p>
                )}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="website">
          {(field) => (
            <div hidden aria-hidden="true">
              <label htmlFor="contact-website">Leave this empty</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </div>
          )}
        </form.Field>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              variant="brand"
              size="brand"
              disabled={!canSubmit || isSubmitting}
              className="w-full cursor-pointer"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <IconLoader2
                    className="motion-safe:animate-spin"
                    data-icon="inline-start"
                  />
                  Sending your enquiry
                </>
              ) : (
                <>
                  Send enquiry
                  <IconArrowUpRight data-icon="inline-end" />
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
        <p className="text-xs leading-relaxed text-muted-foreground">
          We use your details to respond to this enquiry. No mailing list, no
          marketing signup.{" "}
          <Link
            href="/policies/privacy"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Privacy policy
          </Link>
          .
        </p>
      </FieldGroup>
    </form>
  )
}
