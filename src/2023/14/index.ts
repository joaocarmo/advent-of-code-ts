import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { Direction, Grid } from "./Grid"
import type { Element } from "./Grid"

const NUM_OF_CYCLES = 1
const CYCLE = [Direction.North]

interface State {
  grid: Grid
}

const solution = (state: State): number => {
  for (let i = 0; i < NUM_OF_CYCLES; i++) {
    for (const direction of CYCLE) {
      state.grid.tiltAll(direction)
    }
  }

  return state.grid.getTotalLoad()
}

const parseLine = (state: State) => (line: string) => {
  const row = line.split("") as Element[]
  state.grid.addRow(row)
}

const findSolution = (state: State) => () => {
  const totalLoad = solution(state)

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
