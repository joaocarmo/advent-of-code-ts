import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlackLine, readFileLine } from "@/utils/readFile"

interface State {}

const solution = (state: State): State => {
  return state
}

const parseLine = (state: State) => (line: string) => {
  console.log({ line, state })
}

const findSolution = (state: State) => () => {
  const result = solution(state)

  console.log({ result })
}

const main = async () => {
  const state: State = {}
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlackLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
