import type { Category, Mapped } from "."

export const createMappingsBySource = (
  maps: Mapped[],
): Record<Category, Mapped[]> => {
  const mappingsBySource: Record<Category, Mapped[]> = {}

  for (const mapping of maps) {
    if (!mappingsBySource[mapping.source]) {
      mappingsBySource[mapping.source] = []
    }

    mappingsBySource[mapping.source].push(mapping)
  }

  for (const category in mappingsBySource) {
    mappingsBySource[category].sort(
      (a, b) => a.sourceRangeStart - b.sourceRangeStart,
    )
  }

  return mappingsBySource
}
