import { Direction } from "."
import type { Network, Node, State } from "."

const getInitialNodes = (network: Network): Node[] =>
  Object.keys(network).filter((node) => node.endsWith("A"))

const getNextNodes = (
  previousNodes: Node[],
  network: Network,
  direction: Direction,
): Node[] => {
  const nextNodes = [...previousNodes]

  for (let i = 0; i < nextNodes.length; i++) {
    let nextNode = nextNodes[i]
    const [leftNode, rightNode] = network[nextNode]

    if (direction === Direction.Left) {
      nextNode = leftNode
    } else {
      nextNode = rightNode
    }

    nextNodes[i] = nextNode
  }

  return nextNodes
}
export const solution = (state: State): State => {
  const { input, network } = state
  let currentIndex = 0
  let currentNodes = getInitialNodes(network)

  while (!currentNodes.every((node) => node.endsWith("Z"))) {
    currentNodes = getNextNodes(currentNodes, network, input[currentIndex])

    state.numberOfSteps += 1
    currentIndex += 1
    if (currentIndex === input.length) {
      currentIndex = 0
    }
  }

  return state
}
