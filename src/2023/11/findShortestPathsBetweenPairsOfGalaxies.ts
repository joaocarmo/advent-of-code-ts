import { UniverseObject } from "./Grid"
import type { Grid, Point } from "./Grid"

const DISTANCE_APART = 1000000
const DIFF_TO_ADD = DISTANCE_APART > 1 ? DISTANCE_APART - 1 : DISTANCE_APART

const findShortestPathBetweenTwoGalaxies = (
  start: Point,
  end: Point,
  universe: Grid,
): number => {
  const yStart = Math.min(start.y, end.y)
  const yEnd = Math.max(start.y, end.y)
  const xStart = Math.min(start.x, end.x)
  const xEnd = Math.max(start.x, end.x)
  let total = yEnd - yStart + (xEnd - xStart)

  const rows = universe.getRows()
  const cols = universe.getColums()

  for (let i = yStart; i <= yEnd; i++) {
    const isEmptyRow = !rows[i].some(
      (tile) => tile.type === UniverseObject.Galaxy,
    )
    if (isEmptyRow) {
      total += DIFF_TO_ADD
    }
  }

  for (let i = xStart; i <= xEnd; i++) {
    const isEmptyCol = !cols[i].some(
      (tile) => tile.type === UniverseObject.Galaxy,
    )
    if (isEmptyCol) {
      total += DIFF_TO_ADD
    }
  }

  return total
}

export const findShortestPathsBetweenPairsOfGalaxies = (
  pairsOfGalaxies: Point[][],
  universe: Grid,
): number[] => {
  const numOfPairsOfGalaxies = pairsOfGalaxies.length
  const shortestPaths: number[] = []

  for (let i = 0; i < numOfPairsOfGalaxies; i++) {
    const [start, end] = pairsOfGalaxies[i]
    const shortestPath = findShortestPathBetweenTwoGalaxies(
      start,
      end,
      universe,
    )

    shortestPaths.push(shortestPath)
  }

  return shortestPaths
}
