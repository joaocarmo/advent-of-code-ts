import { Direction, Point } from "./Grid"
import { State } from "."

export const solution = (state: State): number => {
  const height = state.grid.height
  const width = state.grid.width
  const allNumOfEnergisedTiles: number[] = []

  for (const [y] of [
    [0, Direction.Down],
    [height - 1, Direction.Up],
  ]) {
    for (let x = 0; x < width; x++) {
      const startingPoint = new Point(x, y)
      const [startingDirection] = state.grid.getNextDirection(
        startingPoint,
        Direction.Right,
      )

      state.grid.moveBeam(startingPoint, startingDirection)
      allNumOfEnergisedTiles.push(state.grid.getNumOfEnergisedTiles())
      state.grid.resetBeams()
    }
  }

  for (let y = 1; y < height - 1; y++) {
    for (const [x, direction] of [
      [0, Direction.Right],
      [width - 1, Direction.Left],
    ]) {
      const startingPoint = new Point(x, y)
      const [startingDirection] = state.grid.getNextDirection(
        startingPoint,
        direction,
      )

      state.grid.moveBeam(startingPoint, startingDirection)
      allNumOfEnergisedTiles.push(state.grid.getNumOfEnergisedTiles())
      state.grid.resetBeams()
    }
  }

  return Math.max(...allNumOfEnergisedTiles)
}
