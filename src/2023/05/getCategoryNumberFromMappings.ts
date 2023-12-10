import type { Mapped } from "."

export const getCategoryNumberFromMappings = (
  currentCategoryNumber: number,
  currentMappings: Mapped[],
): number => {
  const currentMapping = currentMappings.find(
    (m) =>
      currentCategoryNumber >= m.sourceRangeStart &&
      currentCategoryNumber < m.sourceRangeStart + m.rangeLength,
  )

  if (!currentMapping) {
    return currentCategoryNumber
  }

  const { sourceRangeStart, destinationRangeStart } = currentMapping

  return destinationRangeStart + (currentCategoryNumber - sourceRangeStart)
}
