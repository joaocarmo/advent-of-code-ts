import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlackLine, readFileLine } from "@/utils/readFile"
import { Grid } from "./Grid"
import { Point } from "./Point"
import { findSolution } from "./solutionV1"

interface PointWithInfo {
  isPart: boolean
  value: string
}

export interface State {
  grid: Grid<string, PointWithInfo>
  partNumbers: number[]
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
