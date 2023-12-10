import { createMappingsBySource } from "./createMappingsBySource"
import { getCategoryNumberFromMappings } from "./getCategoryNumberFromMappings"
import type { Path, State } from "."

export const solution = (state: State): State => {
  state.seeds.sort((a, b) => a.seedRangeStart - b.seedRangeStart)
  const mappingsBySource = createMappingsBySource(state.maps)

  for (const seedRange of state.seeds) {
    const seedsWithinRange = Array.from(
      { length: seedRange.seedRangeLength },
      (_, i) => i + seedRange.seedRangeStart,
    )

    for (const seed of seedsWithinRange) {
      const path: Path = { seed }

      let currentCategory = "seed"
      let currentCategoryNumber = seed

      while (currentCategory !== "location") {
        const currentMappings = mappingsBySource[currentCategory]

        if (!currentMappings || currentMappings.length === 0) {
          break
        }

        currentCategory = currentMappings[0].destination
        currentCategoryNumber = getCategoryNumberFromMappings(
          currentCategoryNumber,
          currentMappings,
        )
        path[currentCategory] = currentCategoryNumber
      }

      state.paths.push(path)
    }
  }

  return state
}
