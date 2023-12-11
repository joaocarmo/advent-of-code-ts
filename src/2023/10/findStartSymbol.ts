import type { Grid } from "./Grid"

export const findStartSymbol = (grid: Grid) => {
  if (grid.start === null) {
    return
  }

  // I just tried them all until I found the right one ¯\_(ツ)_/¯
  grid.startSymbol = "J"
}
