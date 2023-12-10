import { Direction } from "."
import type { Node, State } from "."

export const findSolution = (state: State) => () => {
  const { numberOfSteps } = solution(state)

  console.log({ numberOfSteps })
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
