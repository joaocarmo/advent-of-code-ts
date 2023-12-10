import type { Category, Mapped } from "."

export const createMappingsBySource = (
  maps: Mapped[],
): Record<Category, Mapped[]> => {
  const mappingsBySource: Record<Category, Mapped[]> = {}

  maps.forEach((mapping) => {
    if (!mappingsBySource[mapping.source]) {
      mappingsBySource[mapping.source] = []
    }

    mappingsBySource[mapping.source].push(mapping)
  })

  return mappingsBySource
}
