import { Point } from "./Grid"
import type { Grid } from "./Grid"

export const findLargestLoop = (grid: Grid): number => {
  let largestLoop = 0
  const [width, height] = grid.getDimensions()

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const distance = grid.get(new Point(x, y)).distance

      if (distance === null) {
        continue
      }

      largestLoop = Math.max(largestLoop, distance)
    }
  }

  return largestLoop
}
