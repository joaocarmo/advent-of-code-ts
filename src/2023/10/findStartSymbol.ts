import type { Grid } from "./Grid"

export const findStartSymbol = (grid: Grid) => {
  if (grid.start === null) {
    return
  }

  const [startNeighborA, startNeighborB] = grid.getMeaningfulNeighbors(
    grid.start,
  )

  grid.startSymbol = grid.findSymbolFromNeighbors(
    startNeighborA,
    startNeighborB,
  )
}
