import { Direction } from "."
import type { Network, Node, State } from "."

const getInitialNodes = (network: Network): Node[] =>
  Object.keys(network).filter((node) => node.endsWith("A"))

export const solution = (state: State): State => {
  const { input, network } = state
  let currentIndex = 0
  const currentNodes = getInitialNodes(network)

  while (!currentNodes.every((node) => node.endsWith("Z"))) {
    for (let i = 0; i < currentNodes.length; i++) {
      let currentNode = currentNodes[i]
      const [leftNode, rightNode] = network[currentNode]

      if (input[currentIndex] === Direction.Left) {
        currentNode = leftNode
      } else {
        currentNode = rightNode
      }

      currentNodes[i] = currentNode
    }

    state.numberOfSteps += 1
    currentIndex += 1
    if (currentIndex === input.length) {
      currentIndex = 0
    }
  }

  return state
}
