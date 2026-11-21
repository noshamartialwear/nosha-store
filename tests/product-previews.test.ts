import { expect, it } from "vitest"
import { chooseProductBacks } from "@/lib/product-previews"

it("uses the requested 70/30 probability boundary and never repeats an image in a pair", () => {
  let singles = 0
  let doubles = 0
  for (let sample = 0; sample < 100; sample++) {
    let draws = 0
    const selected = chooseProductBacks(["karate", "taekwondo", "judo"], () =>
      draws++ === 0 ? (sample + 0.5) / 100 : 0.5
    )
    expect(new Set(selected).size).toBe(selected.length)
    if (selected.length === 1) singles++
    else if (selected.length === 2) doubles++
  }
  expect(singles).toBe(70)
  expect(doubles).toBe(30)
})

it("handles empty lists and single available back images", () => {
  expect(chooseProductBacks([], () => 0.9)).toEqual([])
  expect(chooseProductBacks(["karate"], () => 0.9)).toEqual(["karate"])
})
