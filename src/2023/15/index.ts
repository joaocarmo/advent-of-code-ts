import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"

enum Operation {
  "-" = "-",
  "=" = "=",
}

interface Lens {
  label: string
  focalLength: number
}

interface StepInfo extends Lens {
  operation: Operation
}

interface Step extends StepInfo {
  text: string
  textHash: number
  labelHash: number
}

type Boxes = Record<number, Lens[] | undefined>

interface State {
  sequence: Step[]
  boxes: Boxes
  lenses: Set<string>
}

const getBoxes = (n: number): Boxes => {
  const boxes: Boxes = {}

  for (let i = 0; i < n - 1; i++) {
    boxes[i] = []
  }

  return boxes
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

const handleEqualOperation = (state: State, step: Step) => {
  const { label, labelHash: destinationBox, focalLength } = step

  const destinationBoxContent = state.boxes[destinationBox]

  if (!destinationBoxContent) {
    return
  }

  const lensIndex = destinationBoxContent.findIndex(
    (lens) => lens.label === step.label,
  )
  const lens: Lens = {
    label,
    focalLength,
  }

  if (lensIndex >= 0) {
    destinationBoxContent.splice(lensIndex, 1, lens)
  } else {
    destinationBoxContent.push(lens)
  }

  state.boxes[destinationBox] = destinationBoxContent
}

const handleDashOperation = (state: State, step: Step) => {
  const { labelHash: destinationBox } = step

  const destinationBoxContent = state.boxes[destinationBox]

  if (!destinationBoxContent) {
    return
  }

  const lensIndex = destinationBoxContent.findIndex(
    (lens) => lens.label === step.label,
  )

  if (lensIndex >= 0) {
    destinationBoxContent.splice(lensIndex, 1)
    state.boxes[destinationBox] = destinationBoxContent
  }
}

const solution = (state: State): State => {
  for (const step of state.sequence) {
    const { operation } = step

    if (operation === Operation["="]) {
      handleEqualOperation(state, step)
    } else if (operation === Operation["-"]) {
      handleDashOperation(state, step)
    }
  }

  return state
}

const getSumOfFocusingPower = ({ boxes }: State): number => {
  const lenses: Record<string, number> = {}

  for (const [boxNumber, boxContents] of Object.entries(boxes)) {
    if (!boxContents) {
      continue
    }

    for (let i = 0; i < boxContents.length; i++) {
      const { label, focalLength } = boxContents[i]

      lenses[label] = (1 + parseInt(boxNumber, 10)) * (i + 1) * focalLength
    }
  }

  return Object.values(lenses).reduce((acc, value) => acc + value, 0)
}

const parseLine = (state: State) => (line: string) => {
  state.sequence = line.split(",").map((text) => {
    const { label, operation, focalLength } = getInfoFromStep(text)
    state.lenses.add(label)

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
  const sumOfFocusingPower = getSumOfFocusingPower(result)

  console.log({ sumOfAllHashes, sumOfFocusingPower })
}

const main = async () => {
  const state: State = {
    sequence: [],
    boxes: getBoxes(256),
    lenses: new Set(),
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
