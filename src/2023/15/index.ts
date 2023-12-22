import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"

enum Operation {
  "-" = "-",
  "=" = "=",
}

interface StepInfo {
  label: string
  operation: Operation
  focalLength: number
}

interface Step extends StepInfo {
  text: string
  textHash: number
  labelHash: number
}

interface State {
  sequence: Step[]
}

const getInfoFromStep = (text: string): StepInfo => {
  let label = ""
  let operation = Operation["-"]
  let focalLength = 0
  let focalLengthText = ""

  if (text.includes(Operation["="])) {
    operation = Operation["="]
  }

  ;[label, focalLengthText] = text.split(operation)
  focalLength = parseInt(focalLengthText, 10) || focalLength

  return {
    label,
    operation,
    focalLength,
  }
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

const solution = (state: State): State => {
  return state
}

const parseLine = (state: State) => (line: string) => {
  state.sequence = line.split(",").map((text) => {
    const { label, operation, focalLength } = getInfoFromStep(text)

    return {
      text,
      textHash: asciiHash(text),
      label,
      labelHash: asciiHash(label),
      operation,
      focalLength,
    }
  })
}

const findSolution = (state: State) => () => {
  const result = solution(state)
  const sumOfAllHashes = result.sequence.reduce(
    (acc, step) => acc + step.textHash,
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
