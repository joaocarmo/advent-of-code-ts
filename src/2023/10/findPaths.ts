import type { Grid, Point } from "./Grid"

export const findPaths = (grid: Grid): number => {
  if (grid.start === null) {
    return 0
  }

  let maxDistance = 0
  const queue: Point[] = [grid.start]

  while (queue.length > 0) {
    const p = queue.shift() as Point
    const nextNeighbors = grid
      .getNextNeighbors(p)
      .filter((p) => !grid.get(p).visited)

    const distance = grid.get(p).distance! + 1
    for (const neighbor of nextNeighbors) {
      grid.set(neighbor, {
        ...grid.get(neighbor),
        distance,
      })
      queue.push(neighbor)
      maxDistance = Math.max(maxDistance, distance)
    }

    grid.get(p).visited = true
  }

  return maxDistance
}
