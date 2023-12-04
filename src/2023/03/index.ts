import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlackLine, readFileLine } from "@/utils/readFile"
import { Grid } from "./Grid"
import { Point } from "./Point"

interface PointWithInfo {
  isPart: boolean
  value: string
}

interface State {
  grid: Grid<string, PointWithInfo>
  partNumbers: number[]
}

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

      isAdjacentToSymbol =
        isAdjacentToSymbol ||
        ajacentPoints
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

const parseLine = (state: State) => (line: string, lineIndex: number) => {
  line.split("").forEach((char, charIndex) => {
    state.grid.set(new Point(charIndex, lineIndex), {
      isPart: false,
      value: char,
    })
    state.grid.xMin = Math.min(state.grid.xMin, charIndex)
    state.grid.xMax = Math.max(state.grid.xMax, charIndex)
    state.grid.yMin = Math.min(state.grid.yMin, lineIndex)
    state.grid.yMax = Math.max(state.grid.yMax, lineIndex)
  })
}

const findSolution = (state: State) => () => {
  const result = solution(state)
  const sumOfAllPartNumbers = result.partNumbers.reduce(
    (acc, partNumber) => acc + partNumber,
    0,
  )

  console.log({ sumOfAllPartNumbers })
}

const main = async () => {
  const state: State = {
    grid: new Grid<string, PointWithInfo>(),
    partNumbers: [],
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlackLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
