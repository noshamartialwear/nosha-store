export function chooseProductBacks(
  images: readonly string[],
  random = Math.random
): string[] {
  const remaining = [...new Set(images)]
  const count = Math.min(random() < 0.7 ? 1 : 2, remaining.length)
  const selected: string[] = []
  for (let index = 0; index < count; index++) {
    const position = Math.floor(random() * remaining.length)
    selected.push(...remaining.splice(position, 1))
  }
  return selected
}
