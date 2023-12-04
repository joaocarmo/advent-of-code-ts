import type { State } from "."
import { Point } from "./Point"

const solution = (state: State): State => {
  for (let y = state.grid.yMin; y <= state.grid.yMax; y++) {
    let newPartNumber = ""
    let isAdjacentToSymbol = false

    for (let x = state.grid.xMin; x <= state.grid.xMax; x++) {
      const point = new Point(x, y)

      if (!state.grid.isNumber(point)) {
        if (newPartNumber.length > 0 && isAdjacentToSymbol) {
          state.partNumbers.push(parseInt(newPartNumber, 10))
        }

        newPartNumber = ""
        isAdjacentToSymbol = false

        continue
      }

      newPartNumber += state.grid.get(point)!.value

      const ajacentPoints = [
        new Point(x - 1, y - 1),
        new Point(x - 1, y),
        new Point(x - 1, y + 1),
        new Point(x, y - 1),
        new Point(x, y + 1),
        new Point(x + 1, y - 1),
        new Point(x + 1, y),
        new Point(x + 1, y + 1),
      ]

      isAdjacentToSymbol ||= ajacentPoints
        .filter((point) => state.grid.get(point))
        .some((point) => state.grid.isSymbol(point))

      state.grid.set(point, {
        isPart: isAdjacentToSymbol,
        value: state.grid.get(point)!.value,
      })
    }
  }

  return state
}

export const findSolution = (state: State) => () => {
  const result = solution(state)
  const sumOfAllPartNumbers = result.partNumbers.reduce(
    (acc, partNumber) => acc + partNumber,
    0,
  )

  console.log({ sumOfAllPartNumbers })
}
