import { createRequire } from "node:module"
import { access, mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const require = createRequire(import.meta.url)
const sharp = createRequire(require.resolve("next/package.json"))("sharp")
const root = path.resolve(import.meta.dirname, "..")
const output = path.join(root, "public/images")
const specs = JSON.parse(
  await readFile(path.join(root, "docs/image-prompts.json"), "utf8")
)

await mkdir(output, { recursive: true })
async function exists(file) {
  return access(file).then(
    () => true,
    () => false
  )
}

for (const { name } of specs) {
  const source = path.join(root, ".temp/generated", `${name}.png`)
  const destination = path.join(output, `${name}.webp`)
  if (!(await exists(source))) {
    if (await exists(destination)) continue
    throw new Error(`Missing image source and public asset: ${name}`)
  }
  const width = name.startsWith("gear-")
    ? 800
    : name.startsWith("hero-") || name.startsWith("why-")
      ? 1920
      : 1400
  await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 87 })
    .toFile(destination)
}

// The supplied brand artwork is the only logo source. Keep original PNGs in .temp.
if (await exists(path.join(root, ".temp/originals/logo.png")))
  await sharp(path.join(root, ".temp/originals/logo.png"))
    .trim({ background: "#ffffff", threshold: 35 })
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 96 })
    .toFile(path.join(output, "brand-logo.webp"))
if (await exists(path.join(root, ".temp/originals/icon.png")))
  await sharp(path.join(root, ".temp/originals/icon.png"))
    .trim({ background: "#ffffff", threshold: 35 })
    .resize({ width: 192, height: 192, fit: "contain", background: "#ffffff" })
    .webp({ quality: 96 })
    .toFile(path.join(output, "brand-icon.webp"))

await sharp(path.join(output, "brand-icon.webp"))
  .resize(180, 180)
  .png()
  .toFile(path.join(root, "app/apple-icon.png"))

const png = await sharp(path.join(output, "brand-icon.webp"))
  .resize(48, 48)
  .ensureAlpha()
  .png()
  .toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)
header[6] = 48
header[7] = 48
header.writeUInt16LE(1, 10)
header.writeUInt16LE(32, 12)
header.writeUInt32LE(png.length, 14)
header.writeUInt32LE(22, 18)
await writeFile(
  path.join(root, "app/favicon.ico"),
  Buffer.concat([header, png])
)
console.log(
  `Prepared available sources; retained existing optimized assets where originals are unavailable.`
)
