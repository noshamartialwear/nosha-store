import { IconBrandWhatsappFilled } from "@tabler/icons-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function WhatsAppButton() {
  return (
    <div className="fixed right-[max(1.5rem,env(safe-area-inset-right))] bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-30 motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-whatsapp/35 motion-safe:animate-ping motion-safe:[animation-duration:2.4s]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-whatsapp/25 motion-safe:animate-ping motion-safe:[animation-delay:1.2s] motion-safe:[animation-duration:2.4s]"
      />
      <a
        href="https://wa.me/17037033662"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nosha on WhatsApp (opens in a new tab)"
        title="Chat on WhatsApp"
        className={cn(
          buttonVariants({ variant: "whatsapp", size: "floating" }),
          "relative"
        )}
      >
        <IconBrandWhatsappFilled className="size-8" aria-hidden="true" />
      </a>
    </div>
  )
}
