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
  let currentValue = 0

  for (const char of text.split("")) {
    const asciiCode = char.charCodeAt(0)
    currentValue += asciiCode
    currentValue *= 17
    currentValue %= 256
  }

  return currentValue
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
