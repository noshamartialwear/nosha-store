import sharp from "sharp"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const width = 1200
const height = 630
const panelWidth = 640

const photograph = await sharp(path.join(root, "public/images/hero-uniforms.webp"))
  .resize(width - panelWidth, height, { fit: "cover", position: "centre" })
  .toBuffer()

// Fixed lines and generous side padding keep the headline inside its panel.
const typography = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${panelWidth}" height="${height}" fill="#090b0d"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="64" y="92" fill="#ff5000" font-size="21" letter-spacing="4">NOSHA MARTIAL WEAR</text>
    <g font-size="62" fill="#faf9f6">
      <text x="64" y="258">Respect the art.</text>
      <text x="64" y="334">Wear the</text>
      <text x="64" y="410" fill="#ff5000">discipline.</text>
    </g>
    <text x="64" y="554" fill="#faf9f6" font-size="19" letter-spacing="1">KARATE · TAEKWONDO · JUDO</text>
  </g>
</svg>`)

await sharp({ create: { width, height, channels: 3, background: "#090b0d" } })
  .composite([
    { input: photograph, left: panelWidth, top: 0 },
    { input: typography, left: 0, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(root, "app/opengraph-image.jpg"))

console.log("Prepared 1200×630 social preview with contained headline.")
