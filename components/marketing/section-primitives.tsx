import { cn } from "@/lib/utils"

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12",
        className
      )}
      {...props}
    />
  )
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-3 text-[0.6875rem] font-bold tracking-[0.2em] uppercase",
        light ? "text-inverse-foreground/70" : "text-muted-foreground"
      )}
    >
      <span className="h-px w-7 bg-primary" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHeading({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      id={id}
      className={cn(
        "font-heading text-[clamp(3rem,5.2vw,5.5rem)] leading-[0.95] font-extrabold tracking-tight text-balance uppercase italic",
        className
      )}
    >
      {children}
    </h2>
  )
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>
}
