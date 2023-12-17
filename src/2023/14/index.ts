import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { Grid } from "./Grid"
import type { Element } from "./Grid"

interface State {
  grid: Grid
}

const solution = (state: State): number[][] => {
  state.grid.tilt()
  state.grid.calculateLoad()

  return state.grid.getLoad()
}

const parseLine = (state: State) => (line: string) => {
  const row = line.split("") as Element[]
  state.grid.addRow(row)
}

const findSolution = (state: State) => () => {
  const result = solution(state)
  const totalLoad = result.reduce(
    (acc, row) => acc + row.reduce((acc, load) => acc + load, 0),
    0,
  )

  console.log(state.grid.toString())
  console.log({ totalLoad })
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
