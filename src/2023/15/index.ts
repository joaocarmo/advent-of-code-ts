import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"

interface Step {
  text: string
  hash: number
}

interface State {
  sequence: Step[]
}

const asciiHash = (text: string): number => {
  if (!text) {
    return 0
  }

  return 0
}

const parseLine = (state: State) => (line: string) => {
  state.sequence = line.split(",").map((text) => ({
    text,
    hash: asciiHash(text),
  }))
}

const findSolution = (state: State) => () => {
  const sumOfAllHashes = state.sequence.reduce(
    (acc, step) => acc + step.hash,
    0,
  )

  console.log(JSON.stringify({ state }, null, 2))
  console.log({ sumOfAllHashes })
}

const main = async () => {
  const state: State = {
    sequence: [],
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
