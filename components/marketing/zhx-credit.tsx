/**
 * The "Built by" signature: the ZHX Labs wordmark at text height, linked to
 * zhxlabs.com. ZH and LABS take the surrounding text colour (or `color`), the
 * X keeps the ZHX Labs mint. It sits at 75% and brightens on hover.
 */
export function ZhxCredit({
  className = "",
  color,
}: {
  className?: string
  color?: string
}) {
  return (
    <a
      href="https://www.zhxlabs.com"
      target="_blank"
      rel="noopener"
      aria-label="ZHX Labs"
      title="ZHX Labs: custom software, apps and automation"
      className={`opacity-75 transition-opacity duration-200 hover:opacity-100 ${className}`}
      style={{
        display: "inline-block",
        verticalAlign: "-0.12em",
        lineHeight: 0,
        textDecoration: "none",
        ...(color ? { color } : {}),
      }}
    >
      <svg
        viewBox="0 0 256 40"
        aria-hidden="true"
        style={{ height: "0.95em", width: "auto", overflow: "visible" }}
      >
        <path
          d="M0 0h40v8.5L14.5 31.5H40V40H0v-8.5L25.5 8.5H0Z M46 0h10.5v15.5h19V0H86v40H75.5V24.5h-19V40H46Z"
          fill="currentColor"
        />
        <path d="M92 0h12.5L136 40h-12.5Z" fill="#00c7ae" />
        <path d="M123.5 0H136L104.5 40H92Z" fill="#65ebac" />
        <path
          d="M150 12.5v20h16.5 M175 33 188 12.5 201 33 M211 12.5v20 M211 12.5h9a4.6 4.6 0 0 1 0 9.2h-9 M211 21.7h10a5.4 5.4 0 0 1 0 10.8h-10 M254 15.6c-2-2-5-3.1-8.4-3.1-4.9 0-8.3 2.2-8.3 5.3 0 7.4 17.4 3.4 17.4 10.4 0 3.1-3.6 5.3-8.6 5.3-3.8 0-7.1-1.2-9.3-3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    </a>
  )
}
