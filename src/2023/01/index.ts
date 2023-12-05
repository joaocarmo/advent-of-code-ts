import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { getCalibrationFromLine } from "./getCalibrationFromLineV2"

interface State {
  calibrationValues: number[]
}

const solution = (state: State): number => {
  return state.calibrationValues.reduce((acc, value) => acc + value, 0)
}

const parseLine = (state: State) => (line: string) => {
  state.calibrationValues.push(getCalibrationFromLine(line))
}

const findSolution = (state: State) => () => {
  const calibrationValueSum = solution(state)

  console.log({ calibrationValueSum })
}

const main = async () => {
  const state: State = {
    calibrationValues: [],
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
