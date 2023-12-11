import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { Grid, Point, convertStringToTile } from "./Grid"
import { findStartSymbol } from "./findStartSymbol"
import { findPaths } from "./findPaths"
import { findLargestLoop } from "./findLargestLoop"

interface State {
  grid: Grid
}

const solution = (state: State): number => {
  findStartSymbol(state.grid)
  findPaths(state.grid)

  return findLargestLoop(state.grid)
}

const parseLine = (state: State) => (line: string, lineIndex: number) => {
  let start: Point | null = null

  const tiles = line.split("").map((str, rowIndex) => {
    if (str === "S") {
      start = new Point(rowIndex, lineIndex)
    }

    return {
      symbol: convertStringToTile(str),
      distance: null,
      visited: false,
    }
  })

  state.grid.addRow(tiles)
  state.grid.setStart(start)
}

const findSolution = (state: State) => () => {
  const numStepsOfLargestLoop = solution(state)

  console.log({ numStepsOfLargestLoop })
  // console.log(state.grid.toString())
  // console.log("")
  // console.log(state.grid.toDistances())
}

const main = async () => {
  const state: State = {
    grid: new Grid(),
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
