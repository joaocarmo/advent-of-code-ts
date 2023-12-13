import type { Grid, Point } from "./Grid"

export const findPaths = (grid: Grid) => {
  if (grid.start === null) {
    return
  }

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
    }

    grid.get(p).visited = true
  }
}
