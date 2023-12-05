import { filterValuesAppearingTwice } from "@/utils/filterValuesAppearingTwice"
import { Point } from "./Point"
import type { State } from "."

const solution = (state: State): State => {
  for (let y = state.grid.yMin; y <= state.grid.yMax; y++) {
    let newPartNumber = ""
    let isAdjacentToSymbol = false
    let closestGear: Point | null = null

    for (let x = state.grid.xMin; x <= state.grid.xMax; x++) {
      const point = new Point(x, y)

      if (!state.grid.isNumber(point)) {
        if (newPartNumber.length > 0 && isAdjacentToSymbol) {
          state.partNumbers.push({
            closestGear,
            number: parseInt(newPartNumber, 10),
          })
        }

        newPartNumber = ""
        isAdjacentToSymbol = false
        closestGear = null

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
      const validAdjacentPoints = ajacentPoints.filter((point) =>
        state.grid.get(point),
      )

      isAdjacentToSymbol ||= validAdjacentPoints.some((point) =>
        state.grid.isSymbol(point),
      )
      closestGear =
        validAdjacentPoints.find((point) => state.grid.isGear(point)) ??
        closestGear

      state.grid.set(point, {
        closestGear,
        isPart: isAdjacentToSymbol,
        value: state.grid.get(point)!.value,
      })
    }
  }

  return state
}

export const findSolution = (state: State) => () => {
  const result = solution(state)
  const gearPartNumbers = filterValuesAppearingTwice(
    result.partNumbers.filter((part) => part.closestGear),
    (part) => part.closestGear!.toString(),
  )
  const gearRatios: number[] = []
  const gears = gearPartNumbers
    .map((part) => part.closestGear!.toString())
    .filter((gear, index, gears) => gears.indexOf(gear.toString()) === index)

  for (const gear of gears) {
    const gearPartNumbers = result.partNumbers.filter(
      (part) => part.closestGear?.toString() === gear,
    )
    const gearRatio = gearPartNumbers[0].number * gearPartNumbers[1].number

    gearRatios.push(gearRatio)
  }

  const sumOfAllGearRatios = gearRatios.reduce((acc, ratio) => acc + ratio, 0)

  console.log({ sumOfAllGearRatios })
}
