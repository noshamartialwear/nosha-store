"use client"

import { createContext, useContext, useState } from "react"
import type { ContactValues } from "@/lib/contact"

type EnquirySelection = Pick<ContactValues, "topic" | "purpose">
type EnquiryContextValue = {
  selection: EnquirySelection | null
  select: (selection: EnquirySelection) => void
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null)

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [selection, select] = useState<EnquirySelection | null>(null)
  return (
    <EnquiryContext.Provider value={{ selection, select }}>
      {children}
    </EnquiryContext.Provider>
  )
}

export function useEnquiry() {
  const context = useContext(EnquiryContext)
  if (!context) throw new Error("Enquiry components need EnquiryProvider.")
  return context
}
