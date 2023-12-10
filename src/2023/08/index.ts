import { parseArgs } from "@/utils/parseArgs"
import { ignoreBlankLine, readFileLine } from "@/utils/readFile"
import { findSolution } from "./solutionV2"

export enum Direction {
  Left = 0,
  Right = 1,
}

export type Node = `${string}${string}${string}`

export type Network = Record<Node, [Node, Node]>

export interface State {
  input: Direction[]
  network: Network
  numberOfSteps: number
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
