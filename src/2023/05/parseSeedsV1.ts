import type { Seed } from "."

export const parseSeeds = (seeds: string): Seed[] =>
  seeds
    .split(" ")
    .filter((n) => !!n.trim())
    .map((seed) => ({ seedRangeStart: parseInt(seed), seedRangeLength: 1 }))
