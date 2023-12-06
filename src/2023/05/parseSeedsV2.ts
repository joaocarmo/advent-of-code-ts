import type { Seed } from "."

export const parseSeeds = (line: string): Seed[] => {
  const seeds: Seed[] = []
  const values = line
    .split(" ")
    .filter((n) => !!n.trim())
    .map((s) => parseInt(s, 10))

  for (let i = 0; i < values.length; i += 2) {
    seeds.push({
      seedRangeStart: values[i],
      seedRangeLength: values[i + 1],
    })
  }

  return seeds
}
