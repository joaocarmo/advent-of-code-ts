import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"

enum Direction {
  Left = 0,
  Right = 1,
}

type Node = `${string}${string}${string}`

type Network = {
  [key in Node]: [Node, Node]
}

interface State {
  input: Direction[]
  network: Network
  numberOfSteps: number
}

const solution = (state: State): State => {
  const { input, network } = state
  let currentIndex = 0
  let currentNode: Node = "AAA"

  while (currentNode !== "ZZZ") {
    const [leftNode, rightNode] = network[currentNode]

    if (input[currentIndex] === Direction.Left) {
      currentNode = leftNode
    } else {
      currentNode = rightNode
    }
    state.numberOfSteps += 1
    currentIndex += 1
    if (currentIndex === input.length) {
      currentIndex = 0
    }
  }

  return state
}

const parseLine = (state: State) => (line: string, lineIndex: number) => {
  if (lineIndex === 0) {
    state.input = line.split("").map((char) => {
      if (char === "L") {
        return Direction.Left
      }

      return Direction.Right
    })
  } else {
    const [node, leftRight] = line.split(" = ")
    const [left, right] = leftRight
      .replace("(", "")
      .replace(")", "")
      .split(", ")

    state.network[node as Node] = [left as Node, right as Node]
  }
}

const findSolution = (state: State) => () => {
  const { numberOfSteps } = solution(state)

  console.log({ numberOfSteps })
}

const main = async () => {
  const state: State = {
    input: [],
    network: {},
    numberOfSteps: 0,
  }
  const { inputFile } = await parseArgs()

  readFileLine(inputFile, {
    onLine: ignoreBlankLine(parseLine(state)),
    onClose: findSolution(state),
  })
}

export default main
