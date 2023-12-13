import { Point } from "./Grid"

const findShortestPathBetweenTwoGalaxies = (
  start: Point,
  end: Point,
): number => {
  const xDiff = Math.abs(start.x - end.x)
  const yDiff = Math.abs(start.y - end.y)

  return xDiff + yDiff
}

export const findShortestPathsBetweenPairsOfGalaxies = (
  pairsOfGalaxies: Point[][],
): number[] => {
  const numOfPairsOfGalaxies = pairsOfGalaxies.length
  const shortestPaths: number[] = []

  for (let i = 0; i < numOfPairsOfGalaxies; i++) {
    const [start, end] = pairsOfGalaxies[i]
    const shortestPath = findShortestPathBetweenTwoGalaxies(start, end)

    shortestPaths.push(shortestPath)
  }

  return shortestPaths
}
