import { Direction, Point } from "./Grid"
import { State } from "."

export const solution = (state: State): number => {
  const startingPoint = new Point(0, 0)
  const [startingDirection] = state.grid.getNextDirection(
    startingPoint,
    Direction.Right,
  )

  state.grid.moveBeam(startingPoint, startingDirection)

  return state.grid.getNumOfEnergisedTiles()
}
